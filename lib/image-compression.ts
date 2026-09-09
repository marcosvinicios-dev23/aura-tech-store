const MAX_DIMENSION = 1600;
const TARGET_BYTES = 700 * 1024;
const MIN_DIMENSION = 900;

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler esta imagem."));
    };
    image.src = url;
  });
}

function render(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Seu navegador não conseguiu otimizar a imagem.");
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

function encode(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("Não foi possível otimizar a imagem.")),
      type,
      quality,
    );
  });
}

export async function compressImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Selecione somente arquivos de imagem.");

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
  let width = Math.max(1, Math.round(image.naturalWidth * scale));
  let height = Math.max(1, Math.round(image.naturalHeight * scale));
  let quality = 0.82;
  let canvas = render(image, width, height);
  let blob = await encode(canvas, "image/webp", quality);
  let type = blob.type === "image/webp" ? "image/webp" : "image/jpeg";

  if (type === "image/jpeg") blob = await encode(canvas, type, quality);

  while (blob.size > TARGET_BYTES && quality > 0.58) {
    quality -= 0.08;
    blob = await encode(canvas, type, quality);
  }

  while (blob.size > TARGET_BYTES && Math.max(width, height) > MIN_DIMENSION) {
    width = Math.max(1, Math.round(width * 0.85));
    height = Math.max(1, Math.round(height * 0.85));
    canvas = render(image, width, height);
    blob = await encode(canvas, type, Math.max(quality, 0.58));
  }

  const extension = type === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "foto";
  return new File([blob], `${baseName}.${extension}`, { type, lastModified: Date.now() });
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
