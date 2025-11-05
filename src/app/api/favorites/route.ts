// src/app/api/favorites/route.ts
import { NextResponse } from "next/server";
import { favoritesDB } from "@/lib/favoritesDatabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.id || !body.name || !body.imageUrl) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 } // 400 Bad Request
      );
    }

    if (typeof body.id !== 'number' || typeof body.name !== 'string' || 
        typeof body.imageUrl !== 'string' ||
        (body.nickname !== undefined && typeof body.nickname !== 'string') ||
        (body.description !== undefined && typeof body.description !== 'string')
       ) {
       return NextResponse.json(
        { error: "Tipos de datos inválidos" },
        { status: 400 }
      );
    }

    const newFavorite = await favoritesDB.add({
      id: body.id,
      name: body.name,
      imageUrl: body.imageUrl,
      nickname: body.nickname,
      description: body.description
    });

    if (!newFavorite) {
       return NextResponse.json(
        { error: `El Pokémon con ID ${body.id} ya está en favoritos` },
        { status: 409 }
      );
    }

    // Éxito al crear
    return NextResponse.json(newFavorite, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Error en POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al agregar favorito" },
      { status: 500 } // 500 Internal Server Error, si se traba todo mientras procesa
    );
  }
}

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