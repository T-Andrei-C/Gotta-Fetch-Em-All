function winGame(props) {
    const back = props.back;
    return (
      <div>
        <img src={"https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"} />
        <button onClick={back}>Advance to next battle</button>
      </div>
    );
  }
  
  export default winGame;
  