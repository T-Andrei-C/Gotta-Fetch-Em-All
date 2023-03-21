function NextAndPrevButton(props) {

  return (
    <div>
      <button onClick={props.prevHendle}>Previous</button>
      <button onClick={props.nextHendle}>Next</button>
    </div>

  );
}

export default NextAndPrevButton;
