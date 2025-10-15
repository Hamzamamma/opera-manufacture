import { NextRequest, NextResponse } from 'next/server';
import { getProductDetails } from '@/lib/printful';

/**
 * GET /api/printful/product/[id]
 * Get product details by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const result = await getProductDetails(productId);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error: any) {
    console.error('Product Details API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
