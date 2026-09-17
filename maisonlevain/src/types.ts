export type Category = 'all' | 'sourdough' | 'viennoiserie' | 'patisserie' | 'savory' | 'provisions';

export type SlicingOption = 'Whole Loaf' | 'Standard Slice (12mm)' | 'Thick Rustic Slice (18mm)' | 'Toast Cut (10mm)';

export interface BakeryItem {
  id: string;
  name: string;
  frenchName?: string;
  description: string;
  price: number;
  category: 'sourdough' | 'viennoiserie' | 'patisserie' | 'savory' | 'provisions';
  imageUrl: string;
  tags: string[];
  dietary: ('Vegan' | 'Vegetarian' | 'Organic' | 'Nut-Free' | 'Dairy-Free' | 'Ancient Grains' | 'Signature')[];
  ingredients: string[];
  flourType?: string;
  fermentationHours?: number;
  hydrationPercentage?: number;
  origin?: string;
  allergens: string[];
  isOvenFresh?: boolean;
  nextBakeTime?: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  canBeSliced?: boolean;
  weightGrams?: number;
  flavorNotes?: string[];
  pairingNotes?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  itemId: string;
  item: BakeryItem;
  quantity: number;
  selectedSlicing?: SlicingOption;
  warmed?: boolean;
  giftBox?: boolean;
  notes?: string;
  unitPrice: number;
}

export interface CustomBoxItem {
  boxId: string;
  name: string;
  size: 4 | 6;
  packagingType: 'Artisan Eco-Kraft' | 'Heritage Ribbon Gift Box';
  giftMessage?: string;
  items: {
    item: BakeryItem;
    quantity: number;
  }[];
  price: number;
}

export interface BakeScheduleItem {
  id: string;
  name: string;
  frenchName: string;
  timeLabel: string;
  status: 'baking_now' | 'cooling' | 'ready' | 'scheduled';
  batchNumber: string;
  temperature: string;
  category: string;
}

export interface OrderDetails {
  id: string;
  createdAt: string;
  items: CartItem[];
  customBoxes: CustomBoxItem[];
  customerName: string;
  email: string;
  phone: string;
  fulfillmentType: 'pickup' | 'delivery';
  scheduledTime: string;
  deliveryAddress?: string;
  orderNotes?: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'card' | 'apple_pay' | 'pickup_counter';
  status: 'confirmed' | 'fermenting' | 'in_hearth' | 'cooling' | 'ready' | 'completed';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  tier: 'Club Member' | 'Heritage Patron' | 'Grand Cru Patron';
  loyaltyPoints: number;
  phone?: string;
  preferredFulfillment?: 'pickup' | 'delivery';
  deliveryAddress?: string;
  favoriteCraft?: string;
  joinedDate: string;
}
