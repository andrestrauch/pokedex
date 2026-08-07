function renderPkmnTemplate(i, pokemonList) {
    return /*html*/ `
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
}

function renderType1Template(i, pokemonList) {
    return /*html*/ `
        <img src="${pokemonList[i].imgT1}" alt="">
    `;
}

function renderType2Template(i, pokemonList) {
    return /*html*/ `
        <img src="${pokemonList[i].imgT2}" alt="">
    `;
}

function renderLoadBtn1Template() {
    return /*html*/ `
        <button class="load-btn" onclick="loadMore()">Load more</button>
    `;
}

function renderLoadBtn2Template() {
    return /*html*/ `
        <button class="load-btn" onclick="reLoad()">Reset Search</button>
    `;
}

function loadDataTemplate() {
    return /*html*/ `
        <p class="load-txt">Daten werden geladen...</p>
    `;
}

function openDialogTemplate(i) {
    return /*html*/ `
        <section class="dialog-header">
            <div class="header-content">
                <button onclick="countLeft(${i})">
                    <img src="./assets/icons/arrow_left.png" alt="Pfeil nach Links" />
                </button>

                <div class="header-txt">
                    <p>#${PKMN[i].id2}</p>
                    <h2>${PKMN[i].name.toUpperCase()}</h2>
                </div>
            
                <button onclick="countRight(${i})">
                    <img src="./assets/icons/arrow_right.png" alt="Pfeil nach Rechts" />
                </button>
            </div>
            <button class="close-btn" onclick="endDialog(event)">X</button>
        </section>

        <section class="dialog-img" id="dialogPkmnColor${i}">
            <div class="pkmn-img">
                <img src="${PKMN[i].img}" alt="">
            </div>
            <div class="pkmn-types">
                <div class="typ1">
                    <img src="${PKMN[i].imgT1}" alt="">
                </div>
                <div class="typ2">
                    <img src="${PKMN[i].imgT2}" alt="">
                </div>
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
                <h3>ABILITY</h3><br> 
                <p>${PKMN[i].skill1}</p><br>
                <p>${PKMN[i].skill2}</p><br>
                <p>${PKMN[i].skill3}</p>
            </div>
            
        </section>
    `;
}

function openOptionsTemplate() {
    return /*html*/ `
        <section class="dialog-filter">
            <h2>Filter Options</h2>
            <div class="filter-inputs">
                <input typ="text" id="inputStart" placeholder="Start Nr (1-1025)">
                <input typ="text" id="inputEnd" placeholder="End Nr (1-1025)">
            </div>
            <button class="filter-btn" onclick="setOptions()">Load Data</button>
        </section>
    `;
}
