function pokemonsInventory(props) {
  const pokemonName = props.pokemonName;
  const pokemonPhoto = props.pokemonPhoto;
  const clickHandler = props.chosenPokemonClick;
  const attack = props.attack
  const health = props.health
  const defense = props.defense
  return (
    <div className="inventory">
      <h2>{pokemonName}</h2>
      <img onClick={clickHandler} src={pokemonPhoto} />
      <h3>Attack: {attack}</h3>
      <h3>Health: {health}</h3>
      <h3>Defense: {defense}</h3>
    </div>
  );
}

export default pokemonsInventory;
