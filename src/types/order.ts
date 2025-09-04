export interface OrderList {
    id: number;
    user_id: number;
    total_amount: number;
    status: string;
    created_at: string;
}

export interface OrderItems {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
}