const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

async function fetchPokemon () {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    
    const listPokemon = await Promise.all(data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
    }));

    console.log(listPokemon);
}

fetchPokemon();