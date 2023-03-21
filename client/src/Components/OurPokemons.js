function OurPokemons(props) {
const PokemonName = props.PokemonName
const PokemonPhoto = props.PokemonPhoto
    return (
      <div>
        <label>{PokemonName}</label>
        <img src={PokemonPhoto} />
      </div>
    );
  }
  
  export default OurPokemons;