function renderPkmn(pokemonList) {
    PKMNREF.innerHTML = "";

    for (let i = 0; i <= 10; i++) {
        PKMNREF.innerHTML += /*html*/ `
            <div class="pkmn">
                <h2>${pokemonList[i].name}</h2>
            <div>
        `;
    }
}

async function getData() {
    let response = await 
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025`);
    let responseFromJSON = await response.json();

    for (let k = 0; k < 1025; k++) {
        POKEMON.push(responseFromJSON.results[k]);
        
    }
    renderPkmn(POKEMON);
    // console.log(POKEMON);
    // console.log(responseFromJSON);

    
}
getData();
