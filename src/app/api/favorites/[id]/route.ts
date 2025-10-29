// src/app/api/favorites/[id]/route.ts
import { NextResponse } from "next/server";
import { favoritesDB } from "@/lib/favoritesDatabase";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idParam = params.id;
    const pokemonId = parseInt(idParam);

    if (isNaN(pokemonId)) {
      return NextResponse.json(
        { error: "El ID proporcionado no es un número válido" },
        { status: 400 } // 400 Bad Request
      );
    }

    const deleted = await favoritesDB.remove(pokemonId);

    // Si remove devuelve false, no se encontro
    if (!deleted) {
      return NextResponse.json(
        { error: `Pokémon con ID ${pokemonId} no encontrado en favoritos` },
        { status: 404 } // 404 Not Found
      );
    }

    // Se elimino correctamente
    return NextResponse.json(
      { message: `Pokémon con ID ${pokemonId} eliminado de favoritos` },
      { status: 200 } // 200 OK
    );

  } catch (error) {
    console.error(`Error en DELETE /api/favorites/${params.id}:`, error);
    return NextResponse.json(
      { error: "Error interno del servidor al eliminar favorito" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}