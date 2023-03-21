function OurPokemons(props) {
const PokemonName = props.PokemonName
const PokemonPhoto = props.PokemonPhoto
const clickHandler = props.MyPokemonClick
    return (
      <div>
        <label>{PokemonName}</label>
        <img onClick={clickHandler} src={PokemonPhoto} />
      </div>
    );
  }
  
  export default OurPokemons;