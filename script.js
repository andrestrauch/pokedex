async function getTypes() {
    for (let t = 0; t < 18; t++) {
        let typ = await fetch(`https://pokeapi.co/api/v2/type/${t + 1}`);
        let typFromJSN = await typ.json();
        TYPES[t] =
            typFromJSN.sprites["generation-viii"]["sword-shield"].symbol_icon;
    }
}

async function getData() {
    for (let k = 0; k < 20; k++) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${k + 1}`,
        );
        const responseFromJSON = await response.json();
        POKEMON.push(responseFromJSON);
    }
    console.log(POKEMON);
    setTimeout(() => {
        renderPkmn(POKEMON);
    }, 200);
}

function renderPkmn(pokemonList) {
    PKMNREF.innerHTML = "";
    let t1;
    let t2;

    for (let i = 0; i < 20; i++) {
        t1 = setType(pokemonList[i].types[0].type.name);
        if (pokemonList[i].types.length > 1)
            t2 = setType(pokemonList[i].types[1].type.name);
        else t2 = "";

        let nr;
        if (pokemonList[i].id < 10) nr = "#000";
        else if (pokemonList[i].id < 100) nr = "#00";
        else if (pokemonList[i].id < 999) nr = "#0";
        else nr = "#";
        let pID = nr + pokemonList[i].id;

        PKMNREF.innerHTML += /*html*/ `
            <div class="pkmn">
                <div class="card-header">
                    <p>${pID}</p>
                    <h2>${pokemonList[i].name.toUpperCase()}</h2>
                </div>
                <div class="pkmn-img">
                    <img src="${pokemonList[i].sprites.front_default}" alt="">
                </div>
                <div class="pkmn-types">
                    <img src="${t1}" alt="">
                    <img src="${t2}" alt="">
                </div>
            <div>
        `;
    }
}

function setType(typing) {
    let typ;
    switch (typing) {
        case "normal":
            typ = TYPES[0];
            break;
        case "fighting":
            typ = TYPES[1];
            break;
        case "flying":
            typ = TYPES[2];
            break;
        case "poison":
            typ = TYPES[3];
            break;
        case "ground":
            typ = TYPES[4];
            break;
        case "rock":
            typ = TYPES[5];
            break;
        case "bug":
            typ = TYPES[6];
            break;
        case "ghost":
            typ = TYPES[7];
            break;
        case "steel":
            typ = TYPES[8];
            break;
        case "fire":
            typ = TYPES[9];
            break;
        case "water":
            typ = TYPES[10];
            break;
        case "grass":
            typ = TYPES[11];
            break;
        case "electric":
            typ = TYPES[12];
            break;
        case "psychic":
            typ = TYPES[13];
            break;
        case "ice":
            typ = TYPES[14];
            break;
        case "dragon":
            typ = TYPES[15];
            break;
        case "dark":
            typ = TYPES[16];
            break;
        case "fairy":
            typ = TYPES[17];
            break;
    }
    return typ;
}

getTypes();
setTimeout(() => {
    getData();
}, 1000);
