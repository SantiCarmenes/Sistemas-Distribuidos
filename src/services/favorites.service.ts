// src/services/favorites.service.ts
import { FavoritePokemon } from "@/lib/favoritesDatabase";

type AddFavoritePayload = Omit<FavoritePokemon, "addedAt">;

export const favoritesService = {
  // Obtener todos los favoritos
  getAll: async (): Promise<FavoritePokemon[]> => {
    const res = await fetch("/api/favorites");
    if (!res.ok) {
        console.error("Error fetching favorites:", res.status, res.statusText);
        throw new Error("Error al obtener la lista de favoritos");
    }
    return res.json();
  },

  // Añadir un favorito
  add: async (pokemon: AddFavoritePayload): Promise<FavoritePokemon> => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      let errorMessage = "Error al agregar favorito";
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.error || errorMessage;
      } catch (e) {
        console.error("Could not parse error response body:", e);
      }
       console.error("Error adding favorite:", res.status, res.statusText, errorMessage);
      throw new Error(errorMessage);
    }

    return res.json();
  },

  // Eliminar un favorito por ID
  remove: async (pokemonId: number): Promise<{ message: string }> => {
    const res = await fetch(`/api/favorites/${pokemonId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
       let errorMessage = "Error al eliminar favorito";
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.error || errorMessage;
      } catch (e) {
         console.error("Could not parse error response body:", e);
      }
       console.error("Error removing favorite:", res.status, res.statusText, errorMessage);
      throw new Error(errorMessage);
    }

     if (res.status === 204) {
       return { message: `Pokémon con ID ${pokemonId} eliminado.`};
     }
     return res.json(); // Si todo salio bien, devolvemos el mensaje del backend
  },
};