export interface PromotionType {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number; 
    start_date: Date; 
    end_date: Date; 
    usage_limit: number;
    min_order_value: number; 
    user_limit: number;
    created_at: Date; 
    updated_at: Date; 
}

export interface PromotionUsageType {
    id: number;
    promo_code_id: number;
    user_id: number;
    order_id: number;
    used_at: string;
    discount_applied: number;
}