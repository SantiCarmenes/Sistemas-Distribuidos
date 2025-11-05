// src/components/pokemonItem.tsx
"use client";

import Link from "next/link";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useState } from "react";
import AddFavoriteModal from "./addFavoriteModal";

interface SelectedPokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface PokemonItemProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const getPokemonIdFromUrl = (url: string): string | null => {
    const match = url.match(/\/(\d+)\/?$/); // Busca números al final de la URL
    return match ? match[1] : null;
}

const getPokemonImageUrl = (id: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const imageUrl = pokemonId ? getPokemonImageUrl(pokemonId) : null;

  const numericPokemonId = pokemonId ? parseInt(pokemonId, 10) : null;

  const displayName = pokemon.name;

  const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const canInteractWithFavorites = numericPokemonId !== null && !!imageUrl;
  const isFavorite = canInteractWithFavorites && !!favorites && favorites.some(fav => fav.id === numericPokemonId);
  const isMutatingFavorite = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);

  const handleToggleFavorite = () => {
    if (!numericPokemonId || !imageUrl) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(numericPokemonId);
    } else {
      setSelectedPokemon({
        id: numericPokemonId,
        name: pokemon.name,
        imageUrl: imageUrl, // URL que construimos
      });
      setIsModalOpen(true);
    }
  };

  if (!pokemonId) {
     return (
        <div className="border rounded-lg p-4 text-center bg-gray-100 h-[240px] flex justify-center items-center">
             <p className="text-sm text-gray-500">Error al obtener ID</p>
        </div>
     );
  }

  return (
    <>
      <div className="border rounded-lg p-4 text-center relative transition-shadow hover:shadow-lg h-[240px] flex flex-col justify-between">

        {canInteractWithFavorites && (
            <button
              onClick={handleToggleFavorite}
              disabled={isMutatingFavorite || isLoadingFavorites} // Deshabilitado si carga o elimina
              className={`absolute top-2 right-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-colors duration-200 ease-in-out
                          ${isMutatingFavorite ? 'animate-pulse' : ''}
                        `}
              aria-label={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
              title={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
            >
              <svg /* SVG de estrella */
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="1.5"
                className={`w-6 h-6 ${isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.a563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
        )}

        <Link href={`/pokemon/${pokemon.name}`} className="block mt-4">
            {imageUrl ? ( <img src={imageUrl} alt={pokemon.name} className="w-32 h-32 mx-auto" loading="lazy" onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.png'; //
                target.onerror = null;
            }} /> ) : ( <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">?</div> )}
            <h2 className="text-xl font-bold capitalize mt-2 truncate text-center">{displayName}</h2>
        </Link>

        <div className="h-4 mt-1">
            {removeFavoriteMutation.isError && (
                <p className="text-red-500 text-xs">
                    {removeFavoriteMutation.error.message}
                </p>
            )}
        </div>
      </div>
      
      <AddFavoriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={selectedPokemon}
      />
    </>
  );
}