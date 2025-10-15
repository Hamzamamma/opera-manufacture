'use client';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  UploadTask,
} from 'firebase/storage';
import { storage } from '@/config/firebase';

// Upload file to Firebase Storage
export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const storageRef = ref(storage, path);

    if (onProgress) {
      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            resolve({ url: null, error: error.message });
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, error: null });
          }
        );
      });
    } else {
      // Simple upload without progress
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { url, error: null };
    }
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

// Upload product image
export const uploadProductImage = async (
  file: File,
  productId: string,
  onProgress?: (progress: number) => void
) => {
  const path = `products/${productId}/${Date.now()}_${file.name}`;
  return uploadFile(file, path, onProgress);
};

// Upload user avatar
export const uploadUserAvatar = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
) => {
  const path = `avatars/${userId}/${Date.now()}_${file.name}`;
  return uploadFile(file, path, onProgress);
};

// Upload creator banner
export const uploadCreatorBanner = async (
  file: File,
  creatorId: string,
  onProgress?: (progress: number) => void
) => {
  const path = `creators/${creatorId}/banner_${Date.now()}_${file.name}`;
  return uploadFile(file, path, onProgress);
};

// Delete file from storage
export const deleteFile = async (url: string) => {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  basePath: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<{ urls: string[]; errors: string[] }> => {
  const urls: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = `${basePath}/${Date.now()}_${i}_${file.name}`;

    const result = await uploadFile(
      file,
      path,
      onProgress ? (progress) => onProgress(i, progress) : undefined
    );

    if (result.url) {
      urls.push(result.url);
    }
    if (result.error) {
      errors.push(result.error);
    }
  }

  return { urls, errors };
};
