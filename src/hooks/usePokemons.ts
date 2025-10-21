// src/hooks/usePokemons.ts
import { useQuery } from '@tanstack/react-query';
import { getPokemons, Pokemon } from '@/services/pokemon';

export const usePokemons = (limit: number) => {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemons', limit], // La clave de caché incluye el límite para diferenciar las peticiones
    queryFn: () => getPokemons(limit),
  });
};