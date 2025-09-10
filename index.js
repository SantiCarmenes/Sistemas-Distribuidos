const axios = require("axios");

// Agarro los 3 primeros usuarios
async function obtenerUsuarios() {
  const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users");
  return respuesta.data.slice(5, 8); // elijo cuantos usuarios agarro
}

// De aca saco las publicaciones con el ID
async function obtenerPublicacionesDeUsuario(userId) {
  const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return respuesta.data;
}

// Secuencial
async function ejecucionSecuencial() {
  console.log("\n--- Ejecución Secuencial ---");
  console.time("Secuencial"); // Para medir el tiempo de ejecucion

  const usuarios = await obtenerUsuarios(); // Me vuelven los 3 ususarios

  // Llamo usuario por usuario a la funcion q me trae las publicaciones
  for (const usuario of usuarios) {
    const posts = await obtenerPublicacionesDeUsuario(usuario.id);
    console.log(`${usuario.name} tiene ${posts.length} publicaciones`);
  }

  console.timeEnd("Secuencial");
}

// Concurrente
async function ejecucionParalela() {
  console.log("\n--- Ejecución Paralela ---");
  console.time("Paralela"); // Para medir el tiempo de ejecucion

  const usuarios = await obtenerUsuarios();

  // Busco todas las publicaciones a la vez, llamo la funcion con todo el arreglo y en resultados recibo todo cuando vuelven
  const promesas = usuarios.map(u => obtenerPublicacionesDeUsuario(u.id));
  const resultados = await Promise.all(promesas);

  usuarios.forEach((usuario, i) => {
    console.log(`${usuario.name} tiene ${resultados[i].length} publicaciones`);
  });

  console.timeEnd("Paralela");
}

// Main
(async () => {
  await ejecucionSecuencial();
  await ejecucionParalela();
})();
