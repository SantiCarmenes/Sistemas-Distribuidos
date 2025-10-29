// src/services/pokemon.ts

export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: Pokemon[];
  next: string | null;
  previous: string | null;
}

// para recibir segun la pagina
export const getPokemons = async (page: number, limit: number = 30): Promise<{ results: Pokemon[], hasNextPage: boolean, hasPreviousPage: boolean }> => {
  const offset = (page - 1) * limit;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('No se pudo obtener la lista de Pokémon');
  }

  const data: PokemonApiResponse = await response.json();
  
  return {
    results: data.results,
    hasNextPage: data.next !== null,
    hasPreviousPage: data.previous !== null,
  };
};