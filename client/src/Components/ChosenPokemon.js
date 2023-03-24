function chosenPokemon(props) {
  const pokemonName = props.pokemonName;
  const pokemonPhoto = props.pokemonPhoto;
  const health = props.health
  const damagedHealth = props.damagedHealth;
  return (
    <div>
      <h2>{pokemonName}</h2>
      <img src={pokemonPhoto} />
      <h3>Health: {health}</h3>
      <progress id="hpChoosenPoke" value={health} max={damagedHealth}></progress>
    </div>
  );
}

export default chosenPokemon;