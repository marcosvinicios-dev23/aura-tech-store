"use client";

import { ImagePlus, Loader2, Save } from "lucide-react";
import { useState } from "react";
import type { Company } from "@/lib/types";

export function SettingsForm({ company }: { company: Company }) {
  const [logo, setLogo] = useState(company.logo_url || "");
  const [banner, setBanner] = useState(company.banner_url || "");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  async function upload(file: File | undefined, type: "logo" | "banner") {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("files", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setError(data.error);
    if (type === "logo") setLogo(data.urls[0]);
    else setBanner(data.urls[0]);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, logo_url: logo || null, banner_url: banner || null }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error);
    setToast("Configurações salvas.");
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <>
      <header className="admin-topbar"><div><h1>Configurações</h1><p>Personalize as informações usadas em todo o site.</p></div></header>
      <form className="settings-grid" onSubmit={submit}>
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
        <section className="form-section">
          <h2>Personalização</h2>
          <div className="color-row"><label className="field">Cor principal<input type="color" name="primary_color" defaultValue={company.primary_color} /></label><label className="field">Cor secundária<input type="color" name="secondary_color" defaultValue={company.secondary_color} /></label></div>
          <div className="field"><span>Logo</span><div className="upload-zone">{logo ? <img src={logo} alt="Logo atual" style={{ maxWidth: "100%", height: 100, objectFit: "contain" }} /> : <p>Nenhuma imagem. A logo textual continuará ativa.</p>}<label className="button button-soft"><ImagePlus size={17} /> Escolher logo<input hidden type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0], "logo")} /></label></div></div>
          <div className="field"><span>Banner principal</span><div className="upload-zone">{banner && <img src={banner} alt="Banner atual" style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 10 }} />}<label className="button button-soft"><ImagePlus size={17} /> Escolher banner<input hidden type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0], "banner")} /></label></div></div>
        </section>
        {error && <p className="form-error">{error}</p>}
        <div className="form-submit"><button className="button button-primary button-lg" disabled={loading}>{loading ? <Loader2 className="spin" /> : <Save />} Salvar configurações</button></div>
      </form>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
