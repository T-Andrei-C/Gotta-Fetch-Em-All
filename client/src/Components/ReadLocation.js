function ReadLocation(props) {
  const location = props.name.split("-").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
  const clickFunction = props.clickFunction;
  return (
    <div>
      <button onClick={clickFunction} id={props.id}>
        {location}
      </button>
    </div>
  );
}

export default ReadLocation;
