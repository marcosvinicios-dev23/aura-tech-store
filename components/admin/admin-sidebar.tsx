"use client";

import { LayoutDashboard, LogOut, Package, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";

const links = [
  ["/admin", "Dashboard", LayoutDashboard],
  ["/admin/produtos", "Produtos", Package],
  ["/admin/produtos/novo", "Adicionar produto", PlusCircle],
  ["/admin/configuracoes", "Configurações", Settings],
] as const;

export function AdminSidebar() {
  const pathname = usePathname(); const router = useRouter();
  async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.replace("/admin/login");router.refresh()}
  return <aside className="admin-sidebar"><Logo inverse /><nav className="admin-nav">{links.map(([href,label,Icon])=><Link href={href} className={pathname===href?"active":""} key={href}><Icon size={20}/><span>{label}</span></Link>)}</nav><button className="logout-button" onClick={logout}><LogOut size={20}/><span>Sair</span></button></aside>;
}
