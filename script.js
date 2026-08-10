function init() {
    count = dataCount;
    getTypes();
    setTimeout(() => {
        getData();
    }, 1000);
}

//#region API Data
async function getTypes() {
    for (let t = 0; t < 18; t++) {
        const typ = await fetch(`https://pokeapi.co/api/v2/type/${t + 1}`);
        const typFromJSN = await typ.json();
        TYPES[t] =
            typFromJSN.sprites["generation-viii"]["sword-shield"].symbol_icon;
    }
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
//#endregion

//#region Render
function renderPkmn(pokemonList) {
    PKMNREF.innerHTML = "";
    for (let i = 0; i < pokemonList.length; i++) {
        PKMNREF.innerHTML += renderPkmnTemplate(i, pokemonList);
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
    typeRef.innerHTML += renderType1Template(i, pokemonList);

    if (pokemonList[i].imgT2 != "") {
        typeRef.innerHTML += renderType2Template(i, pokemonList);
    }
}

function renderLoadBtn() {
    loadRef.innerHTML = "";
    if (searchStatus === false && filterStatus == false) {
        loadRef.innerHTML = renderLoadBtn1Template();
    } else if (filterStatus == false) {
        loadRef.innerHTML = renderLoadBtn2Template();
    }
}
//#endregion

//#region Data Set
function setBgColor(i) {
    const colorRef = document.getElementById(`pkmnColor${i}`);
    colorRef.classList.add(`bg-${PKMN[i].typ1}`);
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
    const obj = {};
    obj.name = responseFromJSON.name;
    obj.img = responseFromJSON.sprites.other.home.front_default;
    obj.id = responseFromJSON.id;

    setStatsId2(obj);
    setStatsTypes(obj, responseFromJSON);
    setStatsSkills(obj, responseFromJSON);

    POKEMON.push(obj);
    PKMN = POKEMON;
}

function setStatsId2(obj) {
    let nr;
    if (obj.id < 10) nr = "000";
    else if (obj.id < 100) nr = "00";
    else if (obj.id < 999) nr = "0";
    else nr = "";
    obj.id2 = nr + obj.id;
}
function setStatsTypes(obj, responseFromJSON) {
    obj.typ1 = responseFromJSON.types[0].type.name;
    if (responseFromJSON.types.length > 1)
        obj.typ2 = responseFromJSON.types[1].type.name;
    else obj.typ2 = "";
    obj.imgT1 = setType(obj.typ1);
    if (obj.typ2 != "") obj.imgT2 = setType(obj.typ2);
    else obj.imgT2 = "";
}

function setStatsSkills(obj, responseFromJSON) {
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
}
//#endregion

//#region Load Btn
function loadMore() {
    dataCount = dataCount + count;
    forStart = forStart + count;
    loadRef.innerHTML = "";
    loadRef.innerHTML += loadDataTemplate();
    getData();
}

function reLoad() {
    searchStatus = false;
    PKMN = POKEMON;
    renderPkmn(POKEMON);
}
//#endregion

//#region Search
function searchStart() {
    const inputRef = document.getElementById(`searchInput`);
    searchStatus = false;
    if (inputRef.value != "" && inputRef.value.length > 2) {
        searchFunction(inputRef);
    } else {
        PKMNREF.innerHTML = "";
        PKMNREF.innerHTML += searchErrorTemplate();
        searchStatus = true;
        renderLoadBtn();
        inputRef.value = "";
    }
}

function searchFunction(input) {
    PKMN = [];
    searchFilter(input);
    if (PKMN.length == 0) {
        PKMNREF.innerHTML = "";
        PKMNREF.innerHTML += searchError2Template(input);
        renderLoadBtn();
    }
    input.value = "";
    document.body.style.overflow = "";
    if (PKMN.length > 0) renderPkmn(PKMN);
}

function searchFilter(input) {
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
}
//#endregion

//#region Dialog
function openDialog(i) {
    dialogRef.innerHTML = "";
    dialogRef.showModal();
    dialogRef.classList.add(`opened`);
    dialogRef.innerHTML += openDialogTemplate(i);
    const dialogColorRef = document.getElementById(`dialogPkmnColor${i}`);
    dialogColorRef.classList.add(`bg-${PKMN[i].typ1}`);
    startEventListener(event);
    if (document.body.style.overflow == "hidden")
        document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
}

function endDialog(event) {
    dialogRef.close();
    dialogRef.classList.remove(`opened`);
    event.stopPropagation();
    document.body.style.overflow = "";
}

function countLeft(i) {
    if (i == 0) {
        i = PKMN.length - 1;
    } else {
        i--;
    }
    endDialog(event);
    openDialog(i);
}

function countRight(i) {
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

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            endDialog(event);
        }
    });
}
//#endregion

//#region Nr Filter
function openOptions() {
    dialogRef.innerHTML = "";
    dialogRef.showModal();
    dialogRef.classList.add(`opened`);
    dialogRef.innerHTML += openOptionsTemplate();
    startEventListener(event);
}

function setOptions() {
    let start = document.getElementById(`inputStart`).value;
    let end = document.getElementById(`inputEnd`).value;
    filterStatus = false;
    if (start != "" && end !== "") {
        correctOptions(start, end);
        filterStatus = true;
    } else {
        dataStart = 0;
        dataCount = 40;
        count = dataCount;
    }
    runOptions();
}

function correctOptions(start, end) {
    if (isNaN(start)) start = 0;
    if (isNaN(end)) end = 40;
    if (start > end) {
        const tausch = start;
        start = end;
        end = tausch;
    }
    if (start > 1025) start = 1025;
    if (end > 1025) end = 1025;
    else if (end == 0) end = 1;
    dataStart = start;
    dataCount = end - start;
    dataCount = dataCount + 1;
    count = dataCount;
}

function runOptions() {
    endDialog(event);
    PKMNREF.innerHTML = "";
    PKMNREF.innerHTML += loadDataTemplate();
    renderLoadBtn();
    POKEMON = [];
    PKMN = [];
    getData();
}
//#endregion
