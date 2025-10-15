'use client';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { storage, db } from '@/config/firebase';

// Supported file types
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'application/pdf',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MIN_WIDTH = 2000; // Minimum width for print quality
const MIN_HEIGHT = 2000; // Minimum height for print quality

export interface DesignFile {
  file: File;
  width?: number;
  height?: number;
}

export interface DesignMetadata {
  designId?: string;
  creatorId: string;
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  mimeType: string;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
  printfulProductId?: number;
  placement?: string; // Flexible placement type for Printful API compatibility
  mockupUrls?: string[];
  status: 'uploaded' | 'processing' | 'ready' | 'error';
}

/**
 * Validate design file before upload
 */
export const validateDesignFile = async (
  file: File
): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> => {
  try {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      };
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Accepted formats: PNG, JPG, SVG, PDF`,
      };
    }

    // For images, check dimensions
    if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
      const dimensions = await getImageDimensions(file);

      if (dimensions.width < MIN_WIDTH || dimensions.height < MIN_HEIGHT) {
        return {
          valid: false,
          error: `Image resolution too low. Minimum ${MIN_WIDTH}x${MIN_HEIGHT}px required for quality printing.`,
          dimensions,
        };
      }

      return { valid: true, dimensions };
    }

    // SVG and PDF don't need dimension validation
    return { valid: true };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Failed to validate file',
    };
  }
};

/**
 * Get image dimensions from file
 */
const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

/**
 * Upload design file to Firebase Storage
 */
export const uploadDesign = async (
  file: File,
  creatorId: string,
  onProgress?: (progress: number) => void
): Promise<{ url: string | null; error: string | null }> => {
  try {
    // Validate file first
    const validation = await validateDesignFile(file);
    if (!validation.valid) {
      return { url: null, error: validation.error || 'Invalid file' };
    }

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `designs/${creatorId}/${timestamp}_${sanitizedFileName}`;

    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Upload error:', error);
          resolve({ url: null, error: error.message });
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, error: null });
          } catch (error: any) {
            resolve({ url: null, error: error.message });
          }
        }
      );
    });
  } catch (error: any) {
    return { url: null, error: error.message || 'Upload failed' };
  }
};

/**
 * Generate thumbnail from design (for preview)
 */
export const generateThumbnail = async (
  file: File
): Promise<{ url: string | null; error: string | null }> => {
  try {
    if (!file.type.startsWith('image/')) {
      return { url: null, error: 'Thumbnails only supported for images' };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          // Create canvas for thumbnail
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve({ url: null, error: 'Canvas not supported' });
            return;
          }

          // Resize to thumbnail (max 400px)
          const maxSize = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob and get URL
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, error: null });
            } else {
              resolve({ url: null, error: 'Failed to create thumbnail' });
            }
          }, 'image/jpeg', 0.8);
        };

        img.onerror = () => {
          resolve({ url: null, error: 'Failed to load image' });
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        resolve({ url: null, error: 'Failed to read file' });
      };

      reader.readAsDataURL(file);
    });
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

/**
 * Save design metadata to Firestore
 */
export const saveDesignMetadata = async (
  designData: Omit<DesignMetadata, 'uploadedAt'>
): Promise<{ id: string | null; error: string | null }> => {
  try {
    const docRef = await addDoc(collection(db, 'designs'), {
      ...designData,
      uploadedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Save metadata error:', error);
    return { id: null, error: error.message || 'Failed to save metadata' };
  }
};

/**
 * Update design metadata
 */
export const updateDesignMetadata = async (
  designId: string,
  updates: Partial<DesignMetadata>
): Promise<{ error: string | null }> => {
  try {
    const docRef = doc(db, 'designs', designId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });

    return { error: null };
  } catch (error: any) {
    console.error('Update metadata error:', error);
    return { error: error.message || 'Failed to update metadata' };
  }
};

/**
 * Complete design upload flow
 */
export const uploadDesignComplete = async (
  file: File,
  creatorId: string,
  onProgress?: (progress: number) => void
): Promise<{
  designId: string | null;
  fileUrl: string | null;
  error: string | null;
}> => {
  try {
    // 1. Validate file
    const validation = await validateDesignFile(file);
    if (!validation.valid) {
      return {
        designId: null,
        fileUrl: null,
        error: validation.error || 'Invalid file',
      };
    }

    // 2. Upload file
    const uploadResult = await uploadDesign(file, creatorId, onProgress);
    if (uploadResult.error || !uploadResult.url) {
      return {
        designId: null,
        fileUrl: null,
        error: uploadResult.error || 'Upload failed',
      };
    }

    // 3. Generate thumbnail (optional, non-blocking)
    const thumbnailResult = await generateThumbnail(file);

    // 4. Save metadata
    const metadata: Omit<DesignMetadata, 'uploadedAt'> = {
      creatorId,
      fileName: file.name,
      fileUrl: uploadResult.url,
      thumbnailUrl: thumbnailResult.url || undefined,
      fileSize: file.size,
      mimeType: file.type,
      dimensions: validation.dimensions || { width: 0, height: 0 },
      status: 'uploaded',
    };

    const saveResult = await saveDesignMetadata(metadata);
    if (saveResult.error || !saveResult.id) {
      return {
        designId: null,
        fileUrl: uploadResult.url,
        error: saveResult.error || 'Failed to save metadata',
      };
    }

    return {
      designId: saveResult.id,
      fileUrl: uploadResult.url,
      error: null,
    };
  } catch (error: any) {
    console.error('Upload complete error:', error);
    return {
      designId: null,
      fileUrl: null,
      error: error.message || 'Upload failed',
    };
  }
};
