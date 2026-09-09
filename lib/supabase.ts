import "server-only";

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export function hasDatabase() {
  return Boolean(config());
}

export async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Banco de dados ainda não configurado.");
  const response = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`Falha no banco: ${response.status}`);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function uploadToStorage(file: File, path: string) {
  const cfg = config();
  if (!cfg) throw new Error("Armazenamento ainda não configurado.");
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "product-images";
  const response = await fetch(`${cfg.url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: file,
  });
  if (!response.ok) throw new Error("Não foi possível enviar a imagem.");
  return `${cfg.url}/storage/v1/object/public/${bucket}/${path}`;
}

export async function deleteFromStorage(publicUrl: string) {
  const cfg = config();
  if (!cfg) return false;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "product-images";
  const prefix = `${cfg.url}/storage/v1/object/public/${bucket}/`;
  if (!publicUrl.startsWith(prefix)) return false;

  const path = publicUrl.slice(prefix.length);
  if (!path) return false;
  const response = await fetch(`${cfg.url}/storage/v1/object/${bucket}/${path}`, {
    method: "DELETE",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
    },
  });
  return response.ok || response.status === 404;
}
