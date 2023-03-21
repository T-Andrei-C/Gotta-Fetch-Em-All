function ScreenPokemon(props) {
  const photo = props.photo;
  const name = props.name;
  return (
    <div>
      <h2>{name}</h2>
      <img src={photo} />
    </div>
  );
}

export default ScreenPokemon;
