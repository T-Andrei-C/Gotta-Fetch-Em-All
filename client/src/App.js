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
  const [pokemonFound, setPokemonFound] = useState(true);
  const [chosenPokemon, setChosenPokemon] = useState([]);
  const [chosenPokemonIndex, setChosenPokemonIndex] = useState(null);
  const [myTurn, setMyTurn] = useState(true);
  const [pokemonEncounterHealth, setPokemonEncounterHealth] = useState(null);
  const [chosenPokemonHealth, setChosenPokemonHealth] = useState(null);
  const [pokemonInventory, setPokemonInventory] = useState([
    "https://pokeapi.co/api/v2/pokemon/meowth",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/raichu",
  ]);
  const attackDelay = 1;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(linkLocation);
        const data = await response.json();
        setLocationsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocation();
  }, [linkLocation]);

  const fetchPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAreaData = async (link) => {
    try {
      const response = await fetch(link);
      const data = await response.json();
      if (data.areas.length > 0) {
        return data.areas[Math.floor(Math.random() * data.areas.length)].url;
      } else setPokemonFound(false);
    } catch (error) {
      console.error(error);
    }
  };

  const locationClickHandler = async (link) => {
    try {
      const response = await fetch(link);
      const data = await response.json();
      if (data.pokemon_encounters.length > 0) {
        pokemonInventory.map(async (pokemon) => {
          const pokemonData = await fetchPokemon(pokemon);
          chosenPokemon.push(pokemonData);
          setChosenPokemon([...chosenPokemon]);
        });
        return data.pokemon_encounters[
          Math.floor(Math.random() * data.pokemon_encounters.length)
        ].pokemon.url;
      } else setPokemonFound(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaster = async (locationUrl) => {
    const locationData = await getAreaData(locationUrl);
    const clickHandlerData = await locationClickHandler(locationData);
    const pokemonEncounterData = await fetchPokemon(clickHandlerData);
    setPokemonEncounter(pokemonEncounterData);
    setLocationClicked(false);
  };

  const chosenPokemonClickHandler = (index) => {
    if (chosenPokemonIndex !== index) {
      setChosenPokemonIndex(index);
    }
    setChosenPokemonHealth(chosenPokemon[index].stats[0].base_stat);
    setPokemonEncounterHealth(pokemonEncounter.stats[0].base_stat);
  };

  const resetBoard = () => {
    setPokemonFound(true);
    setLocationClicked(true);
    setChosenPokemonIndex(null);
    setChosenPokemon([]);
  };

  const attackAlgorithm = (attackingPokemon, defendingPokemon) => {
    setTimeout(() => {
      const baseDamage = attackingPokemon.stats[1].base_stat;
      const defense = defendingPokemon.stats[2].base_stat;
      const randomValue = Math.floor(Math.random() * 38 + 217);
      const trueDamage = Math.floor(
        ((((2 / 5 + 2) * baseDamage * 60) / defense / 50 + 2) * randomValue) /
          255
      );
      const health = myTurn ? pokemonEncounterHealth : chosenPokemonHealth;
      const healthAfterAttack = health - trueDamage;

      if (myTurn) {
        setPokemonEncounterHealth(healthAfterAttack);
        if (healthAfterAttack <= 0) {
          pokemonInventory.push(
            "https://pokeapi.co/api/v2/pokemon/" + pokemonEncounter.name
          );
          setPokemonInventory([...new Set(pokemonInventory)]);
          resetBoard();
        }
      } else {
        setChosenPokemonHealth(healthAfterAttack);
        if (healthAfterAttack <= 0) {
          resetBoard();
        }
      }
      setMyTurn(!myTurn);
    }, attackDelay);
  };

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
            clickFunction={() => fetchMaster(location.url)}
            id={index + 1}
            key={index}
          />
        ))
      ) : pokemonFound ? (
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
                MyPokemonClick={() => chosenPokemonClickHandler(index)}
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
                ? attackAlgorithm(
                    chosenPokemon[chosenPokemonIndex],
                    pokemonEncounter
                  )
                : attackAlgorithm(
                    pokemonEncounter,
                    chosenPokemon[chosenPokemonIndex]
                  )}
            </div>
          )}
        </div>
      ) : (
        <NoPokemonAvailable
          backHandle={() => {
            setPokemonFound(true);
            setLocationClicked(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
