"use client";

import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import type { Company } from "@/lib/types";

export function SettingsForm({ company }: { company: Company }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, primary_color: company.primary_color, secondary_color: company.secondary_color, logo_url: company.logo_url, banner_url: company.banner_url }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setToast("Configurações salvas.");
      setTimeout(() => setToast(""), 2500);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Não foi possível salvar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="admin-topbar"><div><h1>Configurações</h1><p>Atualize os dados e contatos da empresa.</p></div></header>
      <form className="settings-grid" style={{ gridTemplateColumns: "1fr" }} onSubmit={submit}>
        <section className="form-section">
          <h2>Dados da empresa</h2>
          <label className="field">Nome da empresa<input name="name" defaultValue={company.name} required /></label>
          <label className="field">WhatsApp<input name="whatsapp" inputMode="numeric" defaultValue={company.whatsapp} required /></label>
          <label className="field">Descrição<textarea name="description" rows={3} defaultValue={company.description} /></label>
          <label className="field">Endereço<input name="address" defaultValue={company.address} /></label>
          <div className="form-grid"><label className="field">Cidade<input name="city" defaultValue={company.city} /></label><label className="field">Estado<input name="state" maxLength={2} defaultValue={company.state} /></label></div>
          <label className="field">Horário<input name="business_hours" defaultValue={company.business_hours} /></label>
          <div className="form-grid"><label className="field">Instagram<input name="instagram" defaultValue={company.instagram} /></label><label className="field">Facebook<input name="facebook" defaultValue={company.facebook} /></label></div>
        </section>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-submit"><button className="button button-primary button-lg" disabled={loading}>{loading ? <Loader2 className="spin" /> : <Save />} {loading ? "Processando..." : "Salvar configurações"}</button></div>
      </form>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
