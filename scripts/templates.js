function renderPkmnTemplate(i, pokemonList) {
    return /*html*/ `
        <button aria-label="pokemon card" data-id ="card" onclick="openDialog(${i})">
            <section class="pkmn">
                <div class="card-header">
                    <p>#${pokemonList[i].id2}</p>
                    <h2>${pokemonList[i].name.toUpperCase()}</h2>
                </div>
                <div class="pkmn-img" id="pkmnColor${i}">
                    <div class="bg-circle">
                        <img data-id ="card-image" src="${pokemonList[i].img}" alt="pokemon image">
                    </div>
                </div>
                <div class="pkmn-types" id="pkmnTypes${i}"></div>
            <section>
        </button>
    `;
}

function renderType1Template(i, pokemonList) {
    return /*html*/ `
        <img src="${pokemonList[i].imgT1}" alt="pokemon type1 image">
    `;
}

function renderType2Template(i, pokemonList) {
    return /*html*/ `
        <img src="${pokemonList[i].imgT2}" alt="pokemon type2 image">
    `;
}

function renderLoadBtn1Template() {
    return /*html*/ `
        <button aria-label="load more button" data-id ="load-more-button"class="load-btn" onclick="loadMore()">Load more</button>
    `;
}

function renderLoadBtn2Template() {
    return /*html*/ `
        <button aria-label="reload button" class="load-btn" onclick="reLoad()">Reset Search</button>
    `;
}

function ErrorBtnTemplate() {
    return /*html*/ `
        <div class="error-btn">
            <p>Daten konnten nicht geladen werden...</p>
            <p>Seite neu laden!</p>
        </div>
    `;
}

function loadDataTemplate() {
    return /*html*/ `
        <p aria-label="load text"class="load-txt">Daten werden geladen...</p>
    `;
}

function openDialogTemplate(i) {
    return /*html*/ `
        <header class="dialog-header">
            <div class="header-content">
                <button onclick="countLeft(${i})">
                    <img data-id ="prev-button" src="./assets/icons/arrow_left.png" alt="arrow left" />
                </button>

                <div class="header-txt">
                    <p>#${PKMN[i].id2}</p>
                    <h2 data-id ="overlay-pokemon-name">${PKMN[i].name.toUpperCase()}</h2>
                </div>
            
                <button onclick="countRight(${i})">
                    <img data-id ="next-button" tabindex="-1" id="nextBtn" src="./assets/icons/arrow_right.png" alt="arrow right" />
                </button>
            </div>
            <button data-id ="close-dialog-button" class="close-btn" onclick="endDialog(event)">X</button>
        </header>

        <section class="dialog-img" id="dialogPkmnColor${i}">
            <article class="pkmn-img">
                <div class="bg-circle">
                    <img data-id ="dialog-image" src="${PKMN[i].img}" alt="pokemon image">
                </div>
            </article>
            <article class="pkmn-types">
                <div class="typ1">
                    <img src="${PKMN[i].imgT1}" alt="pokemon type1 imgage">
                </div>
                <div id="dialogType2${i}" class="typ2">
                </div>
            </article>
        </section>

        <section class="dialog-data">
            <div class="stats">
                <h3>STATS</h3><br> 
                <div class="stats-p">
                    <p>HP: ${PKMN[i].hp}</p><br> 
                    <p> A: ${PKMN[i].a}</p><br>
                    <p> V: ${PKMN[i].v}</p><br>
                    <p>SA: ${PKMN[i].sa}</p><br>
                    <p>SV: ${PKMN[i].sv}</p><br>
                    <p> I: ${PKMN[i].i}</p>
                </div>
            </div>
            <div class="abilities">
                <h3>ABILITY</h3><br> 
                <div class="ability-p">
                    <p>${PKMN[i].skill1}</p><br>
                    <p>${PKMN[i].skill2}</p><br>
                    <p>${PKMN[i].skill3}</p>
                </div>
            </div>
        </section>
    `;
}

function openOptionsTemplate() {
    return /*html*/ `
        <section aria-label="filter options" class="dialog-filter">
            <h2>Filter Options</h2>
            <div class="filter-inputs">
                <input typ="text" id="inputStart" placeholder="Start Nr (1-1025)">
                <input typ="text" id="inputEnd" placeholder="End Nr (1-1025)">
            </div>
            <button aria-label="run filter button" class="filter-btn" onclick="setOptions()">Load Data</button>
        </section>
    `;
}

function searchErrorTemplate() {
    return /*html*/ `
        <p data-id ="not-found" class="search-error">Keine Treffer! Suche ab 3 Buchstaben...</p> 
    `;
}

function searchError2Template(input) {
    return /*html*/ `
        <p data-id ="not-found" class="search-error">Keine Treffer! Mit (${input.value})</p> 
    `;
}
