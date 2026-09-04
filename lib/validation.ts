import { z } from "zod";

export const productSchema = z.object({
  brand: z.string().trim().min(2).max(40),
  model: z.string().trim().min(2).max(80),
  storage: z.string().trim().min(2).max(20),
  color: z.string().trim().min(2).max(40),
  condition: z.enum(["Novo", "Seminovo"]),
  price: z.coerce.number().min(0).max(1_000_000),
  stock: z.coerce.number().int().min(0).max(10_000),
  battery_health: z.union([z.coerce.number().int().min(0).max(100), z.null()]).optional(),
  warranty: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(4000),
  images: z.array(z.string().url()).min(1).max(12),
  primary_image: z.coerce.number().int().min(0),
  featured: z.boolean().default(false),
  hidden: z.boolean().default(false),
  slug: z.string().trim().min(2).max(120),
});

export const companySchema = z.object({
  name: z.string().trim().min(2).max(80),
  whatsapp: z.string().regex(/^\d{10,13}$/),
  address: z.string().trim().max(160),
  city: z.string().trim().max(80),
  state: z.string().trim().length(2),
  business_hours: z.string().trim().max(160),
  instagram: z.string().trim().max(100),
  facebook: z.string().trim().max(100),
  description: z.string().trim().max(500),
  logo_url: z.string().url().nullable().optional(),
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  banner_url: z.string().url().nullable().optional(),
});
