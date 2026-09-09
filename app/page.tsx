import Link from "next/link";
import { ArrowRight, BatteryCharging, MonitorSmartphone, SearchCheck, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { getCompany, getProducts } from "@/lib/repository";
import { companyTheme, whatsappUrl } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function HomePage() {
  const [company, products] = await Promise.all([getCompany(), getProducts()]);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const wa = whatsappUrl(company.whatsapp, "Olá! Vim pelo site e gostaria de falar com a equipe da TechCell.");
  const services = [
    [MonitorSmartphone, "Troca de tela", "Vidro, touch ou imagem danificada."],
    [BatteryCharging, "Troca de bateria", "Mais autonomia e segurança para seu aparelho."],
    [Wrench, "Conector de carga", "Reparo para falhas e mau contato ao carregar."],
    [Smartphone, "Manutenção de software", "Atualização, lentidão e recuperação do sistema."],
    [SearchCheck, "Diagnóstico", "Avaliação técnica clara antes de qualquer serviço."],
    [ShieldCheck, "Notebooks", "Limpeza, manutenção e melhorias de desempenho."],
  ] as const;
  return (
    <div style={companyTheme(company)}>
      <SiteHeader company={company} />
      <main>
        <section className="home-hero">
          {company.banner_url && <div className="hero-uploaded-banner" style={{ backgroundImage: `url("${company.banner_url}")` }} />}
          <div className="hero-orb one" /><div className="hero-orb two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Tecnologia com procedência</span>
              <h1>Seu próximo aparelho pode estar aqui.</h1>
              <p>Celulares, MacBooks e notebooks novos ou seminovos, com atendimento rápido e assistência especializada.</p>
              <div className="hero-buttons"><Link href="/celulares" className="button button-primary button-lg">Ver produtos <ArrowRight /></Link><a href={wa} target="_blank" rel="noreferrer" className="button button-outline button-lg">Falar no WhatsApp</a></div>
              <div className="hero-trust"><span><ShieldCheck /> Garantia e procedência</span><span><SearchCheck /> Avaliação transparente</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-device"><div className="device-camera"><i/><i/><i/></div><div className="device-glow"/></div>
              <div className="floating-card card-top"><span>Atendimento rápido</span><b>Direto no WhatsApp</b></div>
              <div className="floating-card card-bottom"><span>Aparelhos revisados</span><b>Novo ou seminovo</b></div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="section-heading"><div><span className="eyebrow dark">Escolhas em destaque</span><h2>Produtos selecionados</h2><p>Veja algumas opções cadastradas nesta demonstração.</p></div><Link href="/celulares" className="text-link">Ver catálogo completo <ArrowRight /></Link></div>
          <div className="products-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          <p className="demo-note">Catálogo demonstrativo. Consulte a empresa para confirmar disponibilidade.</p>
        </section>

        <section className="services-section" id="assistencia">
          <div className="container"><div className="section-heading light"><div><span className="eyebrow">Assistência especializada</span><h2>Cuidado técnico do diagnóstico à entrega.</h2><p>Serviços essenciais apresentados de forma simples e confiável.</p></div></div>
          <div className="services-grid">{services.map(([Icon,title,text]) => <article className="service-card" key={title}><span><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <section className="section container"><div className="main-cta"><div><span className="eyebrow">Atendimento humano</span><h2>Encontrou o aparelho que procurava?</h2><p>Fale com nossa equipe pelo WhatsApp.</p></div><a href={wa} target="_blank" rel="noreferrer" className="button button-white button-lg">Conversar no WhatsApp <ArrowRight /></a></div></section>
      </main>
      <SiteFooter company={company} />
    </div>
  );
}
