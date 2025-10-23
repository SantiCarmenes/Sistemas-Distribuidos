// src/components/pokemonItem.tsx
"use client";

import Link from "next/link";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { FavoritePokemon } from "@/lib/favoritesDatabase"; // Asegúrate que la ruta es correcta

interface PokemonItemProps {
  pokemon: {
    name: string;
    url: string; // URL como "https://pokeapi.co/api/v2/pokemon/12/"
  };
}

// Función helper para extraer ID de la URL
const getPokemonIdFromUrl = (url: string): string | null => {
    const match = url.match(/\/(\d+)\/?$/); // Busca números al final de la URL
    return match ? match[1] : null;
}

// Función helper para construir la URL del sprite
const getPokemonImageUrl = (id: string): string => {
    // Usamos la URL base de los sprites oficiales de PokeAPI/sprites
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  // --- Obtenemos ID y URL de imagen directamente ---
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const imageUrl = pokemonId ? getPokemonImageUrl(pokemonId) : null; // Construye la URL si tenemos ID

  // --- Lógica de Favoritos (necesita el ID numérico) ---
  const numericPokemonId = pokemonId ? parseInt(pokemonId, 10) : null;
  const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const canInteractWithFavorites = numericPokemonId !== null && !!imageUrl; // Solo interactuar si hay ID e Imagen
  const isFavorite = canInteractWithFavorites && !!favorites && favorites.some(fav => fav.id === numericPokemonId);
  const isMutatingFavorite = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleToggleFavorite = () => {
    // Solo proceder si tenemos ID e imagen URL válidos
    if (!numericPokemonId || !imageUrl) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(numericPokemonId);
    } else {
      addFavoriteMutation.mutate({
        id: numericPokemonId,
        name: pokemon.name,
        imageUrl: imageUrl, // Usamos la URL que construimos
      });
    }
  };
  // --- Fin Lógica de Favoritos ---

  // --- Renderizado ---
  // Estado si no pudimos extraer ID o construir URL (raro, pero posible)
  if (!pokemonId) {
     return (
        <div className="border rounded-lg p-4 text-center bg-gray-100 h-[240px] flex justify-center items-center">
             <p className="text-sm text-gray-500">Error al obtener ID</p>
        </div>
     );
  }

  // Renderizado normal con estrella e imagen directa
  return (
    <div className="border rounded-lg p-4 text-center relative transition-shadow hover:shadow-lg h-[240px] flex flex-col justify-between">

      {/* Botón de Estrella (Solo se muestra/funciona si podemos interactuar) */}
      {canInteractWithFavorites && (
          <button
            onClick={handleToggleFavorite}
            disabled={isMutatingFavorite || isLoadingFavorites} // Ya no necesitamos deshabilitar por !imageUrl aquí
            className={`absolute top-2 right-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-colors duration-200 ease-in-out
                        ${isMutatingFavorite ? 'animate-pulse' : ''}
                      `}
            aria-label={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
            title={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
          >
            <svg /* SVG de estrella sin cambios */
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5"
              className={`w-6 h-6 ${isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-600'}`} // Estrella gris si no es favorito
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
      )}

      {/* Contenido del Pokémon */}
      <Link href={`/pokemon/${pokemon.name}`} className="block mt-4">
        {imageUrl ? ( // Muestra imagen si la URL se construyó
            <img
                src={imageUrl} // Usa la URL construida
                alt={pokemon.name}
                className="w-32 h-32 mx-auto"
                loading="lazy"
                // IMPORTANTE: Asegúrate de tener /public/placeholder.png o elimina este onError
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.png'; // Cambia a tu imagen placeholder
                    target.onerror = null; // Previene bucles
                    target.classList.add('opacity-50'); // Opcional: Atenuar el placeholder
                }}
            />
        ) : ( // Muestra placeholder DIV si no pudimos construir la URL (raro)
             <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">?</div>
        )}
        <h2 className="text-xl font-bold capitalize mt-2 truncate">{pokemon.name}</h2>
      </Link>

      {/* Espacio para errores de favoritos */}
      <div className="h-4 mt-1">
         {(addFavoriteMutation.isError || removeFavoriteMutation.isError) && (
            <p className="text-red-500 text-xs">
                {addFavoriteMutation.error?.message || removeFavoriteMutation.error?.message}
            </p>
         )}
      </div>
    </div>
  );
}