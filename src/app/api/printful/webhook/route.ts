import { NextRequest, NextResponse } from 'next/server';
import type { PrintfulWebhook } from '@/types/printful';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

/**
 * POST /api/printful/webhook
 * Receive webhooks from Printful
 *
 * Webhook types:
 * - package_shipped: Order has been shipped
 * - package_returned: Package was returned
 * - order_failed: Order fulfillment failed
 * - order_canceled: Order was canceled
 * - product_synced: Product sync completed
 * - order_put_hold: Order was put on hold
 * - order_remove_hold: Hold was removed from order
 */
export async function POST(request: NextRequest) {
  try {
    const webhook: PrintfulWebhook = await request.json();

    console.log('Printful Webhook Received:', {
      type: webhook.type,
      created: new Date(webhook.created * 1000).toISOString(),
      store: webhook.store,
    });

    // Handle different webhook types
    switch (webhook.type) {
      case 'package_shipped':
        await handlePackageShipped(webhook);
        break;

      case 'package_returned':
        await handlePackageReturned(webhook);
        break;

      case 'order_failed':
        await handleOrderFailed(webhook);
        break;

      case 'order_canceled':
        await handleOrderCanceled(webhook);
        break;

      case 'product_synced':
        await handleProductSynced(webhook);
        break;

      case 'order_put_hold':
        await handleOrderOnHold(webhook);
        break;

      case 'order_remove_hold':
        await handleOrderHoldRemoved(webhook);
        break;

      default:
        console.log('Unknown webhook type:', webhook.type);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error: any) {
    console.error('Webhook Processing Error:', error);

    // Still return 200 to acknowledge receipt
    // Printful will retry if we return error
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

// Handle package shipped
async function handlePackageShipped(webhook: PrintfulWebhook) {
  const { order, shipment } = webhook.data;

  if (!order || !shipment) return;

  console.log('Package Shipped:', {
    orderId: order.id,
    externalId: order.external_id,
    trackingNumber: shipment.tracking_number,
    carrier: shipment.carrier,
  });

  try {
    // Update order in Firestore
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'shipped',
      printfulStatus: order.status,
      trackingNumber: shipment.tracking_number,
      trackingUrl: shipment.tracking_url,
      carrier: shipment.carrier,
      shippedAt: new Date(shipment.shipped_at * 1000),
      updatedAt: new Date(),
    });

    // TODO: Send email notification to customer
    // await sendShippingNotificationEmail(order.recipient.email, {
    //   trackingNumber: shipment.tracking_number,
    //   trackingUrl: shipment.tracking_url,
    // });
  } catch (error) {
    console.error('Error updating order after shipment:', error);
  }
}

// Handle package returned
async function handlePackageReturned(webhook: PrintfulWebhook) {
  const { order, shipment, reason } = webhook.data;

  if (!order) return;

  console.log('Package Returned:', {
    orderId: order.id,
    externalId: order.external_id,
    reason,
  });

  try {
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'returned',
      printfulStatus: order.status,
      returnReason: reason,
      updatedAt: new Date(),
    });

    // TODO: Notify customer about return
  } catch (error) {
    console.error('Error handling package return:', error);
  }
}

// Handle order failed
async function handleOrderFailed(webhook: PrintfulWebhook) {
  const { order, reason } = webhook.data;

  if (!order) return;

  console.log('Order Failed:', {
    orderId: order.id,
    externalId: order.external_id,
    reason,
  });

  try {
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'failed',
      printfulStatus: order.status,
      failureReason: reason,
      updatedAt: new Date(),
    });

    // TODO: Notify admin and customer
  } catch (error) {
    console.error('Error handling order failure:', error);
  }
}

// Handle order canceled
async function handleOrderCanceled(webhook: PrintfulWebhook) {
  const { order, reason } = webhook.data;

  if (!order) return;

  console.log('Order Canceled:', {
    orderId: order.id,
    externalId: order.external_id,
    reason,
  });

  try {
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'canceled',
      printfulStatus: order.status,
      cancellationReason: reason,
      canceledAt: new Date(),
      updatedAt: new Date(),
    });

    // TODO: Process refund if needed
  } catch (error) {
    console.error('Error handling order cancellation:', error);
  }
}

// Handle product synced
async function handleProductSynced(webhook: PrintfulWebhook) {
  console.log('Product Synced:', webhook.data);
  // Handle product sync completion if needed
}

// Handle order put on hold
async function handleOrderOnHold(webhook: PrintfulWebhook) {
  const { order, reason } = webhook.data;

  if (!order) return;

  console.log('Order On Hold:', {
    orderId: order.id,
    externalId: order.external_id,
    reason,
  });

  try {
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'on_hold',
      printfulStatus: order.status,
      holdReason: reason,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error handling order hold:', error);
  }
}

// Handle order hold removed
async function handleOrderHoldRemoved(webhook: PrintfulWebhook) {
  const { order } = webhook.data;

  if (!order) return;

  console.log('Order Hold Removed:', {
    orderId: order.id,
    externalId: order.external_id,
  });

  try {
    const orderRef = doc(db, 'orders', order.external_id);
    await updateDoc(orderRef, {
      status: 'processing',
      printfulStatus: order.status,
      holdReason: null,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error handling hold removal:', error);
  }
}

// Verify webhook is from Printful (optional but recommended)
function verifyWebhookSignature(request: NextRequest): boolean {
  // Printful doesn't use webhook signatures by default
  // You can implement IP whitelist or other verification if needed
  return true;
}
