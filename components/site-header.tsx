"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { whatsappUrl } from "@/lib/utils";
import type { Company } from "@/lib/types";

export function SiteHeader({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);
  const contact = whatsappUrl(company.whatsapp, `Olá! Vim pelo site da ${company.name} e gostaria de atendimento.`);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo name={company.name} image={company.logo_url} />
        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
          <Link href="/" onClick={() => setOpen(false)}>Início</Link>
          <Link href="/celulares" onClick={() => setOpen(false)}>Celulares</Link>
          <Link href="/#assistencia" onClick={() => setOpen(false)}>Assistência técnica</Link>
          <a href={contact} target="_blank" rel="noreferrer" className="mobile-whatsapp"><MessageCircle size={18} /> WhatsApp</a>
        </nav>
        <div className="header-actions">
          <Link href="/celulares" className="button button-soft">Ver celulares</Link>
          <a href={contact} target="_blank" rel="noreferrer" className="button button-primary"><MessageCircle size={18} /> WhatsApp</a>
        </div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
