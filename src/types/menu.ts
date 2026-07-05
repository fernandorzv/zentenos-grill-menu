/**
 * Menu Data Types
 * Single source of truth for all menu-related data structures.
 * 
 * Design principle: Includes fields needed for Phase 1 (static menu) AND
 * Phase 3+ (orders, kitchen, inventory) to avoid schema migration later.
 * 
 * Fields marked [Phase 1] are used immediately.
 * Fields marked [Phase 3+] are populated but unused until Phase 3.
 * Fields marked [Future] are stubs for Phase 7+ features.
 */

// ============================================================================
// RESTAURANT & CONFIGURATION
// ============================================================================

/**
 * Restaurant metadata (single restaurant for Phase 1-7, multi-tenant in Phase 8)
 * [Phase 1] Basic info, [Phase 3] Add operations, [Phase 8] Add tenant isolation
 */
export interface Restaurant {
  id: string; // 'zentenos-grill' (used in Phase 8 for multi-tenant)
  name: string; // 'Zenteno\'s Grill'
  tagline: string; // 'Asado al Carbón'
  phone: string; // '7775041335'
  whatsappNumber: string; // '7775041335' (can differ from phone)
  email?: string; // future contact channel
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  }; // future: location-based features
  
  // [Phase 1] Operating hours
  serviceHours: ServiceHours[];
  
  // [Phase 3+] Operations
  timezone: string; // 'America/Mexico_City'
  currency: 'MXN' | 'USD'; // default currency
  
  // [Phase 3+] Kitchen & ordering
  kitchenOpenTime: string; // '18:00' (when kitchen starts accepting orders)
  kitchenCloseTime: string; // '21:30' (when kitchen stops accepting new orders)
  averagePrepTime: number; // minutes, used for kitchen scheduling
  
  // [Future] Multi-branch (Phase 8)
  branchId?: string;
  parentRestaurantId?: string;
}

export interface ServiceHours {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  openTime?: string; // '18:00'
  closeTime?: string; // '22:00'
  notes?: string; // 'Happy hour 6PM-7PM'
}

// ============================================================================
// MENU STRUCTURE
// ============================================================================

/**
 * Category (groups items by type)
 * [Phase 1] Display, [Phase 3] Kitchen routing, [Phase 8] Per-branch customization
 */
export interface Category {
  id: string; // 'hamburguesas', 'agujas-norteñas', 'drinks'
  name: string; // 'Hamburguesas'
  displayName: string; // Translated/formatted name for UI
  description?: string; // 'Nuestras especialidades al carbón'
  sortOrder: number; // 1, 2, 3... (for Phase 1 display order)
  icon?: string; // future: emoji or SVG reference
  
  // [Phase 3+] Kitchen routing
  requiresKitchen: boolean; // true for food, false for drinks/pre-made
  kitchenStationType?: 'grill' | 'cold' | 'bar'; // which station handles this
  
  // [Phase 8] Multi-branch
  availableIn?: string[]; // ['zentenos-grill-main', 'zentenos-grill-downtown']
}

/**
 * Menu Item (a single product you sell)
 * Designed to support modifiers, availability, pricing variations, prep time tracking
 */
export interface MenuItem {
  // Identity
  id: string; // 'sencilla', 'tocino', 'doble-carne'
  categoryId: string; // reference to Category.id
  
  // [Phase 1] Display
  name: string; // 'Sencilla'
  shortName?: string; // 'Sencilla' (for kitchen tickets if different)
  description: string; // 'Carne marinada con nuestra receta especial...'
  
  // [Phase 1] Pricing
  price: number; // 120 (in MXN, or base currency)
  priceVariations?: PriceVariation[]; // Size, protein variations
  
  // [Phase 1] Metadata
  includes: string[]; // ['Papas a la francesa', 'Lechuga fresca', 'Jitomate']
  excludable?: string[]; // Items customer can request removed (e.g., 'Cebolla')
  allergens: Allergen[]; // ['gluten', 'dairy', 'peanuts']
  spiceLevel?: 'mild' | 'medium' | 'hot'; // for kitchen awareness
  
  // [Phase 3] Kitchen operations
  prepTimeMinutes: number; // 12 (average, used for kitchen scheduling)
  maxSimultaneousOrders?: number; // kitchen capacity constraint
  batchable: boolean; // can this be made in batches (for efficiency)
  
  // [Phase 3] Modifiers (toppings, variations, extras)
  modifiers?: Modifier[];
  
  // [Phase 1/3] Availability
  availability: Availability;
  
  // [Phase 3] Inventory (local kitchen tracking)
  inventory?: {
    current: number; // units in stock
    minimum: number; // reorder point
    unit: string; // 'portions', 'kg', 'liters'
  };
  
  // [Phase 3+] Ordering constraints
  minOrderQuantity?: number; // must order at least X
  maxOrderQuantity?: number; // can't order more than X per transaction
  
  // [Phase 7+] Seasonal/promotional
  isPromo?: boolean;
  promoPrice?: number;
  promoEndDate?: string; // ISO date
  
  // [Phase 8] Multi-branch
  availableIn?: string[]; // branch IDs where this item is offered
  branchSpecificPrice?: Record<string, number>; // { 'branch-downtown': 140 }
  
  // Ordering/ranking
  sortOrder: number; // display order within category
  featured: boolean; // highlight on menu (e.g., "Specialty")
}

/**
 * Price variation (size, protein type, etc.)
 * [Phase 3+] Used when ordering
 */
export interface PriceVariation {
  id: string; // 'size-large', 'protein-chicken'
  name: string; // 'Large', 'Pollo'
  priceModifier: number; // +30 (additional cost)
  modifierType: 'additive' | 'replacement'; // add charge or replace price
}

/**
 * Modifier (topping, extra, customization)
 * [Phase 3+] Used during order entry and kitchen ticket generation
 */
export interface Modifier {
  id: string; // 'extra-cheese', 'bacon', 'no-onion'
  name: string; // 'Queso extra'
  price: number; // 15 (additional cost)
  category: 'topping' | 'replacement' | 'removal' | 'sauce'; // grouping
  maxQuantity?: number; // can add max 2x
  isDefault?: boolean; // pre-selected on order
  allergens?: Allergen[]; // inherits allergens from modifier itself
}

export type Allergen = 
  | 'gluten'
  | 'dairy'
  | 'peanuts'
  | 'tree-nuts'
  | 'soy'
  | 'fish'
  | 'shellfish'
  | 'eggs'
  | 'sesame'
  | 'mustard';

/**
 * Availability status (for Phase 1 and beyond)
 * [Phase 1] Static (always available or never), [Phase 3] Dynamic (change during service)
 */
export interface Availability {
  isAvailable: boolean; // true = item can be ordered
  reason?: string; // 'Out of stock', 'Kitchen closed', 'Seasonal'
  unavailableUntil?: string; // ISO timestamp when it will be available again
  daysOfWeekAvailable?: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  timeWindowAvailable?: {
    startTime: string; // '18:00'
    endTime: string; // '21:30'
  };
}

// ============================================================================
// PROMOTIONS & CAMPAIGNS (Phase 7+, stub for now)
// ============================================================================

export interface Promotion {
  id: string;
  title: string;
  description: string;
  validity: {
    startDate: string; // ISO date
    endDate: string;
  };
  applicableItems: string[]; // MenuItem IDs
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  conditions?: {
    minimumOrderAmount?: number;
    maximumUses?: number;
    applicableDays?: string[];
    timeWindow?: { startTime: string; endTime: string };
  };
}

// ============================================================================
// COMPLETE MENU DOCUMENT
// ============================================================================

export interface MenuDocument {
  version: string; // '1.0.0' (for schema versioning)
  lastUpdated: string; // ISO timestamp
  effectiveDate: string; // ISO date
  
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
  promotions?: Promotion[]; // future
  
  // [Phase 3+] Metadata
  metadata?: {
    itemCount: number;
    categoryCount: number;
    lastModifiedBy?: string; // user who last edited
    notes?: string;
  };
}

// ============================================================================
// ORDERING & FULFILLMENT (Phase 3+ structures, referenced from menu)
// ============================================================================

/**
 * Order structure (minimal stub for Phase 1, full in Phase 3)
 * Phase 1 doesn't create orders yet, but we define the shape
 */
export interface OrderItem {
  itemId: string;
  quantity: number;
  selectedModifiers?: Modifier[];
  priceAtTime: number; // price when ordered (for historical accuracy)
  specialInstructions?: string;
  prepTimeEstimate?: number; // minutes, inherited from MenuItem
}

export interface Order {
  id: string; // 'ORDER-20260705-001'
  tableNumber?: number; // null for takeout
  guestName?: string; // for delivery or large parties
  
  items: OrderItem[];
  
  // [Phase 3] State machine
  status: 'pending' | 'confirmed' | 'in_preparation' | 'ready' | 'delivered' | 'paid' | 'cancelled';
  statusHistory: Array<{
    status: Order['status'];
    timestamp: string;
    updatedBy?: string; // 'kitchen', 'cashier', 'system'
  }>;
  
  totalPrice: number;
  payment?: {
    method: 'cash' | 'card' | 'qr_code';
    amount: number;
    timestamp?: string;
  };
  
  createdAt: string;
  completedAt?: string;
}

// ============================================================================
// EXPORT VALIDATION HELPERS
// ============================================================================

/**
 * Check if item is available now (respecting hours, inventory, etc.)
 * Used in Phase 1 for display, Phase 3 for ordering constraints
 */
export function isItemAvailableNow(
  item: MenuItem,
  currentTime: Date,
  restaurantHours: ServiceHours[]
): boolean {
  if (!item.availability.isAvailable) return false;
  
  if (item.availability.daysOfWeekAvailable) {
    const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    if (!item.availability.daysOfWeekAvailable.includes(dayName as any)) return false;
  }
  
  if (item.availability.timeWindowAvailable) {
    const timeStr = currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    if (timeStr < item.availability.timeWindowAvailable.startTime) return false;
    if (timeStr > item.availability.timeWindowAvailable.endTime) return false;
  }
  
  if (item.availability.unavailableUntil) {
    if (new Date(item.availability.unavailableUntil) > currentTime) return false;
  }
  
  return true;
}

/**
 * Calculate total price including modifiers
 * Used in Phase 3 for order calculation
 */
export function calculateItemPrice(
  item: MenuItem,
  selectedModifiers: Modifier[] = [],
  variation?: PriceVariation
): number {
  let total = item.price;
  
  if (variation) {
    if (variation.modifierType === 'replacement') {
      total = variation.priceModifier;
    } else {
      total += variation.priceModifier;
    }
  }
  
  selectedModifiers.forEach((mod) => {
    total += mod.price;
  });
  
  return total;
}
