"use client"; // Importante porque usa hooks

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    // Fetch para obtener los datos del Pokémon
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => setPokemonData(data));
  }, [pokemon.url]);

  if (!pokemonData) {
    return <div>Cargando...</div>;
  }
  
  return (
    // Envolvemos todo en el componente Link
    <Link href={`/pokemon/${pokemon.name}`} className="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
    </Link>
  );
}
