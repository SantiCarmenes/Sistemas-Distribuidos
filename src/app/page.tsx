// app/page.tsx
'use client';

import { useState } from 'react';
import PokemonList from '@/components/pokemonList';
import Loading from './loading';
import { usePokemons } from '@/hooks/usePokemons';

export default function HomePage() {
  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(20);
  const { data: pokemons, isLoading, isError } = usePokemons(limit);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error al cargar los Pokémon.</p>;
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista de Pokémon</h1>
      <PokemonList pokemons={pokemons || []} />
      <div className="flex justify-center mt-8">
        <button
          //onClick
          onClick={() => //setStartIndex(prevStartIndex => prevStartIndex + 20) 
            setLimit(prevLimit => prevLimit + 20)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Siguiente Página
        </button>
      </div>
    </main>
  );
}