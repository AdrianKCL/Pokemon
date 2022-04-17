let backgroundColor = document.querySelector('.pokemon_page')
let searchQuery = "";
let results = document.querySelector('.result');
let search = document.getElementById('search__input')
const pokemonListEl = document.querySelector('.pokemons');

async function main() {

    standard();

    const pokemonAPI = await fetch (("https://api.pokemontcg.io/v2/cards?q=name:" + searchQuery), {
        headers: {
            'X-API-KEY': '05ebcbbc-af76-4d11-8313-8fc84cd81dfb'
        }
    }).catch(error => {
        console.log("here!!")
        console.error(error.response)
    })

    const pokemonData = await pokemonAPI.json();
    const pokemonDataResults = pokemonData.data
    console.log(pokemonDataResults)
    
    pokemonListEl.innerHTML = pokemonDataResults.map(
        (pokemon) => pokemonHTML(pokemon)).join('')

    results.innerHTML = `Results for "${search.value}" - ${pokemonDataResults.length}`

    let pokemonTypes = "" + pokemonDataResults[0].types;
    let pokemonSubTypes= "" + pokemonDataResults[0].subtypes[0];


    let exist = Object.keys(pokemonDataResults[0]).includes('types')

}



function pokemonHTML(pokemon) {
    return `<div class="pokemon" onclick="showUserPosts('${pokemon.id}')">
                <figure class="pokemon__img--wrapper">
                    <img class="pokemon__img" alt="" src="${pokemon.images.small}">
                </figure>
                <h2 class="pokemon__title">${pokemon.name}</h2>
                <div class="pokemon__type">${pokemon.types}</div>
                <div class="content"></div>
            </div>`
}

function searchKeyPress(event) {
    event = event || window.event;
    if (event.key === 'Enter') {
        searchQuery = '"'+ search.value+'"';
        main();
        return false;
    }
    return true;
}


function standard() {
    standardHTML = `<div class="pokemon">
                        <figure>
                            <img class="standard-image standard">
                        </figure>
                        <h2 class="standard-title standard"></h2>
                        <div class="standard-type standard"></div>
                    </div>`
    pokemonListEl.innerHTML = standardHTML.repeat(10);
}