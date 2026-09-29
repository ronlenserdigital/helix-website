import type { Metadata, Viewport } from "next";
import { Outfit, Figtree, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyCta from "@/components/sticky-cta";
import RevealObserver from "@/components/reveal-observer";
import { OrganizationJsonLd } from "@/components/json-ld";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["600", "700", "800"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `AI agents for lab and medical supply companies | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `AI agents for lab and medical supply companies | ${SITE.name}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `AI agents for lab and medical supply companies | ${SITE.name}`,
    description: SITE.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fffaf0",
  width: "device-width",
  initialScale: 1,
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
        <OrganizationJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
