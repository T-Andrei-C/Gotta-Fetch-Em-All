function loseGame(props) {
  const back = props.back;
  return (
    <div className="loseGame">
      <p>You lost the battle!!! Better luck next time!</p>
      <button onClick={back}>Try again</button>
    </div>
  );
}

export default loseGame;
