const axios = require('axios');

async function obtenerPokemon(id) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    console.log(`\n📌 Información del Pokémon con ID ${id}`);
    console.log(`Nombre: ${response.data.name}`);
    console.log(`Altura: ${response.data.height}`);
    console.log(`Peso: ${response.data.weight}`);
    console.log(`Tipos: ${response.data.types.map(t => t.type.name).join(', ')}\n`); 
  } catch (error) {
    console.error('❌ Error al obtener el Pokémon:', error.message);
  }
}

const id = process.argv[2] || 1;

obtenerPokemon(id);
