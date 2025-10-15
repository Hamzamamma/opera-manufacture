import axios, { AxiosInstance, AxiosError } from 'axios';
import type { PrintfulApiResponse } from '@/types/printful';

class PrintfulClient {
  private client: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.PRINTFUL_API_KEY || '';
    this.baseURL = process.env.PRINTFUL_API_URL || 'https://api.printful.com';

    if (!this.apiKey) {
      throw new Error('PRINTFUL_API_KEY is not defined in environment variables');
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID || '',
      },
      timeout: 30000, // 30 seconds
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Printful API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Printful Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`Printful API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error('Printful API Error:', {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          console.error('Printful Network Error:', error.message);
        } else {
          console.error('Printful Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request to Printful API
   */
  async get<T>(endpoint: string, params?: any): Promise<PrintfulApiResponse<T>> {
    const response = await this.client.get<PrintfulApiResponse<T>>(endpoint, { params });
    return response.data;
  }

  /**
   * Make a POST request to Printful API
   */
  async post<T>(endpoint: string, data?: any): Promise<PrintfulApiResponse<T>> {
    const response = await this.client.post<PrintfulApiResponse<T>>(endpoint, data);
    return response.data;
  }

  /**
   * Make a PUT request to Printful API
   */
  async put<T>(endpoint: string, data?: any): Promise<PrintfulApiResponse<T>> {
    const response = await this.client.put<PrintfulApiResponse<T>>(endpoint, data);
    return response.data;
  }

  /**
   * Make a DELETE request to Printful API
   */
  async delete<T>(endpoint: string): Promise<PrintfulApiResponse<T>> {
    const response = await this.client.delete<PrintfulApiResponse<T>>(endpoint);
    return response.data;
  }

  /**
   * Get store information
   */
  async getStoreInfo() {
    return this.get('/store');
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.getStoreInfo();
      return response.code === 200;
    } catch (error) {
      console.error('Printful connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const printfulClient = new PrintfulClient();
export default printfulClient;
