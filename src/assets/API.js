const BASE_URL = 'http://localhost:3000'
const POKEMON_URL = `${BASE_URL}/pokemon`

const getAllPokemon = () => {
  return fetch(POKEMON_URL).then(resp => resp.json())
}

const postPokemon = (pokemon) => {
  return fetch(POKEMON_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pokemon)
  }).then(resp => resp.json())
}

export {
  getAllPokemon,
  postPokemon
}