import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCompany, getProductBySlug } from "@/lib/repository";
import { companyTheme, formatCurrency, whatsappUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.model} ${product.storage}`,
    description: `${product.condition} • ${product.storage} • ${formatCurrency(product.price)}. Consulte disponibilidade pelo WhatsApp.`,
    openGraph: { images: product.images[product.primary_image] ? [product.images[product.primary_image]] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [company, product] = await Promise.all([getCompany(), getProductBySlug(slug)]);
  if (!product) notFound();
  const message = `Olá! Tenho interesse no ${product.model} ${product.storage} que vi no site. Gostaria de saber mais informações sobre esse produto.`;
  const specs = [["Categoria",product.category],["Marca",product.brand],["Armazenamento",product.storage],["Cor",product.color],["Condição",product.condition],["Bateria",product.battery_health ? `${product.battery_health}%` : "Não se aplica"],["Garantia",product.warranty]];
  return <div style={companyTheme(company)}><SiteHeader company={company} /><main className="container product-detail"><div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/celulares">Produtos</Link><span>/</span><span>{product.model}</span></div><div className="detail-grid"><ProductGallery images={product.images} name={`${product.brand} ${product.model}`} /><div className="detail-info"><span className={`condition-badge ${product.condition==="Novo"?"new":""}`} style={{position:"static"}}>{product.condition}</span><h1>{product.model}</h1><p>{product.category} • {product.brand} • {product.storage}</p><strong className="detail-price">{formatCurrency(product.price)}</strong><div className="detail-specs">{specs.map(([label,value])=><div className="detail-spec" key={label}><small>{label}</small><b>{value}</b></div>)}</div><p className="detail-description">{product.description}</p><div className="no-online"><strong>NÃO COMPRAMOS ONLINE</strong><p>Entre em contato pelo WhatsApp para consultar disponibilidade, condições e formas de pagamento.</p></div><a className="button whatsapp-large button-lg" href={whatsappUrl(company.whatsapp,message)} target="_blank" rel="noreferrer"><MessageCircle /> Tenho interesse neste produto</a><p className="demo-note"><ShieldCheck size={14} /> Produto demonstrativo. Confirme todas as informações com a empresa.</p></div></div></main><SiteFooter company={company} /></div>;
}
