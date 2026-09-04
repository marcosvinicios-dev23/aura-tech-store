export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function whatsappUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/55${digits.replace(/^55/, "")}?text=${encodeURIComponent(message)}`;
}

export function companyTheme(company: Company) {
  return {
    "--navy": company.primary_color,
    "--blue": company.secondary_color,
  } as CSSProperties;
}
import type { CSSProperties } from "react";
import type { Company } from "./types";
