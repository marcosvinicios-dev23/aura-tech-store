import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/admin/login-form";
import { isAuthenticated } from "@/lib/auth";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  return <main className="login-shell"><section className="login-art"><Logo inverse /><div><span className="eyebrow">Gestão simples</span><h1>Seu catálogo nas suas mãos.</h1><p>Cadastre um aparelho, adicione as fotos, publique e pronto.</p></div><small>TechCell • ambiente administrativo protegido</small></section><section className="login-form-wrap"><LoginForm /></section></main>;
}
