"use client";

import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setError(data.error || "Não foi possível entrar.");
    router.replace("/admin"); router.refresh();
  }
  return <form className="login-card" onSubmit={submit}><LockKeyhole color="#176bff" /><h2>Painel administrativo</h2><p>Entre para gerenciar produtos e informações da empresa.</p>{error && <p className="form-error" role="alert">{error}</p>}<label className="field">E-mail<input name="email" type="text" inputMode="email" autoComplete="username" required placeholder="seu@email.com" /></label><label className="field">Senha<div className="password-field"><input name="password" type={show ? "text" : "password"} autoComplete="current-password" required placeholder="Digite sua senha" /><button type="button" onClick={()=>setShow(!show)} aria-label={show?"Ocultar senha":"Mostrar senha"}>{show?<EyeOff size={19}/>:<Eye size={19}/>}</button></div></label><button className="button button-primary button-block button-lg" disabled={loading}>{loading?<><Loader2 className="spin" /> Entrando...</>:"Entrar"}</button></form>;
}
