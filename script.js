function init() {
    count = dataCount;
    getTypes();
    setTimeout(() => {
        getData();
    }, 1000);
}

function renderPkmn(pokemonList) {
    PKMNREF.innerHTML = "";
    for (let i = 0; i < pokemonList.length; i++) {
        PKMNREF.innerHTML += /*html*/ `
            <div class="pkmn" onclick="openDialog(${i})">
                <div class="card-header">
                    <p>#${pokemonList[i].id2}</p>
                    <h2>${pokemonList[i].name.toUpperCase()}</h2>
                </div>
                <div class="pkmn-img" id="pkmnColor${i}">
                    <img src="${pokemonList[i].img}" alt="">
                </div>
                <div class="pkmn-types" id="pkmnTypes${i}">
                </div>
            <div>
        `;
        setBgColor(i);
        renderTypes(i, pokemonList);
    }
    setTimeout(() => {
        filterStatus = false;
        renderLoadBtn();
    }, 200);
}

function renderTypes(i, pokemonList) {
    const typeRef = document.getElementById(`pkmnTypes${i}`);
    typeRef.innerHTML = "";
    typeRef.innerHTML += /*html*/ `
        <img src="${pokemonList[i].imgT1}" alt="">
    `;
    if (pokemonList[i].imgT2 != "") {
        typeRef.innerHTML += /*html*/ `
            <img src="${pokemonList[i].imgT2}" alt="">
        `;
    }
}

function renderLoadBtn() {
    loadRef.innerHTML = "";
    if (searchStatus === false && filterStatus == false) {
        loadRef.innerHTML = /*html*/ `
            <button class="load-btn" onclick="loadMore()">
                Load more
            </button>
        `;
    } else if (filterStatus == false) {
        loadRef.innerHTML = /*html*/ `
            <button class="load-btn" onclick="reLoad()"> Reset Search
            </button>
        `;
    }
}

function setBgColor(i) {
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
    // console.log(TYPES[11]);
}

async function getData() {
    for (let k = forStart; k < dataCount; k++) {
        if (dataStart == 0) dataStart = 1;
        const fetchNr = parseInt(dataStart, 10) + parseInt(k, 10);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${fetchNr}`,
        );
        const responseFromJSON = await response.json();
        setStats(responseFromJSON);
    }
    setTimeout(() => {
        renderPkmn(POKEMON);
    }, 1200);
}

function setType(typing) {
    let type = "";
    if (typing == "normal") type = TYPES[0];
    else if (typing == "fighting") type = TYPES[1];
    else if (typing == "flying") type = TYPES[2];
    else if (typing == "poison") type = TYPES[3];
    else if (typing == "ground") type = TYPES[4];
    else if (typing == "rock") type = TYPES[5];
    else if (typing == "bug") type = TYPES[6];
    else if (typing == "ghost") type = TYPES[7];
    else if (typing == "steel") type = TYPES[8];
    else if (typing == "fire") type = TYPES[9];
    else if (typing == "water") type = TYPES[10];
    else if (typing == "grass") type = TYPES[11];
    else if (typing == "electric") type = TYPES[12];
    else if (typing == "psychic") type = TYPES[13];
    else if (typing == "ice") type = TYPES[14];
    else if (typing == "dragon") type = TYPES[15];
    else if (typing == "dark") type = TYPES[16];
    else if (typing == "fairy") type = TYPES[17];
    else type = "";
    return type;
}

function setStats(responseFromJSON) {
    let obj = {};
    // console.log(responseFromJSON);

    obj.name = responseFromJSON.name;
    obj.id = responseFromJSON.id;
    obj.img = responseFromJSON.sprites.front_default;
    obj.typ1 = responseFromJSON.types[0].type.name;
    if (responseFromJSON.types.length > 1)
        obj.typ2 = responseFromJSON.types[1].type.name;
    else obj.typ2 = "";
    obj.imgT1 = setType(obj.typ1);
    // console.log(obj.imgT1);
    if (obj.typ2 != "") obj.imgT2 = setType(obj.typ2);
    else obj.imgT2 = "";

    obj.hp = responseFromJSON.stats[0]["base_stat"];
    obj.a = responseFromJSON.stats[1]["base_stat"];
    obj.v = responseFromJSON.stats[2]["base_stat"];
    obj.sa = responseFromJSON.stats[3]["base_stat"];
    obj.sv = responseFromJSON.stats[4]["base_stat"];
    obj.i = responseFromJSON.stats[5]["base_stat"];

    obj.skill1 = responseFromJSON.abilities[0].ability.name;
    obj.skill2 = "";
    obj.skill3 = "";
    if (responseFromJSON.abilities.length > 2) {
        obj.skill3 = responseFromJSON.abilities[2].ability.name;
    }
    if (responseFromJSON.abilities.length > 1) {
        obj.skill2 = responseFromJSON.abilities[1].ability.name;
    }

    let nr;
    if (obj.id < 10) nr = "000";
    else if (obj.id < 100) nr = "00";
    else if (obj.id < 999) nr = "0";
    else nr = "";
    obj.id2 = nr + obj.id;

    // console.log(obj);
    POKEMON.push(obj);
    PKMN = POKEMON;
}

function loadMore() {
    dataCount = dataCount + count;
    forStart = forStart + count;

    loadRef.innerHTML = "";
    loadRef.innerHTML += /*html*/ `
        <p class="load-txt">Daten werden geladen...</p>
    `;

    getData();
}

function reLoad() {
    searchStatus = false;
    renderPkmn(POKEMON);
}

function searchStart() {
    const inputRef = document.getElementById(`searchInput`);
    inputRef.onkeydown = function (event) {
        if (event.key === "Enter") {
            searchFunction(inputRef);
        }
    };
}

function searchFunction(input) {
    PKMN = [];
    if (input.value != "" && POKEMON.length > 0) {
        searchStatus = true;
        const filterPKMN = POKEMON.filter(
            (item) =>
                item.name.includes(input.value) ||
                item.typ1.includes(input.value) ||
                item.typ2.includes(input.value) ||
                item.id2.includes(input.value),
        );
        PKMN = filterPKMN;
    } else {
        PKMN = POKEMON;
        searchStatus = false;
    }
    input.value = "";
    renderPkmn(PKMN);
}

function openDialog(i) {
    dialogRef.innerHTML = "";

    dialogRef.showModal();
    dialogRef.classList.add(`opened`);

    dialogRef.innerHTML += /*html*/ `
        <section class="dialog-header">
            <div class="header-content">
                <button onclick="imgLeft(${i})">
                    <img src="./assets/icons/arrow_left.png" alt="Pfeil nach Links" />
                </button>

                <div class="header-txt">
                    <p>#${PKMN[i].id2}</p>
                    <h2>${PKMN[i].name.toUpperCase()}</h2>
                </div>
            
                <button onclick="imgRight(${i})">
                    <img src="./assets/icons/arrow_right.png" alt="Pfeil nach Rechts" />
                </button>
            </div>
            <button class="close-btn" onclick="endDialog(event)">X</button>
        </section>

        <section class="dialog-img" id="dialogPkmnColor${i}">
                    <img class="p-img" src="${PKMN[i].img}" alt="">
                <div class="pkmn-types">
                    <img src="${PKMN[i].imgT1}" alt="">
                    <img src="${PKMN[i].imgT2}" alt="">
                </div>
        </section>

        <section class="dialog-data">
            <div class="stats">
                <h3>STATS</h3><br> 
                <p>HP: ${PKMN[i].hp}</p><br> 
                <p> A: ${PKMN[i].a}</p><br>
                <p> V: ${PKMN[i].v}</p><br>
                <p>SA: ${PKMN[i].sa}</p><br>
                <p>SV: ${PKMN[i].sv}</p><br>
                <p> I: ${PKMN[i].i}</p>
            </div>
            <div class="abilities">
                <h3>ABILITIES</h3><br> 
                <p>${PKMN[i].skill1}</p><br>
                <p>${PKMN[i].skill2}</p><br>
                <p>${PKMN[i].skill3}</p>
            </div>
            
        </section>
    `;
    let dialogColorRef = document.getElementById(`dialogPkmnColor${i}`);
    dialogColorRef.classList.add(`bg-${PKMN[i].typ1}`);
    startEventListener(event);
}

function endDialog(event) {
    dialogRef.close();
    dialogRef.classList.remove(`opened`);
    event.stopPropagation();
}

function imgLeft(i) {
    if (i == 0) {
        i = PKMN.length - 1;
    } else {
        i--;
    }
    endDialog(event);
    openDialog(i);
}

function imgRight(i) {
    if (i == PKMN.length - 1) {
        i = 0;
    } else {
        i++;
    }
    endDialog(event);
    openDialog(i);
}

function startEventListener(event) {
    dialogRef.addEventListener("click", (event) => {
        const rect = dialogRef.getBoundingClientRect();
        const isInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
        if (!isInDialog) {
            endDialog(event);
        }
    });
}

function openOptions() {
    dialogRef.innerHTML = "";

    dialogRef.showModal();
    dialogRef.classList.add(`opened`);

    dialogRef.innerHTML += /*html*/ `
        <section class="dialog-filter">
            <h2>Filter Options</h2>
            <div class="filter-inputs">
                <input typ="text" id="inputStart" placeholder="Start Nr (1-1025)">
                <input typ="text" id="inputEnd" placeholder="End Nr (1-1025)">
            </div>
            <button class="filter-btn" onclick="setOptions()">Anwenden</button>
        </section>
    `;
}

function setOptions() {
    let start = document.getElementById(`inputStart`).value;
    let end = document.getElementById(`inputEnd`).value;

    filterStatus = false;
    if (start != "" && end !== "") {
        if (isNaN(start)) start = 0;
        if (isNaN(end)) end = 40;
        if (start > end) {
            const tausch = start;
            start = end;
            end = tausch;
        }
        if (start == 1) start = 0;
        else if (start > 1025) start = 1025;
        if (end > 1025) end = 1025;
        else if (end == 0) end = 1;
        dataStart = start;
        dataCount = end - start + 1;
        count = dataCount;
        filterStatus = true;
    } else {
        dataStart = 0;
        dataCount = 40;
        count = dataCount;
    }
    endDialog(event);
    PKMNREF.innerHTML = "";
    PKMNREF.innerHTML += /*html*/ `
        <p class="load-txt">Daten werden geladen...</p>;
    `;
    renderLoadBtn();
    POKEMON = [];
    PKMN = [];
    getData();
}
