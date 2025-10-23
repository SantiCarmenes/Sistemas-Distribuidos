// src/hooks/useFavorites.ts
"use client"; // Necesario porque usa hooks

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/favorites.service";
import { FavoritePokemon } from "@/lib/favoritesDatabase";

// Hook para obtener la lista de todos los favoritos
export function useFavorites() {
  return useQuery<FavoritePokemon[], Error>({ // Tipamos el error también
    queryKey: ["favorites"], // Clave única para esta query
    queryFn: favoritesService.getAll, // Función que hace el fetch
    // Opciones adicionales (opcional):
    // staleTime: 5 * 60 * 1000, // Considerar datos frescos por 5 mins
    // refetchOnWindowFocus: false, // Evitar refetch al cambiar de pestaña
  });
}

// Hook para la mutación de agregar un favorito
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation<
    FavoritePokemon, // Tipo de dato que devuelve onSuccess
    Error,           // Tipo del error
    Omit<FavoritePokemon, "addedAt"> // Tipo del input para mutationFn (lo que recibe 'add')
  >({
    mutationFn: favoritesService.add, // La función del servicio que ejecuta la mutación
    onSuccess: (newlyAddedFavorite) => {
      console.log("Pokémon agregado:", newlyAddedFavorite);
      // Cuando la mutación es exitosa, invalidamos la caché de 'favorites'.
      // Esto hará que useFavorites() vuelva a fetchear los datos actualizados.
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      // Opcionalmente, podemos actualizar la caché directamente si queremos una UI más rápida
      // queryClient.setQueryData(['favorites'], (oldData: FavoritePokemon[] | undefined) => {
      //   return oldData ? [...oldData, newlyAddedFavorite] : [newlyAddedFavorite];
      // });
    },
    onError: (error) => {
        // Puedes manejar el error globalmente aquí si quieres (ej. mostrar toast)
        console.error("Error al agregar favorito:", error.message);
    }
  });
}

// Hook para la mutación de eliminar un favorito
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string }, // Tipo de dato que devuelve onSuccess
    Error,               // Tipo del error
    number               // Tipo del input para mutationFn (el ID del Pokémon)
   >({
    mutationFn: favoritesService.remove, // La función del servicio
    onSuccess: (data, removedPokemonId) => {
      console.log(data.message); // Mensaje del backend
      // Invalidamos la caché para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      // Opcional: Actualización optimista de la caché
      // queryClient.setQueryData(['favorites'], (oldData: FavoritePokemon[] | undefined) => {
      //    return oldData ? oldData.filter(fav => fav.id !== removedPokemonId) : [];
      // });
    },
     onError: (error, removedPokemonId) => {
        console.error(`Error al eliminar favorito ${removedPokemonId}:`, error.message);
    }
  });
}