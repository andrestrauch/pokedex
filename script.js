function init() {
    getTypes();
    setTimeout(() => {
        getData();
    }, 200);
}

function renderPkmn(pokemonList) {
    PKMNREF.innerHTML = "";
    let imgT1;
    let imgT2;

    for (let i = 0; i < renderCount; i++) {
        imgT1 = setType(pokemonList[i].typ1);
        if (pokemonList[i].typ2 != "") imgT2 = setType(pokemonList[i].typ2);
        else imgT2 = "";

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
                <div class="pkmn-img" id="pkmnColor${i}">
                    <img src="${pokemonList[i].img}" alt="">
                </div>
                <div class="pkmn-types">
                    <img src="${imgT1}" alt="">
                    <img src="${imgT2}" alt="">
                </div>
            <div>
        `;
        setImgColor(i);
    }
}

function renderLoadBtn() {
    const loadRef = document.getElementById(`loadBtn`);
    loadRef.innerHTML = /*html*/ `
        <button class="load-btn" onclick="loadMore()">
            Load more
        </button>
    `;
}
function setImgColor(i) {
    let colorRef = document.getElementById(`pkmnColor${i}`);
    colorRef.classList.add(`bg-${POKEMON[i].typ1}`);
}

async function getTypes() {
    for (let t = 0; t < 18; t++) {
        let typ = await fetch(`https://pokeapi.co/api/v2/type/${t + 1}`);
        let typFromJSN = await typ.json();
        TYPES[t] =
            typFromJSN.sprites["generation-viii"]["sword-shield"].symbol_icon;
    }
}

async function getData() {
    for (let k = forStart; k < renderCount; k++) {
        if (dataStart == 0) dataStart = 1;
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${dataStart + k}`,
        );
        const responseFromJSON = await response.json();
        // POKEMON.push(responseFromJSON);
        setStats(responseFromJSON);
    }
    // console.log(POKEMON);

    setTimeout(() => {
        renderPkmn(POKEMON);
        renderLoadBtn();
    }, 1000);
}

function setStats(responseFromJSON) {
    let obj = {};
    obj.name = responseFromJSON.name;
    obj.id = responseFromJSON.id;
    obj.img = responseFromJSON.sprites.front_default;
    obj.typ1 = responseFromJSON.types[0].type.name;
    if (responseFromJSON.types.length > 1)
        obj.typ2 = responseFromJSON.types[1].type.name;
    else obj.typ2 = "";

    obj.hp = responseFromJSON.stats[0]["base_stat"];
    obj.a = responseFromJSON.stats[1]["base_stat"];
    obj.v = responseFromJSON.stats[2]["base_stat"];
    obj.sa = responseFromJSON.stats[3]["base_stat"];
    obj.sv = responseFromJSON.stats[4]["base_stat"];
    obj.i = responseFromJSON.stats[5]["base_stat"];

    POKEMON.push(obj);
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

function loadMore() {
    renderCount = renderCount + 20;
    forStart = forStart + 20;
    getData();
}
