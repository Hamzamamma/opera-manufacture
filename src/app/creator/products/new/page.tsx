'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  uploadDesignComplete,
  validateDesignFile,
  type DesignMetadata,
} from '@/lib/design-upload';
import {
  generateProductMockup,
  getOptimalPlacement,
  type MockupOptions,
  type MockupResult,
} from '@/lib/printful-mockup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';

// Step indicators
const STEPS = [
  { id: 1, name: 'Upload Design' },
  { id: 2, name: 'Select Product' },
  { id: 3, name: 'Choose Placement' },
  { id: 4, name: 'Generate Mockup' },
  { id: 5, name: 'Configure Variants' },
  { id: 6, name: 'Set Pricing' },
  { id: 7, name: 'Publish' },
];

interface PrintfulProduct {
  id: number;
  title: string;
  brand: string;
  model: string;
  image: string;
  variant_count: number;
  currency: string;
}

interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  image: string;
  price: string;
  in_stock: boolean;
}

interface ProductData {
  designId: string;
  designUrl: string;
  productId: number;
  productName: string;
  productImage: string;
  placement: 'front' | 'back' | 'sleeve' | 'all-over';
  selectedVariants: number[];
  mockupUrls: string[];
  basePrice: number;
  margin: number;
  finalPrice: number;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Design data
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const [designId, setDesignId] = useState<string | null>(null);
  const [designUrl, setDesignUrl] = useState<string | null>(null);

  // Product data
  const [products, setProducts] = useState<PrintfulProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<PrintfulProduct | null>(null);
  const [productVariants, setProductVariants] = useState<PrintfulVariant[]>([]);

  // Placement & Mockup
  const [selectedPlacement, setSelectedPlacement] = useState<'front' | 'back' | 'sleeve' | 'all-over'>('front');
  const [mockupResult, setMockupResult] = useState<MockupResult | null>(null);

  // Variants & Pricing
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [basePrice, setBasePrice] = useState(0);
  const [margin, setMargin] = useState(20); // Default 20% margin
  const [finalPrice, setFinalPrice] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/creator/products/new');
    }
  }, [user, authLoading, router]);

  // Calculate final price when margin changes
  useEffect(() => {
    if (basePrice > 0) {
      const marginAmount = basePrice * (margin / 100);
      setFinalPrice(Math.ceil((basePrice + marginAmount) * 100) / 100);
    }
  }, [basePrice, margin]);

  // ==================== STEP 1: UPLOAD DESIGN ====================

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file
    const validation = await validateDesignFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setDesignPreview(previewUrl);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const uploadDesignHandler = async () => {
    if (!selectedFile || !user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await uploadDesignComplete(
        selectedFile,
        user.uid,
        (progress) => setUploadProgress(progress)
      );

      if (result.error || !result.designId || !result.fileUrl) {
        setError(result.error || 'Upload failed');
        setLoading(false);
        return;
      }

      setDesignId(result.designId);
      setDesignUrl(result.fileUrl);
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // ==================== STEP 2: SELECT PRODUCT ====================

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/printful/catalog?category_id=1');
      const data = await response.json();

      if (data.success && data.data) {
        setProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentStep === 2 && products.length === 0) {
      fetchProducts();
    }
  }, [currentStep]);

  const selectProduct = async (product: PrintfulProduct) => {
    setSelectedProduct(product);
    setLoading(true);

    try {
      // Fetch product variants
      const response = await fetch(`/api/printful/product/${product.id}`);
      const data = await response.json();

      if (data.success && data.data) {
        setProductVariants(data.data.variants || []);

        // Calculate base price (average of all variants)
        const avgPrice =
          data.data.variants.reduce((sum: number, v: PrintfulVariant) => sum + parseFloat(v.price), 0) /
          data.data.variants.length;
        setBasePrice(avgPrice);

        // Set optimal placement
        const optimal = getOptimalPlacement(product.id);
        setSelectedPlacement(optimal);

        setCurrentStep(3);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load product variants');
    } finally {
      setLoading(false);
    }
  };

  // ==================== STEP 3: CHOOSE PLACEMENT ====================

  const confirmPlacement = () => {
    setCurrentStep(4);
  };

  // ==================== STEP 4: GENERATE MOCKUP ====================

  const generateMockup = async () => {
    if (!designUrl || !selectedProduct || selectedVariants.length === 0) {
      setError('Missing required data for mockup generation');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const options: MockupOptions = {
        productId: selectedProduct.id,
        variantIds: selectedVariants.slice(0, 5), // Limit to 5 for preview
        designUrl,
        placement: selectedPlacement,
      };

      const result = await generateProductMockup(options);

      if (result.error || !result.data) {
        setError(result.error || 'Failed to generate mockup');
        setLoading(false);
        return;
      }

      setMockupResult(result.data);
      setCurrentStep(5);
    } catch (err: any) {
      setError(err.message || 'Mockup generation failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentStep === 4 && selectedVariants.length > 0) {
      generateMockup();
    }
  }, [currentStep]);

  // ==================== STEP 5: CONFIGURE VARIANTS ====================

  const toggleVariant = (variantId: number) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  const confirmVariants = () => {
    if (selectedVariants.length === 0) {
      setError('Please select at least one variant');
      return;
    }
    setCurrentStep(6);
  };

  // ==================== STEP 6: SET PRICING ====================

  const confirmPricing = () => {
    if (finalPrice <= basePrice) {
      setError('Final price must be higher than base price');
      return;
    }
    setCurrentStep(7);
  };

  // ==================== STEP 7: PUBLISH PRODUCT ====================

  const publishProduct = async () => {
    if (!user || !designId || !designUrl || !selectedProduct || !mockupResult) {
      setError('Missing required data');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const productData = {
        creatorId: user.uid,
        designId,
        designUrl,
        printfulProductId: selectedProduct.id,
        productName: selectedProduct.title,
        productImage: selectedProduct.image,
        placement: selectedPlacement,
        variantIds: selectedVariants,
        mockupUrls: mockupResult.mockups.map((m) => m.mockup_url),
        basePrice,
        margin,
        finalPrice,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, 'products'), productData);

      // Redirect to products page
      router.push('/creator/products');
    } catch (err: any) {
      setError(err.message || 'Failed to publish product');
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
          <p className="mt-2 text-gray-600">
            Upload your design, select a product, and publish to your store
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* STEP 1: Upload Design */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Upload Your Design</h2>

              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-4 text-lg text-gray-600">
                    Drag and drop your design here, or click to browse
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    PNG, JPG, PDF, SVG up to 50MB (Min 2000x2000px)
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,application/pdf"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    {designPreview && (
                      <img
                        src={designPreview}
                        alt="Design preview"
                        className="w-32 h-32 object-contain border rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{selectedFile.name}</h3>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setDesignPreview(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Uploading...</span>
                        <span className="text-gray-900 font-medium">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={uploadDesignHandler}
                    disabled={loading}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? 'Uploading...' : 'Continue'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Select Product */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Select a Product</h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => selectProduct(product)}
                      className="group border rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.variant_count} variants
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Choose Placement */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Choose Design Placement</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['front', 'back', 'sleeve', 'all-over'].map((placement) => (
                  <button
                    key={placement}
                    onClick={() => setSelectedPlacement(placement as any)}
                    className={`p-6 border-2 rounded-lg transition-all ${
                      selectedPlacement === placement
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {placement === 'front' && '👕'}
                        {placement === 'back' && '🔄'}
                        {placement === 'sleeve' && '💪'}
                        {placement === 'all-over' && '🎨'}
                      </div>
                      <p className="font-medium capitalize">{placement}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={confirmPlacement}
                className="mt-8 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 4: Generate Mockup (Auto-generates) */}
          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <h2 className="text-2xl font-semibold mt-6 mb-2">Generating Mockup Preview</h2>
              <p className="text-gray-600">
                This may take up to 60 seconds. Please wait...
              </p>
            </div>
          )}

          {/* STEP 5: Configure Variants */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Select Available Variants</h2>

              {/* Mockup Preview */}
              {mockupResult && mockupResult.mockups.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-4">Mockup Preview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockupResult.mockups.slice(0, 3).map((mockup, index) => (
                      <img
                        key={index}
                        src={mockup.mockup_url}
                        alt={`Mockup ${index + 1}`}
                        className="w-full h-64 object-contain border rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Available Sizes & Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {productVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => toggleVariant(variant.id)}
                      disabled={!variant.in_stock}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        selectedVariants.includes(variant.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!variant.in_stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: variant.color_code || '#ccc' }}
                        />
                        <span className="font-medium text-sm">{variant.size}</span>
                      </div>
                      <p className="text-xs text-gray-600">{variant.color}</p>
                      <p className="text-sm font-medium mt-1">${variant.price}</p>
                      {!variant.in_stock && (
                        <p className="text-xs text-red-600 mt-1">Out of stock</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={confirmVariants}
                disabled={selectedVariants.length === 0}
                className="mt-8 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Continue ({selectedVariants.length} variants selected)
              </button>
            </div>
          )}

          {/* STEP 6: Set Pricing */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Set Your Pricing</h2>

              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base Cost (Printful)</span>
                    <span className="font-medium">${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Your Margin</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={margin}
                        onChange={(e) => setMargin(Number(e.target.value))}
                        className="w-20 px-3 py-2 border rounded-lg text-right"
                        min="0"
                        max="200"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Customer Price</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${finalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      You earn ${(finalPrice - basePrice).toFixed(2)} per sale
                    </p>
                  </div>
                </div>

                <button
                  onClick={confirmPricing}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue to Publish
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Publish */}
          {currentStep === 7 && selectedProduct && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Review & Publish</h2>

              <div className="space-y-6">
                {/* Product Summary */}
                <div className="border rounded-lg p-6">
                  <div className="flex space-x-6">
                    {mockupResult && mockupResult.mockups[0] && (
                      <img
                        src={mockupResult.mockups[0].mockup_url}
                        alt="Product preview"
                        className="w-48 h-48 object-contain border rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedProduct.title}</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">Placement:</span>{' '}
                          <span className="font-medium capitalize">{selectedPlacement}</span>
                        </p>
                        <p>
                          <span className="text-gray-600">Variants:</span>{' '}
                          <span className="font-medium">{selectedVariants.length} selected</span>
                        </p>
                        <p>
                          <span className="text-gray-600">Price:</span>{' '}
                          <span className="font-medium text-lg text-blue-600">
                            ${finalPrice.toFixed(2)}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-600">Your profit:</span>{' '}
                          <span className="font-medium text-green-600">
                            ${(finalPrice - basePrice).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Publish Button */}
                <button
                  onClick={publishProduct}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-lg"
                >
                  {loading ? 'Publishing...' : 'Publish Product to Store'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Your product will be available immediately after publishing
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
