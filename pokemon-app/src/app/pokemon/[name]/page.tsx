// app/pokemon/[name]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { typeStyles, defaultStyle } from '@/lib/pokemonColors';

interface PokemonDetails {
    name: string;
    sprites: {
      front_default: string;
      back_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    height: number;
    weight: number;
  }
  

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
    const { name: pokemonName } = await params;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const pokemon: PokemonDetails = await response.json();

    return (
      <div className="flex flex-col items-center p-4">
        <div className="relative w-full max-w-lg mx-auto">
          
          <Image
            src="/card_background.jpeg"
            alt="Fondo de la carta Pokémon"
            width={800}
            height={1120}
            className="w-full h-auto rounded-lg shadow-2xl"
            priority
          />

          <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-bold capitalize text-white" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                {pokemon.name}
              </h1>
              
              <div className="flex justify-center gap-4 my-4">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg" />
                <img src={pokemon.sprites.back_default} alt={`${pokemon.name} (espalda)`} className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg" />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Tipo(s)</h3>
                <div className="flex justify-center gap-2 mt-2">
                    {pokemon.types.map(({ type }) => {
                        // Obtenemos el estilo para el tipo actual, o usamos el por defecto si no existe
                        const style = typeStyles[type.name] || defaultStyle;

                        return (
                        <span 
                            key={type.name} 
                            // Aplicamos los estilos de forma dinámica
                            style={{ 
                            backgroundColor: style.backgroundColor, 
                            color: style.color 
                            }}
                            // Mantenemos las clases de Tailwind para el formato y tamaño
                            className="px-3 py-1 rounded-full text-sm font-semibold capitalize shadow-md"
                        >
                            {type.name}
                        </span>
                        );
                    })}
                </div>
              </div>

              <div className="mt-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                <h3 className="text-lg font-semibold">Altura</h3>
                <p>{pokemon.height / 10} m</p>
              </div>

              <div className="mt-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                <h3 className="text-lg font-semibold">Peso</h3>
                <p>{pokemon.weight / 10} kg</p>
              </div>
            </div>
          </div>
        </div>
        
        <Link href="/" className="mt-8 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors">
          &larr; Volver a la lista
        </Link>
      </div>
    );

  } catch (error) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p>No se pudo encontrar al Pokémon "{pokemonName}".</p>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Volver a la lista
        </Link>
      </div>
    );
  }
}