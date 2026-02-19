export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
