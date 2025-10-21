// src/contexts/PokemonContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PokemonContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);

  return (
    <PokemonContext.Provider value={{ page, setPage }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonContext debe ser usado dentro de un PokemonProvider");
  }
  return context;
}