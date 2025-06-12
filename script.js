async function fetchcards() {
  const container = document.querySelector("#pokemon-container");
  container.innerHTML = "";
  const category = document.querySelector("#type").value;
  const number = document.querySelector("input").value;
  const res = await fetch(`https://pokeapi.co/api/v2/type/${category}/`);
  const data = await res.json();
  const allPokemon = data.pokemon; // this is key which consists an array of all the pokemon of that type along with their name and url
  const selected = allPokemon.splice(0, number);
  for (let p of selected) {
    const res = await fetch(p.pokemon.url); // it is already a string
    const pokemondata = await res.json();
    // now we can display the name and image of pokemon
    const div = document.createElement("div");
    const id = document.createElement("p");
    const name = document.createElement("p");
    const br = document.createElement("br");
    const img = document.createElement("img");
    const stats = document.createElement("p");
    div.classList.add("pokemon");
    id.innerHTML = `PokeIndex: #${pokemondata.id}`;
    name.innerHTML = pokemondata.name;
    img.src = pokemondata.sprites.front_default;
    img.alt = pokemondata.name;
    const hp = pokemondata.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    const attack = pokemondata.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    const defense = pokemondata.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    stats.innerText = `HP: ${hp} | ATTACKK: ${attack} | DEFENSE: ${defense}`;
    div.appendChild(id);
    div.appendChild(name);
    div.appendChild(br);
    div.appendChild(img);
    div.appendChild(stats);
    container.appendChild(div);
  }
}
