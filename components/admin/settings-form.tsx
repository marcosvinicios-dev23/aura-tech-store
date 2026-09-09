"use client";

import { ImagePlus, Loader2, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { compressImage, formatFileSize } from "@/lib/image-compression";
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
    setError("");
    try {
      const optimized = await compressImage(file);
      const form = new FormData();
      form.append("files", optimized);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (type === "logo") setLogo(data.urls[0]);
      else setBanner(data.urls[0]);
      setToast(`Imagem otimizada: ${formatFileSize(file.size)} → ${formatFileSize(optimized.size)}.`);
      setTimeout(() => setToast(""), 3000);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Não foi possível enviar a imagem.");
    } finally {
      setLoading(false);
    }
  }

  function removeImage(type: "logo" | "banner") {
    const label = type === "logo" ? "logo" : "banner";
    if (!window.confirm(`Remover ${label}? A alteração será aplicada quando você salvar.`)) return;
    if (type === "logo") setLogo("");
    else setBanner("");
    setToast(`${type === "logo" ? "Logo removida" : "Banner removido"}. Clique em Salvar configurações.`);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, logo_url: logo || null, banner_url: banner || null }),
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
          <div className="field"><span>Logo</span><div className="upload-zone">{logo ? <img src={logo} alt="Logo atual" className="settings-logo-preview" /> : <p>Nenhuma imagem. A logo textual continuará ativa.</p>}<div className="upload-actions"><label className="button button-soft"><ImagePlus size={17} /> {logo ? "Trocar logo" : "Escolher logo"}<input hidden type="file" accept="image/*" onChange={(e) => { upload(e.target.files?.[0], "logo"); e.target.value = ""; }} /></label>{logo && <button type="button" className="button button-danger" onClick={() => removeImage("logo")}><Trash2 size={17} /> Remover logo</button>}</div></div></div>
          <div className="field"><span>Banner principal</span><div className="upload-zone">{banner ? <img src={banner} alt="Banner atual" className="settings-banner-preview" /> : <p>Nenhum banner personalizado. O visual padrão continuará ativo.</p>}<div className="upload-actions"><label className="button button-soft"><ImagePlus size={17} /> {banner ? "Trocar banner" : "Escolher banner"}<input hidden type="file" accept="image/*" onChange={(e) => { upload(e.target.files?.[0], "banner"); e.target.value = ""; }} /></label>{banner && <button type="button" className="button button-danger" onClick={() => removeImage("banner")}><Trash2 size={17} /> Remover banner</button>}</div></div></div>
        </section>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-submit"><button className="button button-primary button-lg" disabled={loading}>{loading ? <Loader2 className="spin" /> : <Save />} {loading ? "Processando..." : "Salvar configurações"}</button></div>
      </form>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
