function locationButton(props) {
  const location = props.locationName
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
  const clickFunction = props.clickFunction;

  return (
    <div className="col">
      <button className="btn btn-outline-primary my-3" onClick={clickFunction}>
        {location}
      </button>
    </div>
  );
}

export default locationButton;
