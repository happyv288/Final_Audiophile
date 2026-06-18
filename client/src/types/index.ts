// Typescript interface that describes the shape of data used throughout the react application

// ------------ Product -----
//   Respresenting a product from API (with mongodb _id)

export interface product {
  _id: string;
  name: string;
  category: "headphone" | "speaker" | "earphone";
  price: number;
  image: string;
  description: string;
  features: string;
  inTheBox: BoxItems[];
  galllery: string[];
  isNew: boolean;
  createdAt: string;
}

// One items included in the product box
export interface BoxItems {
  quantity: number;
  item: string;
}

// ---- Cart ----
// A cart items is a product + a quality
export interface CartItems extends product {
  quantity: number;
}

// The calculated totals for the shopping cart
export interface CartTotals {
  subtotal: number;
  shipping: number;
  vat: number;
  grandtotal: number;
}

// ---- Users -----
// The user object stored in our Authcontext
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
  phone?: number;
  address?: string;
  token: string;
}

// ----- Order -----
// Billing/shipping info from checkout form
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-money" | "Cash on Delivery";
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

// An item inside a placed order

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// The full order object retured from API
export interface Order {
  _id: string;
  orderId: string;
  userId?: string;
  customerInfo: CustomerInfo[];
  cartItems: OrderItem[];
  orderSummary: CartTotals;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
}

//   ------- Checking Form ------
// Form fields for the checkout page
export interface CheckoutFormData {
  name: string;
  email: string;
  phone: number;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-Money" | "Cash on Delivery";
  eMoneyNumber: string;
  eMoneyPin: string;
}

// Form validation errors - same eys as the fom but values are error strings
export type FormError = Partial<Record<keyof CheckoutFormData, string>>;

// ------ Admin Dashboard Stats ----
export interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOders: Order[];
  monthlyRevenue: {
    _id: { year: number; month: number };
    revenue: number;
    count: number;
  };
}
