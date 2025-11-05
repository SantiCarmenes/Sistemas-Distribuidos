// src/app/favorites/page.tsx
"use client";

import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";
import { useRemoveFavorite } from "@/hooks/useFavorites";
import { FavoritePokemon } from "@/lib/favoritesDatabase";

// Componente simple para mostrar un favorito y permitir eliminarlo
function FavoriteItem({ favorite }: { favorite: FavoritePokemon }) {
    const removeMutation = useRemoveFavorite();

    const displayName = favorite.nickname?.trim ? favorite.nickname : favorite.name;

    const handleRemove = () => {
        if (confirm(`¿Querés quitar a ${displayName} de favoritos?`)) {
            removeMutation.mutate(favorite.id);
        }
    }

    return (
        <div className="border rounded-lg p-4 flex flex-col items-center justify-between">
             <Link href={`/pokemon/${favorite.name}`}>
                 <img src={favorite.imageUrl} alt={favorite.name} className="w-24 h-24"/>
                 <h3 className="font-semibold capitalize mt-2">{displayName}</h3>
            </Link>

            {favorite.description && (
                <p className="text-sm text-gray-300 mt-1 italic">{favorite.description}</p>
            )}

            <button
                onClick={handleRemove}
                disabled={removeMutation.isPending}
                className="mt-2 bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
                {removeMutation.isPending ? "Quitando..." : "Quitar"}
            </button>
            {removeMutation.isError && <p className="text-red-500 text-xs mt-1">{removeMutation.error.message}</p>}
        </div>
    )
}


// Componente principal de la página de favoritos
export default function FavoritesPage() {
  const { data: favorites, isLoading, isError, error } = useFavorites();

  if (isLoading) {
    // Puedes crear un componente de carga más específico para esta página
    return <p className="text-center mt-8">Cargando favoritos...</p>;
  }

  if (isError) {
    return <p className="text-center mt-8 text-red-600">Error al cargar favoritos: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Pokémon Favoritos</h1>

      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {favorites.map((fav) => (
            <FavoriteItem key={fav.id} favorite={fav} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          Aún no tienes Pokémon favoritos. ¡Agrégalos desde la lista principal!
        </p>
      )}

      <div className="text-center mt-8">
         <Link href="/" className="text-blue-500 hover:underline">
             Volver a la lista principal
         </Link>
      </div>
    </div>
  );
}