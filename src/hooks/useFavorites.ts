// src/hooks/useFavorites.ts
"use client"; // Necesario porque usa hooks

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/favorites.service";
import { FavoritePokemon } from "@/lib/favoritesDatabase";

// Hook para obtener la lista de todos los favoritos
export function useFavorites() {
  return useQuery<FavoritePokemon[], Error>({
    queryKey: ["favorites"],
    queryFn: favoritesService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
}

// Hook para la mutación de agregar un favorito
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation<
    FavoritePokemon,
    Error,
    Omit<FavoritePokemon, "addedAt">
  >({
    mutationFn: favoritesService.add,
    onSuccess: (newlyAddedFavorite) => {
      console.log("Pokémon agregado:", newlyAddedFavorite);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
        console.error("Error al agregar favorito:", error.message);
    }
  });
}

// Hook para la mutación de eliminar un favorito
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string },
    Error,
    number
   >({
    mutationFn: favoritesService.remove,
    onSuccess: (data, removedPokemonId) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
     onError: (error, removedPokemonId) => {
        console.error(`Error al eliminar favorito ${removedPokemonId}:`, error.message);
    }
  });
}