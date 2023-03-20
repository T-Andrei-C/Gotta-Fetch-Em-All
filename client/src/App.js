import "./App.css";
import React, { useEffect, useState } from "react";
import ReadLocation from "./Components/ReadLocation";

function App() {
  const [locations, setLocation] = useState(null);
  const [pokemon, setPokemon] = useState("https://pokeapi.co/api/v2/location");
  const [clicked, setClickState] = useState(true);
  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch(pokemon);
        const data = await response.json();
        console.log(data);
        setLocation(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
  }, [pokemon]);
  console.log(locations);

  const clickHandle = (e) => {
    setPokemon("https://pokeapi.co/api/v2/location-area/" + e.target.id);
    console.log(pokemon);
    setClickState(false);
    //console.log("https://pokeapi.co/api/v2/location-area/" + e.target.id);
  };

  return (
    <div className="App">
      {clicked ? (
        locations &&
        locations.results.map((location, index) => (
          <ReadLocation
            name={location.name}
            clickFunction={clickHandle}
            id={index + 1}
            key={index}
          />
        ))
      ) : (
        <p>bravo merge</p>
      )}
    </div>
  );
}

export default App;
