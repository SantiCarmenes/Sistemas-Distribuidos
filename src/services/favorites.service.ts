// src/services/favorites.service.ts
import { FavoritePokemon } from "@/lib/favoritesDatabase"; // Asegúrate que la ruta es correcta

// Define el tipo de dato que esperamos para añadir (sin addedAt)
type AddFavoritePayload = Omit<FavoritePokemon, "addedAt">;

export const favoritesService = {
  // Obtener todos los favoritos (si implementaste el GET en la API Route)
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

    // Si la respuesta no es OK (ej. 400, 409, 500)
    if (!res.ok) {
      let errorMessage = "Error al agregar favorito";
      try {
        // Intentamos leer el mensaje de error específico de la API
        const errorBody = await res.json();
        errorMessage = errorBody.error || errorMessage;
      } catch (e) {
        // Si no hay cuerpo JSON o falla al parsear, usamos un mensaje genérico
        console.error("Could not parse error response body:", e);
      }
       console.error("Error adding favorite:", res.status, res.statusText, errorMessage);
      throw new Error(errorMessage); // Lanzamos el error para que TanStack Query lo capture
    }

    // Si la respuesta es OK (201)
    return res.json(); // Devolvemos el Pokémon favorito creado (con addedAt)
  },

  // Eliminar un favorito por ID
  remove: async (pokemonId: number): Promise<{ message: string }> => { // Cambiado para devolver el mensaje
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

    // Si es 200 OK (o 204 No Content), devolvemos el mensaje o un objeto vacío/confirmación
     if (res.status === 204) {
       return { message: `Pokémon con ID ${pokemonId} eliminado.`}; // Mensaje genérico si es 204
     }
     return res.json(); // Devolvemos el mensaje del backend si es 200
  },
};