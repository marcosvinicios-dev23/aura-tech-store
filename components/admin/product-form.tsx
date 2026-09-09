"use client";

import { Camera, Check, ImagePlus, Loader2, Star, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { compressImage, formatFileSize } from "@/lib/image-compression";
import type { Product, ProductCategory } from "@/lib/types";
import { slugify } from "@/lib/utils";

type Photo = { url: string; file?: File };

const categories: ProductCategory[] = ["Celular", "Notebook", "MacBook", "Tablet", "Acessório"];

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>((product?.images || []).map((url) => ({ url })));
  const [primary, setPrimary] = useState(product?.primary_image || 0);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const title = product ? "Editar produto" : "Adicionar produto";

  useEffect(() => {
    if (!cameraOpen) return;
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function connectCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("A câmera não está disponível neste navegador.");
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        if (cancelled) return stream.getTracks().forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        setCameraError("Não foi possível abrir a câmera. Autorize o acesso nas permissões do navegador.");
      }
    }

    connectCamera();
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
      setCameraReady(false);
    };
  }, [cameraOpen]);

  async function addFiles(selected: File[]) {
    const available = Math.max(0, 12 - photos.length);
    const incoming = selected.filter((file) => file.type.startsWith("image/")).slice(0, available);
    if (!incoming.length) {
      if (!available) setError("Você já adicionou o limite de 12 fotos.");
      return;
    }

    setOptimizing(true);
    setError("");
    try {
      const optimized: Photo[] = [];
      let originalBytes = 0;
      let optimizedBytes = 0;
      for (const file of incoming) {
        const compressed = await compressImage(file);
        originalBytes += file.size;
        optimizedBytes += compressed.size;
        optimized.push({ file: compressed, url: URL.createObjectURL(compressed) });
      }
      setPhotos((current) => [...current, ...optimized].slice(0, 12));
      setToast(`Fotos otimizadas: ${formatFileSize(originalBytes)} → ${formatFileSize(optimizedBytes)}.`);
      setTimeout(() => setToast(""), 3000);
    } catch (compressionError) {
      setError(compressionError instanceof Error ? compressionError.message : "Não foi possível otimizar as fotos.");
    } finally {
      setOptimizing(false);
    }
  }

  function removePhoto(index: number) {
    setPhotos((current) => {
      const removed = current[index];
      if (removed?.file) URL.revokeObjectURL(removed.url);
      return current.filter((_, photoIndex) => photoIndex !== index);
    });
    setPrimary((current) => current === index ? 0 : current > index ? current - 1 : current);
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) return setCameraError("Não foi possível registrar a foto.");
    await addFiles([new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" })]);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const newFiles = photos.filter((photo) => photo.file).map((photo) => photo.file as File);
      let uploaded: string[] = [];
      if (newFiles.length) {
        const form = new FormData();
        newFiles.forEach((file) => form.append("files", file));
        const upload = await fetch("/api/admin/upload", { method: "POST", body: form });
        const result = await upload.json();
        if (!upload.ok) throw new Error(result.error);
        uploaded = result.urls;
      }
      let cursor = 0;
      const images = photos.map((photo) => photo.file ? uploaded[cursor++] : photo.url);
      if (!images.length) throw new Error("Adicione pelo menos uma foto.");
      const payload = {
        category: data.get("category"), brand: data.get("brand"), model: data.get("model"), storage: data.get("storage"),
        color: data.get("color"), condition: data.get("condition"), price: Number(data.get("price")), stock: Number(data.get("stock")),
        battery_health: data.get("battery_health") ? Number(data.get("battery_health")) : null,
        warranty: data.get("warranty"), description: data.get("description"), images,
        primary_image: Math.min(primary, images.length - 1), featured: data.get("featured") === "on",
        hidden: data.get("hidden") === "on", slug: slugify(`${data.get("model")} ${data.get("storage")}`),
      };
      const response = await fetch(product ? `/api/admin/products/${product.id}` : "/api/admin/products", {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setToast(product ? "Alterações salvas com sucesso." : "Produto publicado na vitrine.");
      setTimeout(() => { router.push("/admin/produtos"); router.refresh(); }, 900);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Não foi possível salvar.");
      setLoading(false);
    }
  }

  const defaults = useMemo(() => ({
    category: product?.category || "Celular", brand: product?.brand || "Apple", model: product?.model || "",
    storage: product?.storage || "128GB", color: product?.color || "", condition: product?.condition || "Seminovo",
    price: product?.price || "", stock: product?.stock ?? 1, battery: product?.battery_health || "",
    warranty: product?.warranty || "90 dias", description: product?.description || "",
  }), [product]);

  return <>
    <header className="admin-topbar"><div><h1>{title}</h1><p>{product ? "Atualize as informações e salve." : "Tire as fotos, preencha os dados e publique."}</p></div></header>
    <form className="product-form" onSubmit={submit}>
      <section className="form-section full"><h2>1. Fotos do produto</h2><p className="demo-note">Adicione até 12 fotos. Elas são otimizadas automaticamente para economizar espaço.</p><div className="upload-zone"><div className="upload-actions"><button type="button" className="button button-primary" onClick={() => { setCameraError(""); setCameraOpen(true); }} disabled={optimizing}><Camera size={18} /> Tirar foto</button><label className="button button-soft"><ImagePlus size={18} /> Escolher da galeria<input hidden type="file" accept="image/*" multiple onChange={(event) => { addFiles(Array.from(event.target.files || [])); event.target.value = ""; }} /></label></div>{optimizing && <p className="optimization-status"><Loader2 className="spin" size={18} /> Otimizando fotos...</p>}<div className="upload-preview-grid">{photos.map((photo, index) => <div className={`upload-preview ${primary === index ? "primary" : ""}`} key={photo.url}><img src={photo.url} alt={`Foto ${index + 1}`} /><div className="upload-preview-actions"><button type="button" onClick={() => setPrimary(index)} aria-label="Definir como principal"><Star size={15} fill={primary === index ? "#176bff" : "none"} /></button><button type="button" onClick={() => removePhoto(index)} aria-label="Remover foto"><Trash2 size={15} /></button></div></div>)}</div></div></section>
      <section className="form-section"><h2>2. Informações</h2><div className="form-grid"><label className="field">Categoria<select name="category" defaultValue={defaults.category} required>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="field">Marca<select name="brand" defaultValue={defaults.brand} required><option>Apple</option><option>Samsung</option><option>Motorola</option><option>Xiaomi</option><option>Dell</option><option>Lenovo</option><option>Acer</option><option>ASUS</option><option>Outra</option></select></label><label className="field">Modelo<input name="model" defaultValue={defaults.model} required placeholder="Ex.: MacBook Air M3" /></label><label className="field">Armazenamento<select name="storage" defaultValue={defaults.storage}><option>64GB</option><option>128GB</option><option>256GB</option><option>512GB</option><option>1TB</option><option>2TB</option></select></label><label className="field">Cor<input name="color" defaultValue={defaults.color} required placeholder="Ex.: Meia-noite" /></label><label className="field">Condição<select name="condition" defaultValue={defaults.condition}><option>Novo</option><option>Seminovo</option></select></label><label className="field">Saúde da bateria (%) <small>(opcional)</small><input name="battery_health" type="number" min="0" max="100" defaultValue={defaults.battery} /></label><label className="field">Garantia<input name="warranty" defaultValue={defaults.warranty} required /></label><label className="field wide">Descrição<textarea name="description" rows={5} defaultValue={defaults.description} required placeholder="Descreva o estado, diferenciais e observações do produto." /></label></div></section>
      <section className="form-section"><h2>3. Preço e estoque</h2><div className="form-grid"><label className="field">Preço (R$)<input name="price" type="number" min="0" step="0.01" defaultValue={defaults.price} required /></label><label className="field">Estoque<input name="stock" type="number" min="0" step="1" defaultValue={defaults.stock} required /></label><label className="check-option wide"><input type="checkbox" name="featured" defaultChecked={product?.featured} /> Mostrar nos destaques da Home</label><label className="check-option wide"><input type="checkbox" name="hidden" defaultChecked={product?.hidden} /> Manter oculto da vitrine</label></div><p className="demo-note">Ao chegar a zero, o produto será ocultado automaticamente e continuará salvo no painel.</p></section>
      {error && <p className="form-error" role="alert">{error}</p>}<div className="form-submit"><button type="button" className="button button-soft" onClick={() => router.back()}>Cancelar</button><button className="button button-primary button-lg" disabled={loading || optimizing}>{loading ? <><Loader2 className="spin" />Salvando...</> : <><Check /> {product ? "Salvar alterações" : "Publicar produto"}</>}</button></div>
    </form>
    {cameraOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Câmera"><div className="camera-modal"><div className="camera-header"><div><h3>Tirar fotos</h3><p>A câmera fica aberta para você registrar vários ângulos.</p></div><button type="button" className="icon-button" onClick={() => setCameraOpen(false)} aria-label="Fechar câmera"><X /></button></div><div className="camera-viewport"><video ref={videoRef} autoPlay muted playsInline />{!cameraReady && !cameraError && <div className="camera-loading"><Loader2 className="spin" /> Abrindo câmera...</div>}{cameraError && <div className="camera-error"><Camera /><p>{cameraError}</p></div>}</div><div className="camera-actions"><button type="button" className="button button-soft" onClick={() => setCameraOpen(false)}>Concluir</button><button type="button" className="camera-shutter" onClick={capturePhoto} disabled={!cameraReady || optimizing} aria-label="Registrar foto"><Camera /></button></div></div></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </>;
}
