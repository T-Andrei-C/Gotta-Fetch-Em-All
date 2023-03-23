function NoPokemonAvailable(props) {

  return (
    <div>
      <p>This location doesn't seem to have any pokémon</p>
      <button onClick={props.backHandle}>Back</button>
    </div>

  );
}

export default NoPokemonAvailable;
