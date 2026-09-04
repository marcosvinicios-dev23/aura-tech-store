export type ProductCondition = "Novo" | "Seminovo";

export type Product = {
  id: string;
  company_id: string;
  slug: string;
  brand: string;
  model: string;
  storage: string;
  color: string;
  condition: ProductCondition;
  price: number;
  stock: number;
  battery_health: number | null;
  warranty: string;
  description: string;
  images: string[];
  primary_image: number;
  featured: boolean;
  hidden: boolean;
  created_at: string;
  updated_at: string;
};

export type Company = {
  id: string;
  slug: string;
  name: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  business_hours: string;
  instagram: string;
  facebook: string;
  description: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  banner_url: string | null;
};
