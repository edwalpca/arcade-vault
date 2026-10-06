import type { Metadata } from "next";
import { Courier_Prime, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcade Vault · Portal Retro",
  description: "Juega clásicos arcade en tu navegador y compite por el récord.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${pressStart2P.variable} ${courierPrime.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="av-bg" />
        <div className="av-noise" />
        <div className="av-root">
          <Nav />
          <main className="av-main">{children}</main>
          <footer className="av-footer">
            <div>© 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0</div>
            <div className="credit">Realizado por Mauricio Alpizar - Curso de FH</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
