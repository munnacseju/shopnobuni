export type ProductType = 'NECKLACE' | 'GOLD_CHAIN' | 'FINGER_RING' | 'EARRING' | 'ANKLET' | 'BANGLE';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: string;
    discountPercentage: number;
    type: ProductType;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    address: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
