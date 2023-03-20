import "./App.css";
import React, { useEffect, useState } from "react";
import ReadLocation from "./Components/ReadLocation";
import ScreenPokemon from "./Components/ScreenPokemon";

function App() {
  const [locations, setLocation] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClickState] = useState(true);

  async function pokemonInfo (link){
    try {
      const response = await fetch(link);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }
  }
  


  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const data = await response.json();
        //   console.log(data);
        setLocation(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
  }, []);
  
  const clickHandle = async(e) => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/location-area/" + e.target.id);
      const data = await response.json();
      // console.log(data.pokemon_encounters[Math.floor(Math.random() * data.pokemon_encounters.length)].pokemon.url);
      setLocation(data);
      setClickState(false);
      await pokemonInfo(data.pokemon_encounters[Math.floor(Math.random() * data.pokemon_encounters.length)].pokemon.url)

      
      // takePhoto(data.pokemon_encounters[Math.floor(Math.random() * data.pokemon_encounters.length)].pokemon.url)
    } catch (error) {
      console.error(error);
    }
    

    //console.log("https://pokeapi.co/api/v2/location-area/" + e.target.id);
  };
  console.log(pokemon.sprites)

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
        <ScreenPokemon 
        photo ={pokemon.sprites.front_default}
        name = {pokemon.name}
        />

      )}
    </div>
  );
}

export default App;
