// app/layout.tsx
import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="bg-[#651FA6] text-white p-4">
          <nav className="container mx-auto">
            <Link href="/" className="text-xl font-bold hover:text-[#CFAF34]">
              Pokedex
            </Link>
          </nav>
        </header>

        <main className="container mx-auto p-4">
          {children} {}
        </main>

        <footer className="bg-[#651FA6] text-center p-4 mt-8">
          <p>Actividad 5 - Sistemas Distribuidos</p>
        </footer>
      </body>
    </html>
  );
}