import Link from "next/link";
import { ArrowRight, EyeOff, PackageCheck, PackageX, Smartphone } from "lucide-react";
import { getProducts } from "@/lib/repository";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboard() {
  const products = await getProducts({admin:true});
  const active=products.filter(p=>!p.hidden&&p.stock>0).length, hidden=products.filter(p=>p.hidden).length, out=products.filter(p=>p.stock===0).length;
  return <><header className="admin-topbar"><div><h1>Visão geral</h1><p>Acompanhe seu catálogo de forma simples.</p></div><Link className="button button-primary" href="/admin/produtos/novo">Adicionar celular <ArrowRight size={18}/></Link></header><div className="stats-grid"><article className="stat-card"><PackageCheck color="#067647"/><span>Produtos ativos</span><strong>{active}</strong></article><article className="stat-card"><EyeOff color="#667085"/><span>Produtos ocultos</span><strong>{hidden}</strong></article><article className="stat-card"><Smartphone color="#176bff"/><span>Total de produtos</span><strong>{products.length}</strong></article><article className="stat-card"><PackageX color="#b42318"/><span>Sem estoque</span><strong>{out}</strong></article></div><section className="admin-card"><h2>Produtos recentes</h2>{products.slice(0,5).map(p=><div className="service" key={p.id}><img src={p.images[p.primary_image]||p.images[0]} alt="" style={{width:48,height:48,objectFit:"cover",borderRadius:10}}/><div style={{flex:1}}><b>{p.model} • {p.storage}</b><small style={{display:"block",color:"#667085"}}>{p.brand} — {formatCurrency(p.price)}</small></div><span className={`status-pill ${p.stock===0?"out":p.hidden?"hidden":""}`}>{p.stock===0?"Sem estoque":p.hidden?"Oculto":"Ativo"}</span></div>)}<Link className="text-link" href="/admin/produtos">Gerenciar todos <ArrowRight size={17}/></Link></section></>;
}
