import "server-only";
import { demoCompany, demoProducts } from "./demo-data";
import { hasDatabase, supabaseRequest } from "./supabase";
import type { Company, Product, ProductCategory } from "./types";

const companySlug = "techcell-assistencia";

function normalizeProduct(product: Product): Product {
  const category = (product.category || "Celular") as ProductCategory;
  return { ...product, category };
}

export async function getCompany(): Promise<Company> {
  if (!hasDatabase()) return demoCompany;
  const rows = await supabaseRequest<Company[]>(`companies?slug=eq.${companySlug}&limit=1`);
  if (rows[0]) return rows[0];
  const created = await supabaseRequest<Company[]>("companies", {
    method: "POST",
    body: JSON.stringify(demoCompany),
  });
  await supabaseRequest<Product[]>("products", {
    method: "POST",
    body: JSON.stringify(demoProducts),
  });
  return created[0];
}

export async function getProducts(options: { admin?: boolean } = {}): Promise<Product[]> {
  if (!hasDatabase()) return demoProducts;
  const company = await getCompany();
  const visibility = options.admin ? "" : "&hidden=eq.false&stock=gt.0";
  const products = await supabaseRequest<Product[]>(
    `products?company_id=eq.${company.id}${visibility}&order=created_at.desc`,
  );
  return products.map(normalizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts({ admin: true });
  return products.find((product) => product.id === id) || null;
}

export async function createProduct(input: Omit<Product, "id" | "company_id" | "created_at" | "updated_at">) {
  const company = await getCompany();
  const rows = await supabaseRequest<Product[]>("products", {
    method: "POST",
    body: JSON.stringify({ ...input, company_id: company.id }),
  });
  return rows[0];
}

export async function updateProduct(id: string, input: Partial<Product>) {
  const safe = { ...input, updated_at: new Date().toISOString() };
  delete safe.id;
  delete safe.company_id;
  const rows = await supabaseRequest<Product[]>(`products?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(safe),
  });
  return rows[0];
}

export async function deleteProduct(id: string) {
  await supabaseRequest<void>(`products?id=eq.${id}`, { method: "DELETE" });
}

export async function updateCompany(input: Partial<Company>) {
  const company = await getCompany();
  const safe = { ...input };
  delete safe.id;
  const rows = await supabaseRequest<Company[]>(`companies?id=eq.${company.id}`, {
    method: "PATCH",
    body: JSON.stringify(safe),
  });
  return rows[0];
}
