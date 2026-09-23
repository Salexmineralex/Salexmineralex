import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { MenuShell } from "@/components/MenuShell";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Alejandro Sánchez Torres",
    template: "Alejandro Sánchez Torres · %s",
  },
  description:
    "Portfolio of Alejandro Sánchez Torres, software developer and game programmer.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="crt-pref" strategy="beforeInteractive">
          {`(function(){try{var root=document.documentElement;if(localStorage.getItem("ast-crt-v")!=="2"){localStorage.removeItem("ast-crt");localStorage.setItem("ast-crt-v","2")}if(localStorage.getItem("ast-crt")==="off")root.classList.add("crt-off");if(localStorage.getItem("ast-white")==="on")root.classList.add("white")}catch(e){}})()`}
        </Script>
        <MenuShell>{children}</MenuShell>
      </body>
    </html>
  );
}
