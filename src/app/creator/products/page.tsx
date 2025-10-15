'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Link from 'next/link';

interface Product {
  id: string;
  productName: string;
  productImage: string;
  mockupUrls: string[];
  finalPrice: number;
  variantIds: number[];
  status: string;
  createdAt: Date;
}

export default function CreatorProductsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/creator/products');
      return;
    }

    if (user) {
      loadProducts();
    }
  }, [user, authLoading, router]);

  const loadProducts = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'products'),
        where('creatorId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const productsList: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));

      setProducts(productsList);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="mt-2 text-gray-600">Manage your print-on-demand products</p>
          </div>
          <Link
            href="/creator/products/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create New Product
          </Link>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products yet</h3>
            <p className="mt-2 text-gray-600">Get started by creating your first product</p>
            <Link
              href="/creator/products/new"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.mockupUrls[0] || product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.productName}
                  </h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.finalPrice.toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {product.variantIds.length} variants
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Edit
                    </button>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
