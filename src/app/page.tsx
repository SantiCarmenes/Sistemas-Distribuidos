// app/page.tsx
'use client';

import PokemonList from '@/components/pokemonList';
import Loading from './loading';
import { usePokemonContext } from '@/contexts/PokemonContext';
import { usePokemons } from '@/hooks/usePokemons';

export default function HomePage() {
  const { page, setPage } = usePokemonContext();
  const { data, isLoading, isError } = usePokemons(page);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error al cargar los Pokémon.</p>;
  }
  
  const pokemons = data?.results || [];

  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Pokémon</h1>
        <span className="text-lg font-semibold">Página {page}</span>
      </div>

      <PokemonList pokemons={pokemons} />
      
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!data?.hasPreviousPage}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!data?.hasNextPage}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}