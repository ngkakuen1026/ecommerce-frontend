export interface Product {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  image_url: string;
}