export interface Product {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
  image_url: string;
  images: ProductImage[];
  created_at: string;
  user: {
    username: string;
    profile_image: string;
    registration_date: string;
  };
}

export interface ProductImage {
  id: number;
  image_url: string;
}