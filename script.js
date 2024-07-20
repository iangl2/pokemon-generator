// const url ='https://pokeapi.co/api/v2/pokemon-species/?limit=100000&offset=0.'
const url ='https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'


const buttonRandomize = document.getElementById('randomize')
buttonRandomize.addEventListener('click', generatePokemon)

async function displayPokemon(pokemonData) {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name')
    try {
        pokemonImage.src = await pokemonData.sprites.other.home.front_default
        pokemonName.innerHTML =  pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
    } catch (error) {
        console.log(error)   
    }
}

async function generatePokemon(){
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (res.status ===200) {
            console.log('success')
            try {
                const numPokemon= Math.floor(Math.random() * (data.results.length - 1) )
                const randomPokemon = await fetch(data.results[numPokemon].url)
                const randomPokemonData =await randomPokemon.json()
                if (randomPokemon.status === 200) {    
                   displayPokemon(randomPokemonData)
                } else {
                    console.log("Pokemon Doesn't exist")
                }
                
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('Doesnt exist')
        }
    } catch (error) {
        console.log(error)
    }
}


generatePokemon()