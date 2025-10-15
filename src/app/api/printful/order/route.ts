import { NextRequest, NextResponse } from 'next/server';
import {
  createPrintfulOrder,
  estimateOrderCosts,
  getAllOrders,
  getOrderStatus,
  cancelOrder,
  confirmOrder,
} from '@/lib/printful';
import type { PrintfulOrderData } from '@/types/printful';

/**
 * POST /api/printful/order
 * Create or estimate a Printful order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData, action } = body as {
      orderData: PrintfulOrderData;
      action?: 'create' | 'estimate';
    };

    // Validate required fields
    if (!orderData || !orderData.recipient || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient, items, and shipping' },
        { status: 400 }
      );
    }

    let result;

    if (action === 'estimate') {
      result = await estimateOrderCosts(orderData);
    } else {
      result = await createPrintfulOrder(orderData, true);
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
    console.error('Create Order API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process order' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/printful/order?id=123 or ?external_id=abc
 * Get order status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('id');
    const status = searchParams.get('status');
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    // Get specific order
    if (orderId) {
      const result = await getOrderStatus(orderId);

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
    }

    // Get all orders
    const params: any = {};
    if (status) params.status = status;
    if (offset) params.offset = parseInt(offset);
    if (limit) params.limit = parseInt(limit);

    const result = await getAllOrders(params);

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
    console.error('Get Orders API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/printful/order?id=123
 * Cancel an order
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const result = await cancelOrder(orderId);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully',
      data: result.data,
    });
  } catch (error: any) {
    console.error('Cancel Order API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to cancel order' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/printful/order
 * Confirm draft order
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const result = await confirmOrder(orderId);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order confirmed successfully',
      data: result.data,
    });
  } catch (error: any) {
    console.error('Confirm Order API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to confirm order' },
      { status: 500 }
    );
  }
}
