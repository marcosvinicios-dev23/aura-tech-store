import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./extras.css";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "TechCell Assistência", template: "%s | TechCell Assistência" },
  description: "Celulares novos e seminovos, assistência técnica especializada e atendimento rápido.",
  openGraph: {
    title: "TechCell Assistência",
    description: "Seu próximo celular pode estar aqui.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
