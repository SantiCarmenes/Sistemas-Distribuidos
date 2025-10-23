// src/components/pokemonItem.tsx
"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface PokemonItemProps {
  pokemon: {
    name: string;
    url: string;
  };
}

interface PokemonData {
  sprites: {
    front_default: string;
  };
}

// Hook para obtener los datos de un Pokémon individual
const usePokemonData = (url: string) => {
    return useQuery<PokemonData>({
        queryKey: ['pokemon', url],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('No se pudo obtener el Pokémon');
            }
            return res.json();
        }
    });
}


export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const { data: pokemonData, isLoading } = usePokemonData(pokemon.url);

  if (isLoading || !pokemonData) {
    return (
        <div className="border rounded-lg p-4 bg-gray-100 animate-pulse">
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded-md mt-4 w-3/4 mx-auto"></div>
        </div>
    );
  }
  
  return (
    <Link href={`/pokemon/${pokemon.name}`} className="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
    </Link>
  );
}