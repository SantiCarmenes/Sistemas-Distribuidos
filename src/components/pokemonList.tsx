// src/components/pokemonList.tsx
'use client'; 

import PokemonItem from './pokemonItem';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: Pokemon[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}