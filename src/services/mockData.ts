import { faker } from '@faker-js/faker';

// --- Types ---
export interface CustomerDetails {
    email: string;
    total_spend: number;
    visit_count: number;
    last_visit: string;
    loyalty_points: number;
    loyalty_tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    email_open_rate: number; // 0-100%
    recent_transactions: {
        id: string;
        date: string;
        amount: number;
        items: string[];
    }[];
}

export interface Transaction {
    id: string;
    customer_name: string;
    amount: number;
    status: 'succeeded' | 'processing' | 'failed';
    date: Date;
    items: string[];
    customer_details: CustomerDetails;
}

export interface InventoryHistory {
    date: string;
    price: number;
    quantity: number;
    supplier: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    in_stock: number;
    unit: string;
    par_level: number;
    status: 'ok' | 'low' | 'critical';
    last_restock: string;
    history: InventoryHistory[];
}

export interface Supplier {
    id: string;
    name: string;
    contact: string;
    reliabilityScore: number; // 0-100
    onTimeDeliveryRate: number; // 0-100
    avgDeliveryTime: string;
}

export interface SupplierOrder {
    id: string;
    supplier_name: string;
    supplier_id: string;
    items: string;
    total: number;
    status: 'delivered' | 'pending' | 'cancelled';
    date: string;
}

export interface IngredientPricePoint {
    date: string;
    price: number;
}

export interface Ingredient {
    name: string;
    supplier: string;
    history: IngredientPricePoint[];
}

// --- AI Insights Types ---
export interface DailyBriefing {
    greeting: string;
    kpiSummary: string;
    alerts: string[];
    actionItem: string;
}

export interface SmartParItem {
    id: string;
    name: string;
    currentPar: number;
    recommendedPar: number;
    wasteSavings: number;
    reason: string;
}

export interface MenuPairing {
    itemA: string;
    itemB: string;
    frequency: number; // 0-100%
    insight: string;
    trend: { date: string; frequency: number }[];
}

export interface PluginIntegration {
    id: string;
    name: string;
    category: 'POS' | 'Supply Chain' | 'Delivery' | 'Accounting' | 'Staffing';
    description: string;
    logo: string;
    status: 'connected' | 'disconnected' | 'pending';
    enabled: boolean;
}

// --- Generators ---

// Sales / Stripe Data
export const generateTransactions = (count: number = 10): Transaction[] => {
    return Array.from({ length: count }).map(() => {
        const visitCount = faker.number.int({ min: 1, max: 50 });
        const totalSpend = parseFloat(faker.finance.amount({ min: 50, max: 2000 }));

        // Calculate loyalty tier based on spend
        let tier: CustomerDetails['loyalty_tier'] = 'Bronze';
        if (totalSpend > 1000) tier = 'Platinum';
        else if (totalSpend > 500) tier = 'Gold';
        else if (totalSpend > 200) tier = 'Silver';

        return {
            id: faker.string.uuid(),
            customer_name: faker.person.fullName(),
            amount: parseFloat(faker.finance.amount({ min: 5, max: 45 })), // Lower amounts for cafe
            status: faker.helpers.arrayElement(['succeeded', 'succeeded', 'succeeded', 'processing', 'failed']),
            date: faker.date.recent({ days: 2 }),
            items: [faker.helpers.arrayElement([
                'Smoked Salmon Bagel', 'Cream Cheese Bagel', 'Large Latte', 'Cappuccino', 'Dozen Bagels Mixed', 'Iced Coffee', 'Egg & Cheese Bagel'
            ])],
            customer_details: {
                email: faker.internet.email(),
                total_spend: totalSpend,
                visit_count: visitCount,
                last_visit: faker.date.recent({ days: 14 }).toLocaleDateString(),
                loyalty_points: Math.floor(totalSpend * 10), // 10 points per dollar
                loyalty_tier: tier,
                email_open_rate: faker.number.int({ min: 10, max: 90 }),
                recent_transactions: Array.from({ length: 3 }).map(() => ({
                    id: faker.string.uuid(),
                    date: faker.date.past({ years: 1 }).toLocaleDateString(),
                    amount: parseFloat(faker.finance.amount({ min: 5, max: 50 })),
                    items: [faker.helpers.arrayElement(['Coffee', 'Bagel', 'Sandwich', 'Pastry'])]
                }))
            }
        };
    });
};

export const generateRevenueData = (days: number = 7) => {
    return Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return {
            date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            revenue: faker.number.int({ min: 1200, max: 3500 })
        };
    });
};

// Inventory Data
export const generateInventory = (count: number = 12): InventoryItem[] => {
    const bagelShopItems = [
        { name: "Everything Bagels", category: "Bakery", unit: "doz", par: 20 },
        { name: "Plain Bagels", category: "Bakery", unit: "doz", par: 25 },
        { name: "Sesame Bagels", category: "Bakery", unit: "doz", par: 15 },
        { name: "Plain Cream Cheese", category: "Dairy", unit: "tub", par: 10 },
        { name: "Scallion Cream Cheese", category: "Dairy", unit: "tub", par: 8 },
        { name: "Lox (Smoked Salmon)", category: "Meat/Fish", unit: "lbs", par: 15 },
        { name: "Capers", category: "Produce", unit: "jar", par: 5 },
        { name: "Red Onions", category: "Produce", unit: "lbs", par: 10 },
        { name: "Espresso Beans", category: "Dry Goods", unit: "lbs", par: 30 },
        { name: "Oat Milk", category: "Dairy", unit: "carton", par: 24 },
        { name: "Whole Milk", category: "Dairy", unit: "gal", par: 12 },
        { name: "To-Go Cups (12oz)", category: "Packaging", unit: "slv", par: 5 }
    ];

    return bagelShopItems.slice(0, count).map((item) => {
        // Deterministic status based on simulated stock for demonstration
        // Force some low/critical items
        const stockRatio = faker.number.float({ min: 0, max: 1.5 });
        const stock = Math.floor(item.par * stockRatio); // Random stock relative to par

        let status: InventoryItem['status'] = 'ok';
        if (stock === 0) status = 'critical';
        else if (stock < item.par * 0.4) status = 'low'; // Low is < 40% of par

        // Generate history
        // Generate history with realistic small price deviations
        const basePrice = parseFloat(faker.finance.amount({ min: 10, max: 50 }));

        const history: InventoryHistory[] = Array.from({ length: 6 }).map((_, i) => {
            const deviation = faker.number.float({ min: -2.5, max: 2.5 }); // Keep deviation within ~5 range total
            const price = Math.max(0, basePrice + deviation); // Ensure positive price

            return {
                date: new Date(Date.now() - (6 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                price: parseFloat(price.toFixed(2)),
                quantity: faker.number.int({ min: 10, max: 100 }),
                supplier: faker.company.name()
            };
        });

        return {
            id: faker.string.uuid(),
            name: item.name,
            category: item.category,
            in_stock: stock,
            unit: item.unit,
            par_level: item.par,
            status,
            last_restock: faker.date.recent({ days: 5 }).toLocaleDateString(),
            history
        };
    });
};

// Supplier Data
export const generateSuppliers = (count: number = 5): Supplier[] => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        contact: faker.phone.number(),
        reliabilityScore: faker.number.int({ min: 70, max: 100 }),
        onTimeDeliveryRate: faker.number.int({ min: 80, max: 100 }),
        avgDeliveryTime: `${faker.number.int({ min: 1, max: 3 })} days`
    }));
};

export const generateSupplierOrders = (count: number = 8): SupplierOrder[] => {
    return Array.from({ length: count }).map(() => ({
        id: `PO-${faker.number.int({ min: 1000, max: 9999 })}`,
        supplier_name: faker.company.name(),
        supplier_id: faker.string.uuid(),
        items: `${faker.number.int({ min: 3, max: 20 })} items`,
        total: parseFloat(faker.finance.amount({ min: 500, max: 5000 })),
        status: faker.helpers.arrayElement(['delivered', 'delivered', 'pending']),
        date: faker.date.past({ years: 1 }).toLocaleDateString()
    }));
};

// Ingredient Pricing History
// Ingredient Pricing History
export const generatePricingHistory = (count: number = 4): Ingredient[] => {
    const bagelIngredients = [
        { name: "High-Gluten Flour (50lb)", basePrice: 42.00, supplier: "GrainMill Co" },
        { name: "Malt Barley Syrup (5gal)", basePrice: 65.50, supplier: "SweetMalt Supplies" },
        { name: "Bulk Cream Cheese (30lb)", basePrice: 85.00, supplier: "DairyFresh" },
        { name: "Nova Lox (Side)", basePrice: 28.00, supplier: "SeaHarvest" },
        { name: "Sesame Seeds (5lb)", basePrice: 18.50, supplier: "SpiceWorld" },
        { name: "Poppy Seeds (5lb)", basePrice: 22.00, supplier: "SpiceWorld" }
    ];

    return bagelIngredients.slice(0, count).map((item) => ({
        name: item.name,
        supplier: item.supplier,
        history: Array.from({ length: 6 }).map((_, i) => {
            const trend = (i * faker.number.float({ min: 0.5, max: 2.5 })) * (Math.random() > 0.5 ? 1 : -0.5); // Slight upward/downward drift
            return {
                date: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
                price: parseFloat((item.basePrice + trend).toFixed(2))
            };
        })
    }));
};

// --- AI Insights Generators ---

export const generateDailyBriefing = (): DailyBriefing => {
    return {
        greeting: "Good morning, Chef!",
        kpiSummary: "Sales are trending up 12% compared to last week, driven by a surge in morning coffee orders.",
        alerts: [
            "Run rate for **Espresso Beans** is high. Predicted stock-out in 2 days.",
            "Supplier **FarmFresh** is showing a delay risk for Friday's delivery."
        ],
        actionItem: "Consider increasing the par level for *Everything Bagels* for the upcoming weekend rush."
    };
};

export const generateSmartPars = (): SmartParItem[] => {
    return [
        { id: '1', name: 'Plain Bagels', currentPar: 25, recommendedPar: 20, wasteSavings: 45, reason: "Consistent overflow on Mondays" },
        { id: '2', name: 'Oat Milk', currentPar: 24, recommendedPar: 32, reason: "High demand trend +15%", wasteSavings: 0 },
        { id: '3', name: 'Lox (Smoked Salmon)', currentPar: 15, recommendedPar: 12, wasteSavings: 120, reason: "Spoilage detected last 2 weeks" },
        { id: '4', name: 'To-Go Cups (12oz)', currentPar: 5, recommendedPar: 8, reason: "Running out by 2 PM daily", wasteSavings: 0 }
    ];
};

export const generateMenuMatrix = (): MenuPairing[] => {
    const generateTrend = (baseFreq: number) => {
        return Array.from({ length: 6 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (5 - i) * 7); // Weekly data points
            const variance = faker.number.float({ min: -10, max: 10 });
            return {
                date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
                frequency: Math.min(100, Math.max(0, baseFreq + variance))
            };
        });
    };

    return [
        {
            itemA: "Lox Bagel",
            itemB: "Large Latte",
            frequency: 68,
            insight: "Strong breakfast combo",
            trend: generateTrend(68)
        },
        {
            itemA: "Plain Bagel",
            itemB: "Cream Cheese",
            frequency: 92,
            insight: "Essential pairing",
            trend: generateTrend(92)
        },
        {
            itemA: "Everything Bagel",
            itemB: "Iced Coffee",
            frequency: 45,
            insight: "Growing lunch trend",
            trend: generateTrend(45)
        },
        {
            itemA: "Capers",
            itemB: "Lox Bagel",
            frequency: 30,
            insight: "Upsell opportunity",
            trend: generateTrend(30)
        }
    ];
};

export const generatePlugins = (): PluginIntegration[] => {
    return [
        {
            id: 'square',
            name: 'Square',
            category: 'POS',
            description: 'Sync orders, payments, and catalog data in real-time.',
            logo: 'https://logo.clearbit.com/squareup.com',
            status: 'connected',
            enabled: true
        },
        {
            id: 'toast',
            name: 'Toast',
            category: 'POS',
            description: 'Unified restaurant management platform integration.',
            logo: 'https://logo.clearbit.com/toasttab.com',
            status: 'disconnected',
            enabled: false
        },
        {
            id: 'clover',
            name: 'Clover',
            category: 'POS',
            description: 'Flexible POS system for payments and order tracking.',
            logo: 'https://logo.clearbit.com/clover.com',
            status: 'disconnected',
            enabled: false
        },
        {
            id: 'sysco',
            name: 'Sysco',
            category: 'Supply Chain',
            description: 'Automated ordering and inventory sync with major distributor.',
            logo: 'https://logo.clearbit.com/sysco.com',
            status: 'connected',
            enabled: true
        },
        {
            id: 'marketman',
            name: 'MarketMan',
            category: 'Supply Chain',
            description: 'Inventory management and food cost control integration.',
            logo: 'https://logo.clearbit.com/marketman.com',
            status: 'pending',
            enabled: true
        },
        {
            id: '7shifts',
            name: '7shifts',
            category: 'Staffing',
            description: 'Sync schedule data for labor cost estimation.',
            logo: 'https://logo.clearbit.com/7shifts.com',
            status: 'connected',
            enabled: true
        },
        {
            id: 'quickbooks',
            name: 'QuickBooks',
            category: 'Accounting',
            description: 'Automated daily sales entries and invoice syncing.',
            logo: 'https://logo.clearbit.com/quickbooks.intuit.com',
            status: 'disconnected',
            enabled: false
        },
        {
            id: 'ubereats',
            name: 'UberEats',
            category: 'Delivery',
            description: 'Direct order injection and menu syncing.',
            logo: 'https://logo.clearbit.com/ubereats.com',
            status: 'connected',
            enabled: true
        },
        {
            id: 'doordash',
            name: 'DoorDash',
            category: 'Delivery',
            description: 'Manage delivery orders and analyze performance.',
            logo: 'https://logo.clearbit.com/doordash.com',
            status: 'disconnected',
            enabled: false
        },
        {
            id: 'lightspeed',
            name: 'Lightspeed',
            category: 'POS',
            description: 'Cloud-based commerce platform for restaurants.',
            logo: 'https://logo.clearbit.com/lightspeedhq.com',
            status: 'disconnected',
            enabled: false
        }
    ];
};
