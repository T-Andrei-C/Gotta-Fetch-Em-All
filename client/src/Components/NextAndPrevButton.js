function NextAndPrevButton(props) {

  return (
    <div>
      <button className="prevBtn" onClick={props.prevHendle}>Previous</button>
      <button className="nextBtn" onClick={props.nextHendle}>Next</button>
    </div>

  );
}

export default NextAndPrevButton;
