// src/components/pokemonItem.tsx
"use client"; 

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites"; // Asegúrate que la ruta sea correcta
import { FavoritePokemon } from "@/lib/favoritesDatabase"; // Asegúrate que la ruta es correcta

interface PokemonItemProps {
  pokemon: {
    name: string;
    url: string;
  };
}

interface PokemonData {
  id: number;
  sprites: {
    front_default: string;
  };
}

// Hook para obtener los datos de un Pokémon individual
const usePokemonData = (url: string) => {
    return useQuery<PokemonData>({
        queryKey: ['pokemon', url],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('No se pudo obtener el Pokémon');
            }
            return res.json();
        }
    });
}


export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const { data: pokemonData, isLoading: isLoadingDetails, error: detailsError } = usePokemonData(pokemon.url);
  const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const isFavorite = !!pokemonData && !!favorites && favorites.some(fav => fav.id === pokemonData.id);
  const isMutatingFavorite = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleToggleFavorite = () => {
    if (!pokemonData) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(pokemonData.id);
    } else {
      addFavoriteMutation.mutate({
        id: pokemonData.id,
        name: pokemon.name,
        imageUrl: pokemonData.sprites.front_default,
      });
    }
  };

  // --- Renderizado ---
  if (isLoadingDetails || !pokemonData) {
    // Skeleton se mantiene igual
    return (
        <div className="border rounded-lg p-4 bg-gray-100 animate-pulse relative h-[240px]"> {/* Altura fija para consistencia */}
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded-md mt-4 w-3/4 mx-auto"></div>
        </div>
    );
  }

   if (detailsError) {
     // Error se mantiene igual
     return (
        <div className="border rounded-lg p-4 text-center bg-red-100 text-red-700 h-[240px]">
            <p>Error al cargar:</p>
            <p className="text-sm">{detailsError.message}</p>
        </div>
     )
   }

  // Renderizado normal con estrella
  return (
    <div className="border rounded-lg p-4 text-center relative transition-shadow hover:shadow-lg h-[240px] flex flex-col justify-between"> {/* Contenedor relativo y altura fija */}

      {/* Botón de Estrella (Absoluto) */}
      <button
        onClick={handleToggleFavorite}
        disabled={isMutatingFavorite || isLoadingFavorites}
        className={`absolute top-2 right-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-colors duration-200 ease-in-out
                    ${isMutatingFavorite ? 'animate-pulse' : ''}
                  `}
        aria-label={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
        title={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`} // Tooltip para escritorio
      >
        {/* Ícono de Estrella SVG (o puedes usar un carácter ★/☆) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          // Cambia el fill y stroke basado en isFavorite
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          // Clases de Tailwind para tamaño y color
          className={`w-6 h-6 ${isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </button>

      {/* Contenido del Pokémon */}
      <Link href={`/pokemon/${pokemon.name}`} className="block mt-4"> {/* Ajuste de margen superior si es necesario */}
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
          loading="lazy"
        />
        <h2 className="text-xl font-bold capitalize mt-2 truncate">{pokemon.name}</h2>
      </Link>

      {/* Espacio para errores (opcional, podrías moverlo o quitarlo) */}
      <div className="h-4 mt-1"> {/* Altura fija pequeña para errores */}
         {(addFavoriteMutation.isError || removeFavoriteMutation.isError) && (
            <p className="text-red-500 text-xs">
                {addFavoriteMutation.error?.message || removeFavoriteMutation.error?.message}
            </p>
         )}
      </div>
    </div>
  );
}