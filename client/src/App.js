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
  const [locationsData, setLocationsData] = useState(null);
  const [pokemonEncounter, setPokemonEncounter] = useState([]);
  const [locationClicked, setLocationClicked] = useState(true);
  const [noPokemonSelected, setNoPokemonSelected] = useState(true);
  const [chosenPokemon, setChosenPokemon] = useState([]);
  const [chosenPokemonIndex, setChosenPokemonIndex] = useState(null);
  const [myTurn, setMyTurn] = useState(true);
  const [pokemonEncounterHealth, setPokemonEncounterHealth] = useState(null);
  const [chosenPokemonHealth, setChosenPokemonHealth] = useState(null);
  const [winGame, setWinGame] = useState(null);
  const [pokemonInventory, setPokemonInventory] = useState([
    "https://pokeapi.co/api/v2/pokemon/meowth",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/raichu",
  ]);

  const FetchPokemon = async (url) => {
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
      } else setNoPokemonSelected(false);

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
        setLocationsData(data);
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
        pokemonInventory.map(async (pokemon) => {
          let data = await FetchPokemon(pokemon);
          chosenPokemon.push(data);
          //datePokemoni.push(MyPokemon)
          setChosenPokemon([...chosenPokemon]);
        });

        return data.pokemon_encounters[
          Math.floor(Math.random() * data.pokemon_encounters.length)
        ].pokemon.url;
      } else setNoPokemonSelected(false);
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
    setPokemonEncounter(z);
    setLocationClicked(false);
  };

  function MyPokemonClickHandler(index) {
    if (chosenPokemonIndex !== index) {
      setChosenPokemonIndex(index);
    }

    if (winGame === null) {
      setChosenPokemonHealth(chosenPokemon[index].stats[0].base_stat);
      setPokemonEncounterHealth(pokemonEncounter.stats[0].base_stat);
    }

    //console.log(SelectedPokemon)
  }

  function attack(attackingPokemon, defendingPokemon) {
    if (winGame === null) {
      setTimeout(() => {
        let damage = attackingPokemon.stats[1].base_stat;
        let defense = defendingPokemon.stats[2].base_stat;
        let health;
        let random = Math.floor(Math.random() * 38 + 217);

        if (myTurn) {
          health = pokemonEncounterHealth;
        } else {
          health = chosenPokemonHealth;
        }

        console.log(health);

        let formula = Math.floor(
          ((((2 / 5 + 2) * damage * 60) / defense / 50 + 2) * random) / 255
        );

        console.log(formula);
        let newHealth = health - formula;
        console.log(newHealth);

        if (myTurn) {
          setPokemonEncounterHealth(newHealth);
          if (newHealth <= 0) {
            setWinGame("noi");
            pokemonInventory.push(
              "https://pokeapi.co/api/v2/pokemon/" + pokemonEncounter.name
            );
            setPokemonInventory([...new Set(pokemonInventory)]);
            setNoPokemonSelected(true);
            setLocationClicked(true);
            setWinGame(null);
            setChosenPokemonIndex(null);
            setChosenPokemon([]);
          }
        } else {
          setChosenPokemonHealth(newHealth);
          if (newHealth <= 0) {
            setWinGame("voi");
            setNoPokemonSelected(true);
            setLocationClicked(true);
            setWinGame(null);
            setChosenPokemonIndex(null);
            setChosenPokemon([]);
          }
        }

        setMyTurn(!myTurn);
      }, 500);
    }
  }

  console.log(winGame);
  console.log(pokemonInventory);
  return (
    <div className="App">
      {locationClicked ? (
        <NextAndPrevButton
          nextHendle={() => setLinkLocation(locationsData.next)}
          prevHendle={() => setLinkLocation(locationsData.previous)}
        />
      ) : (
        ""
      )}

      {locationClicked ? (
        locationsData &&
        locationsData.results.map((location, index) => (
          <ReadLocation
            name={location.name}
            clickFunction={() => a(location.url)}
            id={index + 1}
            key={index}
          />
        ))
      ) : noPokemonSelected ? (
        <div>
          <ScreenPokemon
            photo={pokemonEncounter.sprites.other.dream_world.front_default}
            name={pokemonEncounter.name}
          />
          {chosenPokemonIndex === null ? (
            chosenPokemon.map((pokemon, index) => (
              <OurPokemons
                PokemonName={pokemon.name}
                PokemonPhoto={pokemon.sprites.other.dream_world.front_default}
                key={pokemon.name}
                MyPokemonClick={() => MyPokemonClickHandler(index)}
              />
            ))
          ) : (
            <div>
              <OurPokemons
                PokemonName={chosenPokemon[chosenPokemonIndex].name}
                PokemonPhoto={
                  chosenPokemon[chosenPokemonIndex].sprites.other.dream_world
                    .front_default
                }
              />
              {myTurn && myTurn !== null
                ? attack(chosenPokemon[chosenPokemonIndex], pokemonEncounter)
                : attack(pokemonEncounter, chosenPokemon[chosenPokemonIndex])}
            </div>
          )}
        </div>
      ) : (
        <NoPokemonAvailable
          backHandle={() => {
            setNoPokemonSelected(true);
            setLocationClicked(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
