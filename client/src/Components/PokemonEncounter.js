function pokemonEncounter(props) {
  const photo = props.photo;
  const name = props.name;
  const health = props.health
  const damagedHealth = props.damagedHealth
  console.log()
  return (
    <>
    <div className="encounterPokemon">
      <h2>{name}</h2>
      <img src={photo} />
      <h3>Health: {health}</h3>
      <progress id="hpEncounter" value={health} max={damagedHealth}></progress>
    </div>
    <div className="versus">
      <img src="https://cdn.onlinewebfonts.com/svg/img_418591.png"/>
    </div>
    </>
  );
}

export default pokemonEncounter;
