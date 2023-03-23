function pokemonsInventory(props) {
  const pokemonName = props.pokemonName;
  const pokemonPhoto = props.pokemonPhoto;
  const clickHandler = props.chosenPokemonClick;
  const attack = props.attack
  const health = props.health
  const defense = props.defense
  return (
    <div className="col">
      <label>{pokemonName}</label>
      <img onClick={clickHandler} src={pokemonPhoto} />
      <p>Attack: {attack}</p>
      <p>Health: {health}</p>
      <p>Defense: {defense}</p>
    </div>
  );
}

export default pokemonsInventory;
