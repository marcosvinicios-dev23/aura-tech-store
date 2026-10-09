import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./extras.css";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = process.env.SITE_NAME || "Loja de Tecnologia";
const siteDescription = process.env.SITE_DESCRIPTION || "Confira nossos produtos e fale com nossa equipe.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
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
