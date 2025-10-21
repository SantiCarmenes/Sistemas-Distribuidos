// app/page.tsx
'use client';

import { useState } from 'react';
import PokemonList from '@/components/pokemonList';
import Loading from './loading'; // Importamos el componente de carga
import { usePokemons } from '@/hooks/usePokemons';

export default function HomePage() {
  const [limit, setLimit] = useState(30); // Estado para controlar la cantidad de Pokémon
  const { data: pokemons, isLoading, isError } = usePokemons(limit);

  if (isLoading) {
    return <Loading />; // Mostramos el skeleton mientras carga
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
          onClick={() => setLimit(prevLimit => prevLimit + 30)} // Aumentamos el límite al hacer clic
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Cargar más
        </button>
      </div>
    </main>
  );
}