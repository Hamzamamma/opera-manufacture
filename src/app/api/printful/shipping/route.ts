import { NextRequest, NextResponse } from 'next/server';
import { getShippingRates } from '@/lib/printful';
import type { PrintfulShippingRatesRequest } from '@/types/printful';

/**
 * POST /api/printful/shipping
 * Calculate shipping rates
 */
export async function POST(request: NextRequest) {
  try {
    const body: PrintfulShippingRatesRequest = await request.json();

    // Validate required fields
    if (!body.recipient || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient and items' },
        { status: 400 }
      );
    }

    const result = await getShippingRates(body);

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
    console.error('Shipping Rates API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate shipping' },
      { status: 500 }
    );
  }
}
