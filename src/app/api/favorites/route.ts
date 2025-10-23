// src/app/api/favorites/route.ts
import { NextResponse } from "next/server";
import { favoritesDB } from "@/lib/favoritesDatabase"; // Ajusta la ruta si es necesario

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // --- Validación del Body ---
    if (!body.id || !body.name || !body.imageUrl) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: id, name, imageUrl" },
        { status: 400 } // 400 Bad Request
      );
    }

    // Validar tipos (básico)
    if (typeof body.id !== 'number' || typeof body.name !== 'string' || typeof body.imageUrl !== 'string') {
       return NextResponse.json(
        { error: "Tipos de datos inválidos para id, name o imageUrl" },
        { status: 400 }
      );
    }
    // --- Fin Validación ---

    const newFavorite = await favoritesDB.add({
      id: body.id,
      name: body.name,
      imageUrl: body.imageUrl,
    });

    // Si add devuelve null, significa que ya existía
    if (!newFavorite) {
       return NextResponse.json(
        { error: `El Pokémon con ID ${body.id} ya está en favoritos` },
        { status: 409 } // 409 Conflict
      );
    }

    // Éxito al crear
    return NextResponse.json(newFavorite, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Error en POST /api/favorites:", error);
    // Error genérico del servidor
    return NextResponse.json(
      { error: "Error interno del servidor al agregar favorito" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}

// (Opcional) Podrías añadir un GET aquí para leer todos los favoritos si lo necesitas
export async function GET() {
  try {
    const favorites = await favoritesDB.getAll();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
     console.error("Error en GET /api/favorites:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener favoritos" },
      { status: 500 }
    );
  }
}