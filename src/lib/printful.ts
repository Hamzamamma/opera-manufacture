import { printfulClient } from '@/config/printful';
import type {
  PrintfulProduct,
  PrintfulVariant,
  PrintfulOrder,
  PrintfulOrderData,
  PrintfulShippingRate,
  PrintfulShippingRatesRequest,
  PrintfulCatalogVariant,
} from '@/types/printful';

/**
 * Get all products from Printful catalog
 */
export const getPrintfulCatalog = async () => {
  try {
    const response = await printfulClient.get<PrintfulProduct[]>('/products');
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch catalog' };
  }
};

/**
 * Get product details by ID
 */
export const getProductDetails = async (productId: number) => {
  try {
    const response = await printfulClient.get<{
      product: PrintfulProduct;
      variants: PrintfulVariant[];
    }>(`/products/${productId}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch product details' };
  }
};

/**
 * Get variant details by ID
 */
export const getVariantDetails = async (variantId: number) => {
  try {
    const response = await printfulClient.get<{
      product: PrintfulProduct;
      variant: PrintfulVariant;
    }>(`/products/variant/${variantId}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch variant details' };
  }
};

/**
 * Get all catalog variants (products with variants)
 */
export const getCatalogVariants = async (params?: {
  offset?: number;
  limit?: number;
  category_id?: number;
}) => {
  try {
    const response = await printfulClient.get<PrintfulCatalogVariant[]>(
      '/catalog/variants',
      params
    );
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch catalog variants' };
  }
};

/**
 * Calculate shipping rates for an order
 */
export const getShippingRates = async (recipient: PrintfulShippingRatesRequest) => {
  try {
    const response = await printfulClient.post<PrintfulShippingRate[]>(
      '/shipping/rates',
      recipient
    );
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to calculate shipping' };
  }
};

/**
 * Create a new order in Printful
 */
export const createPrintfulOrder = async (orderData: PrintfulOrderData, confirm = false) => {
  try {
    const endpoint = confirm ? '/orders' : '/orders/estimate';
    const response = await printfulClient.post<PrintfulOrder>(endpoint, orderData);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to create order' };
  }
};

/**
 * Get order status and details
 */
export const getOrderStatus = async (orderId: string | number) => {
  try {
    const response = await printfulClient.get<PrintfulOrder>(`/orders/${orderId}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch order status' };
  }
};

/**
 * Get order by external ID (your system's order ID)
 */
export const getOrderByExternalId = async (externalId: string) => {
  try {
    const response = await printfulClient.get<PrintfulOrder>(
      `/orders/@${externalId}`
    );
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch order' };
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: string | number) => {
  try {
    const response = await printfulClient.delete<PrintfulOrder>(`/orders/${orderId}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to cancel order' };
  }
};

/**
 * Get all orders with optional filters
 */
export const getAllOrders = async (params?: {
  status?: string;
  offset?: number;
  limit?: number;
}) => {
  try {
    const response = await printfulClient.get<PrintfulOrder[]>('/orders', params);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch orders' };
  }
};

/**
 * Confirm draft order (convert estimate to actual order)
 */
export const confirmOrder = async (orderId: string | number) => {
  try {
    const response = await printfulClient.post<PrintfulOrder>(
      `/orders/${orderId}/confirm`
    );
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to confirm order' };
  }
};

/**
 * Estimate order costs without creating an order
 */
export const estimateOrderCosts = async (orderData: PrintfulOrderData) => {
  return createPrintfulOrder(orderData, false);
};

/**
 * Get product template information for mockup generation
 */
export const getProductTemplate = async (productId: number) => {
  try {
    const response = await printfulClient.get(`/mockup-generator/templates/${productId}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch product template' };
  }
};

/**
 * Create a mockup generation task
 */
export const createMockupTask = async (data: {
  variant_ids: number[];
  format?: string;
  files?: Array<{
    placement: string;
    image_url: string;
    position?: {
      area_width: number;
      area_height: number;
      width: number;
      height: number;
      top: number;
      left: number;
    };
  }>;
}) => {
  try {
    const response = await printfulClient.post('/mockup-generator/create-task', data);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to create mockup task' };
  }
};

/**
 * Get mockup generation task result
 */
export const getMockupTask = async (taskKey: string) => {
  try {
    const response = await printfulClient.get(`/mockup-generator/task?task_key=${taskKey}`);
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch mockup task' };
  }
};

/**
 * Get tax rate for a specific country/state
 */
export const getTaxRate = async (recipient: {
  country_code: string;
  state_code?: string;
  city?: string;
  zip?: string;
}) => {
  try {
    const response = await printfulClient.post('/tax/rates', { recipient });
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch tax rate' };
  }
};

/**
 * Get warehouse products (products available in Printful warehouses)
 */
export const getWarehouseProducts = async () => {
  try {
    const response = await printfulClient.get('/warehouse/products');
    return { data: response.result, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to fetch warehouse products' };
  }
};
