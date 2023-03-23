import "./App.css";
import React, { useEffect, useState } from "react";
import LocationButton from "./Components/LocationButton";
import PokemonEncounter from "./Components/PokemonEncounter";
import NextAndPrevButton from "./Components/NextAndPrevButton";
import NoPokemonAvailable from "./Components/NoPokemonAvaible";
import PokemonsInventory from "./Components/PokemonsInventory";
import ChosenPokemon from "./Components/ChosenPokemon";
import WinGame from "./Components/WinGame";
import LoseGame from "./Components/LoseGame";

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
  const [gameWon, setGameWon] = useState(null)
  const [pokemonInventory, setPokemonInventory] = useState([
    "https://pokeapi.co/api/v2/pokemon/meowth",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/raichu",
  ]);

  const attackDelay = 500;

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
    setGameWon(null);
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
          setGameWon(1)
         // resetBoard();
        }
      } else {
        setChosenPokemonHealth(healthAfterAttack);
        if (healthAfterAttack <= 0) {
          setGameWon(2);
         // resetBoard();
        }
      }
      setMyTurn(!myTurn);
    }, attackDelay);
  };

  return (
    <div className="App">
      {gameWon === null ? (
        <div>
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
          <LocationButton
            locationName={location.name}
            clickFunction={() => fetchMaster(location.url)}
            key={index}
          />
        ))
      ) : pokemonFound ? (
        <div>
          <PokemonEncounter
            photo={pokemonEncounter.sprites.other.dream_world.front_default}
            name={pokemonEncounter.name}
            health={chosenPokemonIndex !== null? pokemonEncounterHealth : pokemonEncounter.stats[0].base_stat}
          />
          {chosenPokemonIndex === null ? (
            chosenPokemon.map((pokemon, index) => (
              <PokemonsInventory
                pokemonName={pokemon.name}
                pokemonPhoto={pokemon.sprites.other.dream_world.front_default}
                key={index}
                chosenPokemonClick={() => chosenPokemonClickHandler(index)}
                attack={pokemon.stats[1].base_stat}
                health={pokemon.stats[0].base_stat}
                defense={pokemon.stats[2].base_stat}
              />
            ))
          ) : (
            <div>
              <ChosenPokemon
                pokemonName={chosenPokemon[chosenPokemonIndex].name}
                pokemonPhoto={
                  chosenPokemon[chosenPokemonIndex].sprites.other.dream_world
                    .front_default
                }
                health={chosenPokemonHealth}
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
      ): gameWon === 1 ? ( <WinGame 
        back = {resetBoard}
      />

      ):(<LoseGame 
        back = {resetBoard}
      />)
      } 
    </div>
  );
}

export default App;
