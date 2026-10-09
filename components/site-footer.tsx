import Link from "next/link";
import { Facebook, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import type { Company } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteFooter({ company }: { company: Company }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div><Logo inverse name={company.name} image={company.logo_url} /><p>{company.description}</p><div className="socials">{company.instagram && <a href={`https://instagram.com/${company.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>}{company.facebook && <a href={`https://www.facebook.com/${encodeURIComponent(company.facebook)}`} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>}</div></div>
        <div><h3>Navegação</h3><Link href="/">Início</Link><Link href="/celulares">Produtos</Link><Link href="/#assistencia">Assistência técnica</Link></div>
        <div><h3>Atendimento</h3><p><MapPin /> {company.address}, {company.city} — {company.state}</p><p><Clock /> {company.business_hours}</p><a href={whatsappUrl(company.whatsapp, `Olá! Gostaria de falar com a ${company.name}.`)} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {company.name}.</span><span>Todos os direitos reservados.</span></div>
    </footer>
  );
}
