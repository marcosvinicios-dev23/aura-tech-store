import Link from "next/link";

export default function NotFound() {
  return <main className="login-form-wrap"><div className="login-card"><span className="eyebrow dark">404</span><h2>Página não encontrada</h2><p>O endereço pode ter mudado ou o aparelho não está mais disponível.</p><Link className="button button-primary" href="/celulares">Voltar aos celulares</Link></div></main>;
}
