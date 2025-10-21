// src/hooks/usePokemons.ts
import { useQuery } from '@tanstack/react-query';
import { getPokemons, Pokemon } from '@/services/pokemon';

export const usePokemons = (limit: number) => {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemons', limit],
    queryFn: () => getPokemons(limit),
  });
};