// src/app/api/favorites/[id]/route.ts
import { NextResponse } from "next/server";
import { favoritesDB } from "@/lib/favoritesDatabase"; // Ajusta la ruta

// El segundo argumento contiene los parámetros dinámicos de la ruta
export async function DELETE(
  request: Request, // No usamos la request aquí, pero debe estar
  { params }: { params: { id: string } }
) {
  try {
    const idParam = params.id;
    const pokemonId = parseInt(idParam);

    // --- Validación del Parámetro ---
    if (isNaN(pokemonId)) {
      return NextResponse.json(
        { error: "El ID proporcionado no es un número válido" },
        { status: 400 } // 400 Bad Request
      );
    }
    // --- Fin Validación ---

    const deleted = await favoritesDB.remove(pokemonId);

    // Si remove devuelve false, no se encontró el Pokémon
    if (!deleted) {
      return NextResponse.json(
        { error: `Pokémon con ID ${pokemonId} no encontrado en favoritos` },
        { status: 404 } // 404 Not Found
      );
    }

    // Éxito al eliminar
    return NextResponse.json(
      { message: `Pokémon con ID ${pokemonId} eliminado de favoritos` },
      { status: 200 } // 200 OK (a veces se usa 204 No Content si no devuelves mensaje)
    );

  } catch (error) {
    console.error(`Error en DELETE /api/favorites/${params.id}:`, error);
    // Error genérico del servidor
    return NextResponse.json(
      { error: "Error interno del servidor al eliminar favorito" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}