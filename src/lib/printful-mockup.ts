import { createMockupTask, getMockupTask } from '@/lib/printful';
import { updateDesignMetadata } from '@/lib/design-upload';

// Printful placement types - using string for flexibility as Printful supports many placement options
export type PrintfulPlacement = string;

export interface MockupOptions {
  productId: number;
  variantIds: number[];
  designUrl: string;
  placement: PrintfulPlacement;
  position?: {
    area_width: number;
    area_height: number;
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

export interface MockupResult {
  taskKey: string;
  mockups: Array<{
    variant_id: number;
    placement: string;
    mockup_url: string;
  }>;
  error?: string;
}

/**
 * Generate product mockup with design
 */
export const generateProductMockup = async (
  options: MockupOptions
): Promise<{ data: MockupResult | null; error: string | null }> => {
  try {
    const { productId, variantIds, designUrl, placement, position } = options;

    // Validate inputs
    if (!variantIds || variantIds.length === 0) {
      return { data: null, error: 'At least one variant ID is required' };
    }

    if (!designUrl) {
      return { data: null, error: 'Design URL is required' };
    }

    // Prepare mockup task data
    const mockupData = {
      variant_ids: variantIds,
      format: 'jpg', // or 'png'
      files: [
        {
          placement: placement,
          image_url: designUrl,
          position: position || undefined,
        },
      ],
    };

    // Create mockup generation task
    const taskResult = await createMockupTask(mockupData);

    if (taskResult.error || !taskResult.data) {
      return {
        data: null,
        error: taskResult.error || 'Failed to create mockup task',
      };
    }

    const taskKey = taskResult.data.task_key;

    // Poll for task completion
    const mockupResult = await pollMockupTask(taskKey);

    if (mockupResult.error) {
      return { data: null, error: mockupResult.error };
    }

    return { data: mockupResult, error: null };
  } catch (error: any) {
    console.error('Generate mockup error:', error);
    return { data: null, error: error.message || 'Failed to generate mockup' };
  }
};

/**
 * Poll mockup task until complete
 */
const pollMockupTask = async (
  taskKey: string,
  maxAttempts = 30,
  intervalMs = 2000
): Promise<MockupResult> => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const result = await getMockupTask(taskKey);

      if (result.error || !result.data) {
        return {
          taskKey,
          mockups: [],
          error: result.error || 'Failed to fetch mockup task status',
        };
      }

      const taskData = result.data;

      // Check task status
      if (taskData.status === 'completed') {
        // Extract mockup URLs from either mockups or result.mockups
        const mockupsArray = taskData.mockups || taskData.result?.mockups || [];
        const mockups = mockupsArray.map((mockup) => ({
          variant_id: mockup.variant_ids?.[0] || 0,
          placement: mockup.placement,
          mockup_url: mockup.mockup_url,
        }));

        return {
          taskKey,
          mockups,
        };
      } else if (taskData.status === 'failed') {
        return {
          taskKey,
          mockups: [],
          error: taskData.error || 'Mockup generation failed',
        };
      }

      // Task still pending, wait and retry
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      attempts++;
    } catch (error: any) {
      console.error('Poll mockup task error:', error);
      attempts++;

      if (attempts >= maxAttempts) {
        return {
          taskKey,
          mockups: [],
          error: 'Mockup generation timeout',
        };
      }
    }
  }

  return {
    taskKey,
    mockups: [],
    error: 'Mockup generation timeout',
  };
};

/**
 * Generate mockup for multiple products at once
 */
export const generateMultipleMockups = async (
  mockupOptions: MockupOptions[]
): Promise<{
  results: Array<{ success: boolean; data?: MockupResult; error?: string }>;
}> => {
  const promises = mockupOptions.map(async (options) => {
    const result = await generateProductMockup(options);

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, data: result.data! };
  });

  const results = await Promise.all(promises);

  return { results };
};

/**
 * Generate mockup and save to design metadata
 */
export const generateAndSaveMockup = async (
  designId: string,
  options: MockupOptions
): Promise<{ mockupUrls: string[] | null; error: string | null }> => {
  try {
    // Generate mockup
    const mockupResult = await generateProductMockup(options);

    if (mockupResult.error || !mockupResult.data) {
      return {
        mockupUrls: null,
        error: mockupResult.error || 'Failed to generate mockup',
      };
    }

    // Extract mockup URLs
    const mockupUrls = mockupResult.data.mockups.map((m) => m.mockup_url);

    // Save to design metadata
    const updateResult = await updateDesignMetadata(designId, {
      mockupUrls,
      printfulProductId: options.productId,
      placement: options.placement,
      status: 'ready',
    });

    if (updateResult.error) {
      console.error('Failed to save mockup URLs:', updateResult.error);
      // Still return mockups even if save failed
    }

    return { mockupUrls, error: null };
  } catch (error: any) {
    console.error('Generate and save mockup error:', error);
    return {
      mockupUrls: null,
      error: error.message || 'Failed to generate mockup',
    };
  }
};

/**
 * Get optimal placement based on product type
 */
export const getOptimalPlacement = (
  productId: number
): PrintfulPlacement => {
  // Common product IDs from Printful
  const productPlacements: Record<number, string> = {
    71: 'front', // Unisex T-Shirt
    146: 'front', // Women's T-Shirt
    19: 'front', // Premium T-Shirt
    380: 'all-over', // All-Over Print Shirt
    // Add more mappings as needed
  };

  return productPlacements[productId] || 'front';
};

/**
 * Get recommended design dimensions for product
 */
export const getRecommendedDimensions = (
  productId: number
): { width: number; height: number } => {
  // Printful recommended print file dimensions (in pixels at 300 DPI)
  const dimensions: Record<number, { width: number; height: number }> = {
    71: { width: 4500, height: 5400 }, // T-Shirt front
    146: { width: 4500, height: 5400 }, // Women's T-Shirt
    19: { width: 4500, height: 5400 }, // Premium T-Shirt
    380: { width: 7632, height: 7632 }, // All-Over Print
    // Add more as needed
  };

  return dimensions[productId] || { width: 4500, height: 5400 };
};

/**
 * Calculate optimal position for design on product
 */
export const calculateOptimalPosition = (
  designDimensions: { width: number; height: number },
  productId: number
): {
  area_width: number;
  area_height: number;
  width: number;
  height: number;
  top: number;
  left: number;
} => {
  // Printful print area dimensions (example for T-shirt)
  const printArea = {
    area_width: 1800,
    area_height: 2400,
  };

  // Calculate scaling to fit design in print area
  const scaleX = printArea.area_width / designDimensions.width;
  const scaleY = printArea.area_height / designDimensions.height;
  const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

  const scaledWidth = Math.floor(designDimensions.width * scale);
  const scaledHeight = Math.floor(designDimensions.height * scale);

  // Center the design
  const left = Math.floor((printArea.area_width - scaledWidth) / 2);
  const top = Math.floor((printArea.area_height - scaledHeight) / 2);

  return {
    area_width: printArea.area_width,
    area_height: printArea.area_height,
    width: scaledWidth,
    height: scaledHeight,
    top,
    left,
  };
};

/**
 * Batch generate mockups for a design across multiple variants
 */
export const generateMockupsForAllVariants = async (
  designUrl: string,
  productId: number,
  variantIds: number[],
  placement?: PrintfulPlacement
): Promise<{ mockupUrls: string[]; error: string | null }> => {
  try {
    const optimalPlacement = placement || getOptimalPlacement(productId);

    const options: MockupOptions = {
      productId,
      variantIds,
      designUrl,
      placement: optimalPlacement,
    };

    const result = await generateProductMockup(options);

    if (result.error || !result.data) {
      return {
        mockupUrls: [],
        error: result.error || 'Failed to generate mockups',
      };
    }

    const mockupUrls = result.data.mockups.map((m) => m.mockup_url);

    return { mockupUrls, error: null };
  } catch (error: any) {
    return {
      mockupUrls: [],
      error: error.message || 'Failed to generate mockups',
    };
  }
};
