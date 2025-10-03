import Image from "next/image";
import PokemonList from "@/components/pokemonList";

export default function Home() {
  return (
    <main className="p-4">
      <PokemonList />
    </main>
  );
}
/*queria agregarle un boton para pasar de pagina y mostrar otros 20 pero eso ya implicaria cambiar la logica del 
boton porque deberia guardar los contadores mas arriba y no en cada item*/