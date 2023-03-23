function pokemonsInventory(props) {
  const pokemonName =
    props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.slice(1);
  const pokemonPhoto = props.pokemonPhoto;
  const clickHandler = props.chosenPokemonClick;
  const attack = props.attack;
  const health = props.health;
  const defense = props.defense;
  return (
    <div className="col">
      <div className="card">
        <img
          onClick={clickHandler}
          src={pokemonPhoto}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{pokemonName}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Attack: {attack}</li>
          <li className="list-group-item">Health: {health}</li>
          <li className="list-group-item">Defense: {defense}</li>
        </ul>
      </div>
    </div>
  );
}

export default pokemonsInventory;
{
  /* <div className="col">
      <label>{pokemonName}</label>
      <img onClick={clickHandler} src={pokemonPhoto} />
      <p>Attack: {attack}</p>
      <p>Health: {health}</p>
      <p>Defense: {defense}</p>
    </div> */
}
