function pokemonEncounter(props) {
  const photo = props.photo;
  const name = props.name;
  const health = props.health
  return (
    <div>
      <h2>{name}</h2>
      <img src={photo} />
      <p>Health: {health}</p>
    </div>
  );
}

export default pokemonEncounter;
