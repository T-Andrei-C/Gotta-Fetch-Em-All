function chosenPokemon(props) {
    const pokemonName = props.pokemonName;
    const pokemonPhoto = props.pokemonPhoto;
    const health = props.health
    return (
      <div>
        <label>{pokemonName}</label>
        <img src={pokemonPhoto} />
        <p>Health: {health}</p>
      </div>
    );
  }
  
  export default chosenPokemon;