// app/page.tsx
import PokemonList from '@/components/pokemonList';

// Interfaz para el tipo de dato de cada Pokémon en la lista
interface Pokemon {
  name: string;
  url: string;
}

// 1. Convertimos la página en un componente asíncrono del servidor
export default async function HomePage() {
  // Puse esto para ver la carga de la pagina, si no ni se veia
  //await new Promise(resolve => setTimeout(resolve, 3000));

  // 2. Obtenemos los datos directamente en el servidor
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
  const data = await response.json();
  const pokemons: Pokemon[] = data.results;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista de Pokémon</h1>
      {/* 3. Pasamos los datos como prop al componente cliente */}
      <PokemonList pokemons={pokemons} />
    </main>
  );
}