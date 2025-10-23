// app/layout.tsx
"use client"; //client component (usa useState y contextAPI)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { PokemonProvider } from "@/contexts/PokemonContext";
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          <PokemonProvider>
            <header className="bg-[#651FA6] text-white p-4">
              <nav className="container mx-auto">
                <Link href="/" className="text-xl font-bold hover:text-[#CFAF34]">
                  Pokedex
                </Link>
              </nav>
            </header>

            <main className="container mx-auto p-4">
              {children}
            </main>

            <footer className="bg-[#651FA6] text-center p-4 mt-8">
              <p>Actividad 6 - Sistemas Distribuidos</p>
            </footer>
          </PokemonProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}