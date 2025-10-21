// app/layout.tsx
"use client"; // Convertimos el layout en un Client Component para usar el provider

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Creamos una instancia de QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        {/* Envolvemos la aplicación con el QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  );
}