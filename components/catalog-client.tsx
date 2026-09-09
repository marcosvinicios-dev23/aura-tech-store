"use client";

import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product, ProductCategory, ProductCondition } from "@/lib/types";
import { ProductCard } from "./product-card";

type Sort = "recent" | "low" | "high" | "az";

export function CatalogClient({ products }: { products: Product[] }) {
  const prices = products.map((p) => p.price);
  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [condition, setCondition] = useState<"Todos" | ProductCondition>("Todos");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const brandOptions = [...new Set(products.map((p) => p.brand))].sort();
  const categoryOptions = [...new Set(products.map((p) => p.category))].sort();

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products
      .filter((p) => !term || [p.category, p.brand, p.model, p.storage].some((value) => value.toLowerCase().includes(term)))
      .filter((p) => !categories.length || categories.includes(p.category))
      .filter((p) => !brands.length || brands.includes(p.brand))
      .filter((p) => condition === "Todos" || p.condition === condition)
      .filter((p) => !min || p.price >= Number(min))
      .filter((p) => !max || p.price <= Number(max))
      .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "az" ? a.model.localeCompare(b.model) : +new Date(b.created_at) - +new Date(a.created_at));
  }, [products, query, brands, categories, condition, min, max, sort]);

  const toggleBrand = (brand: string) => setBrands((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]);
  const toggleCategory = (category: ProductCategory) => setCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  const clear = () => { setBrands([]); setCategories([]); setCondition("Todos"); setMin(""); setMax(""); };

  const filters = (
    <>
      <div className="catalog-topbar mobile-filter"><strong>Filtros</strong><button className="icon-button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros"><X /></button></div>
      <div className="filter-group"><h3>Faixa de preço</h3><div className="price-inputs"><input inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value)} placeholder={`Mín. ${Math.floor(Math.min(...prices, 0))}`} aria-label="Preço mínimo" /><input inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value)} placeholder={`Máx. ${Math.ceil(Math.max(...prices, 0))}`} aria-label="Preço máximo" /></div></div>
      <div className="filter-group"><h3>Categoria</h3>{categoryOptions.map((category) => <label className="check-option" key={category}><input type="checkbox" checked={categories.includes(category)} onChange={() => toggleCategory(category)} />{category}</label>)}</div>
      <div className="filter-group"><h3>Condição</h3>{(["Todos", "Novo", "Seminovo"] as const).map((item) => <label className="check-option" key={item}><input type="radio" name="condition" checked={condition === item} onChange={() => setCondition(item)} />{item}</label>)}</div>
      <div className="filter-group"><h3>Marca</h3>{brandOptions.map((brand) => <label className="check-option" key={brand}><input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} />{brand}</label>)}</div>
      <button className="button button-soft button-block" onClick={clear}>Limpar filtros</button>
    </>
  );

  return (
    <>
      <section className="catalog-hero"><div className="container"><span className="eyebrow">Catálogo demonstrativo</span><h1>Encontre seu próximo aparelho</h1><p>Pesquise celulares, MacBooks e notebooks disponíveis e fale com a equipe pelo WhatsApp.</p><div className="search-box"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquise por produto, marca ou armazenamento..." aria-label="Pesquisar produtos" /></div></div></section>
      <div className="container catalog-layout">
        <aside className={`filters-panel ${filtersOpen ? "mobile-open" : ""}`}>{filters}</aside>
        <section>
          <div className="catalog-topbar"><div><strong>{filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}</strong><button className="button button-soft mobile-filter" onClick={() => setFiltersOpen(true)}><Filter size={17} /> Filtros</button></div><select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar produtos"><option value="recent">Mais recentes</option><option value="low">Menor preço</option><option value="high">Maior preço</option><option value="az">A–Z</option></select></div>
          <div className="products-grid catalog-products">{filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-state"><SlidersHorizontal size={42} /><h3>Nenhum produto encontrado</h3><p>Tente remover algum filtro ou buscar outro modelo.</p><button className="button button-soft" onClick={clear}>Limpar filtros</button></div>}</div>
          <p className="demo-note">Itens fictícios para demonstração. A disponibilidade deve ser confirmada com a empresa.</p>
        </section>
      </div>
    </>
  );
}
