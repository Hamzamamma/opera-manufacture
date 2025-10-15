// Printful API Types

export interface PrintfulProduct {
  id: number;
  type: string;
  type_name: string;
  title: string;
  brand: string | null;
  model: string;
  image: string;
  variant_count: number;
  currency: string;
  files: PrintfulFile[];
  options: PrintfulOption[];
  is_discontinued: boolean;
  avg_fulfillment_time: number | null;
  description: string;
  techniques: PrintfulTechnique[];
}

export interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  color_code2: string | null;
  image: string;
  price: string;
  in_stock: boolean;
  availability_regions: Record<string, string>;
  availability_status: PrintfulAvailabilityStatus[];
}

export interface PrintfulFile {
  id: string;
  type: string;
  title: string;
  additional_price: string | null;
}

export interface PrintfulOption {
  id: string;
  title: string;
  type: string;
  values: Record<string, string>;
  additional_price: string | null;
}

export interface PrintfulTechnique {
  key: string;
  display_name: string;
  is_default: boolean;
}

export interface PrintfulAvailabilityStatus {
  region: string;
  status: string;
}

export interface PrintfulOrderItem {
  id?: number;
  external_id?: string;
  variant_id: number;
  sync_variant_id?: number;
  quantity: number;
  price: string;
  retail_price?: string;
  name?: string;
  product?: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files?: Array<{
    type: string;
    url: string;
    options?: Array<{
      id: string;
      value: any;
    }>;
    filename?: string;
    visible?: boolean;
  }>;
  options?: Array<{
    id: string;
    value: any;
  }>;
  sku?: string | null;
  discontinued?: boolean;
  out_of_stock?: boolean;
}

export interface PrintfulRecipient {
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  state_name?: string;
  country_code: string;
  country_name?: string;
  zip: string;
  phone?: string;
  email: string;
  tax_number?: string;
}

export interface PrintfulOrderData {
  external_id?: string;
  label?: string;
  shipping: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  retail_costs?: {
    currency: string;
    subtotal?: string;
    discount?: string;
    shipping?: string;
    tax?: string;
    vat?: string;
    total?: string;
  };
  gift?: {
    subject: string;
    message: string;
  };
  packing_slip?: {
    email?: string;
    phone?: string;
    message?: string;
    logo_url?: string;
    store_name?: string;
    custom_order_id?: string;
  };
}

export interface PrintfulOrder {
  id: number;
  external_id: string;
  store: number;
  status: string;
  shipping: string;
  shipping_service_name: string;
  created: number;
  updated: number;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  incomplete_items: PrintfulOrderItem[];
  costs: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    digitization: string;
    additional_fee: string;
    fulfillment_fee: string;
    retail_delivery_fee: string;
    tax: string;
    vat: string;
    total: string;
  };
  retail_costs: {
    currency: string;
    subtotal: string | null;
    discount: string | null;
    shipping: string | null;
    tax: string | null;
    vat: string | null;
    total: string | null;
  };
  shipments: PrintfulShipment[];
  gift: {
    subject: string;
    message: string;
  } | null;
  packing_slip: any | null;
}

export interface PrintfulShipment {
  id: number;
  carrier: string;
  service: string;
  tracking_number: string;
  tracking_url: string;
  created: number;
  ship_date: string;
  shipped_at: number;
  reshipment: boolean;
  items: Array<{
    item_id: number;
    quantity: number;
    picked: number;
    printed: number;
  }>;
}

export interface PrintfulShippingRate {
  id: string;
  name: string;
  rate: string;
  currency: string;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  minDeliveryDate: string;
  maxDeliveryDate: string;
}

export interface PrintfulShippingRatesRequest {
  recipient: PrintfulRecipient;
  items: Array<{
    variant_id: number;
    quantity: number;
    value?: string;
  }>;
  currency?: string;
  locale?: string;
}

export interface PrintfulWebhook {
  type: string;
  created: number;
  retries: number;
  store: number;
  data: {
    order?: PrintfulOrder;
    shipment?: PrintfulShipment;
    reason?: string;
  };
}

export interface PrintfulApiResponse<T> {
  code: number;
  result: T;
  error?: {
    reason: string;
    message: string;
  };
  paging?: {
    total: number;
    offset: number;
    limit: number;
  };
}

export interface PrintfulCatalogVariant extends PrintfulVariant {
  product: {
    product_id: number;
    image: string;
    name: string;
  };
}

export interface PrintfulTaxRate {
  required: boolean;
  rate: number;
  shipping_taxed: boolean;
}

// Printful Mockup Generator API Types

export interface PrintfulMockupGenerationTask {
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
}

export interface PrintfulMockup {
  placement: string;
  variant_ids: number[];
  mockup_url: string;
  extra?: any[];
}

export interface PrintfulMockupTaskResponse {
  task_key: string;
  status: 'pending' | 'completed' | 'failed';
  mockups?: PrintfulMockup[];
  result?: {
    mockups: PrintfulMockup[];
  };
  error?: string;
}
