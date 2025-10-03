"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PokemonItem from "./pokemonItem";

interface PokemonAPIResult {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  image: string;
}

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(async (res) => {
        // results tiene name y url, necesitamos pedir la imagen de cada uno
        const results: PokemonAPIResult[] = res.data.results;

        const data = await Promise.all(
          results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: details.data.sprites.front_default,
            };
          })
        );

        setPokemons(data);
      })
      .catch((err) => {
        console.error("Error al cargar pokemons:", err);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listado de Pokémons</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
          />
        ))}
      </div>
    </div>
  );
}
