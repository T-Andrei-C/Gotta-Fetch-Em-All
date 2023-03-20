function ReadLocation(props){
    const location = props.name;
    const clickFunction = props.clickFunction
    return (
        <div onClick={clickFunction}>
            <h2 id={props.id}>{location}</h2>
        </div>
    )
}

export default ReadLocation ;