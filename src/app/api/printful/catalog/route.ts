import { NextRequest, NextResponse } from 'next/server';
import { getPrintfulCatalog, getCatalogVariants } from '@/lib/printful';

/**
 * GET /api/printful/catalog
 * Get Printful product catalog
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeVariants = searchParams.get('variants') === 'true';
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '100');
    const categoryId = searchParams.get('category_id');

    let result;

    if (includeVariants) {
      const params: any = { offset, limit };
      if (categoryId) params.category_id = parseInt(categoryId);

      result = await getCatalogVariants(params);
    } else {
      result = await getPrintfulCatalog();
    }

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
    console.error('Catalog API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}
