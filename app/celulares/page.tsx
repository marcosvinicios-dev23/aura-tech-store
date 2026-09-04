import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog-client";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCompany, getProducts } from "@/lib/repository";
import { companyTheme } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Celulares",
  description: "Pesquise celulares novos e seminovos por marca, preço, condição e armazenamento.",
};

export default async function CatalogPage() {
  const [company, products] = await Promise.all([getCompany(), getProducts()]);
  return <div style={companyTheme(company)}><SiteHeader company={company} /><main><CatalogClient products={products} /></main><SiteFooter company={company} /></div>;
}
