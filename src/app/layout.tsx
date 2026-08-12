import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/personal";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.role}`,
  description: personal.summary,
  openGraph: {
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
