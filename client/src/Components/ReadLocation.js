function ReadLocation(props) {
  const location = props.name;
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
