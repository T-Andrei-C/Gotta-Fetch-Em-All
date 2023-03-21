import "./App.css";
import React, { useEffect, useState } from "react";
import ReadLocation from "./Components/ReadLocation";
import ScreenPokemon from "./Components/ScreenPokemon";
import NextAndPrevButton from "./Components/NextAndPrevButton";
import NoPokemonAvailable from "./NoPokemonAvaible";
import OurPokemons from "./Components/OurPokemons";

function App() {
  const [linkLocation, setLinkLocation] = useState(
    "https://pokeapi.co/api/v2/location"
  );
  const [locations, setLocation] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClickState] = useState(true);
  const [NoPokemon, setNoPokemon] = useState(true);
  const [MyPokemon, setMyPokemon] = useState([]);
  const [SelectedPokemon, setSelectedPokemon] = useState(null);

  const userPokemons = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ];

  async function FetchPokemon(url) {
    let data = await fetch(url);
    let data2 = await data.json();
    //console.log(data2)
    //setMyPokemon(data2);
    return data2;
  }

  async function locationInfo(link) {
    try {
      const response = await fetch(link);
      const data = await response.json();
      // console.log(data.areas[Math.floor(Math.random() * data.areas.length)].url)
      if (data.areas.length > 0) {
        return data.areas[Math.floor(Math.random() * data.areas.length)].url;
      } else setNoPokemon(false);

      // return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function pokemonInfo(link) {
    try {
      const response = await fetch(link);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch(linkLocation);
        const data = await response.json();
        //   console.log(data);
        setLocation(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
  }, [linkLocation]);

  const clickHandle = async (link) => {
    try {
      const response = await fetch(link);
      const data = await response.json();
      //console.log(data.pokemon_encounters.length);
      if (data.pokemon_encounters.length > 0) {
        userPokemons.map(async (pokemon) => {
          let data = await FetchPokemon(pokemon);
          MyPokemon.push(data);
          //datePokemoni.push(MyPokemon)
          setMyPokemon([...MyPokemon])
          console.log(MyPokemon);
        });

        return data.pokemon_encounters[
          Math.floor(Math.random() * data.pokemon_encounters.length)
        ].pokemon.url;
      } else setNoPokemon(false);
    } catch (error) {
      console.error(error);
    }

    //console.log("https://pokeapi.co/api/v2/location-area/" + e.target.id);
  };
  // console.log(pokemon.sprites)

  const a = async (location) => {
    const l = await locationInfo(location);
    // await locationInfo(location)
    const b = await clickHandle(l);
    const z = await pokemonInfo(b);
    setPokemon(z);
    setClickState(false);
  };

  function MyPokemonClickHandler (index) {
    setSelectedPokemon(index)
    //console.log(SelectedPokemon)
  }


  return (
    <div className="App">
      {clicked ? (
        <NextAndPrevButton
          nextHendle={() => setLinkLocation(locations.next)}
          prevHendle={() => setLinkLocation(locations.previous)}
        />
      ) : (
        ""
      )}

      {clicked ? (
        locations &&
        locations.results.map((location, index) => (
          <ReadLocation
            name={location.name}
            clickFunction={() => a(location.url)}
            id={index + 1}
            key={index}
          />
        ))
      ) : NoPokemon ? (
        <div>
          <ScreenPokemon
            photo={pokemon.sprites.other.dream_world.front_default}
            name={pokemon.name}
          />
        {MyPokemon.map((pokemon,index) => (
          <OurPokemons
            PokemonName={pokemon.name}
            PokemonPhoto={pokemon.sprites.other.dream_world.front_default}
            key={pokemon.name}
            MyPokemonClick={() => MyPokemonClickHandler(index)}
          />
        ))}
        </div>
      ) : (
        <NoPokemonAvailable
          backHandle={() => {
            setNoPokemon(true);
            setClickState(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
