// src/components/pokemonList.tsx
'use client'; // Sigue siendo un Client Component

import PokemonItem from './pokemonItem';

// Define el tipo para la lista que recibe
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: Pokemon[];
}

// 1. El componente ahora recibe `pokemons` como una prop
export default function PokemonList({ pokemons }: PokemonListProps) {
  // 2. ¡Ya no necesitamos useState ni useEffect aquí!
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        // La clave está en pasar el `pokemon` correcto a cada `PokemonItem`
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}