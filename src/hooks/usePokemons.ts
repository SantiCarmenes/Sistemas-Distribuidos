// src/hooks/usePokemons.ts
import { useQuery } from '@tanstack/react-query';
import { getPokemons } from '@/services/pokemon';

// El hook ahora depende de la página que se le pasa
export const usePokemons = (page: number) => {
  return useQuery({
    queryKey: ['pokemons', page], // La clave de caché ahora incluye la página
    queryFn: () => getPokemons(page),
  });
};