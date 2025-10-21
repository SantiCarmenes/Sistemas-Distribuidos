// src/services/pokemon.ts

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: Pokemon[];
}

export const getPokemons = async (limit: number = 30): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
  if (!response.ok) {
    throw new Error('No se pudo obtener la lista de Pokémon');
  }
  const data: PokemonApiResponse = await response.json();
  return data.results;
};