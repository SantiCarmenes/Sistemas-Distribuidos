"use client"; // Importante porque usa hooks

import { useState } from "react";

interface PokemonItemProps {
  name: string;
  image: string;
}

export default function PokemonItem({ name, image }: PokemonItemProps) {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      onClick={() => setClicks(clicks + 1)}
      className="border p-3 m-2 rounded-lg shadow hover:border-blue-900 flex flex-col items-center"
    >
      <img src={image} alt={name} className="w-20 h-20" />
      <p className="font-bold capitalize">{name}</p>
      <p>Capturado {clicks} veces</p>
    </button>
  );
}
