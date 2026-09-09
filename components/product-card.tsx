import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[product.primary_image] || product.images[0];
  return (
    <article className="product-card">
      <Link href={`/celulares/${product.slug}`} className="product-image">
        <Image src={image} alt={`${product.brand} ${product.model}`} fill sizes="(max-width: 760px) 100vw, (max-width: 980px) 50vw, 25vw" />
        <span className={`condition-badge ${product.condition === "Novo" ? "new" : ""}`}>{product.condition}</span>
      </Link>
      <div className="product-body">
        <span className="product-brand">{product.category} • {product.brand}</span>
        <h3><Link href={`/celulares/${product.slug}`}>{product.model}</Link></h3>
        <div className="product-specs"><span>{product.storage}</span><span>{product.color}</span></div>
        <strong className="product-price">{formatCurrency(product.price)}</strong>
        <Link href={`/celulares/${product.slug}`} className="product-link">Ver detalhes <ArrowUpRight size={17} /></Link>
      </div>
    </article>
  );
}
