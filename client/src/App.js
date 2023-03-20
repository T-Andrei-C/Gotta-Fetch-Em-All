import './App.css';
import React, {useEffect, useState} from "react";
import ReadLocation from './Components/ReadLocation';

function  App() {
const  [locations,setLocation] = useState(null);
useEffect(()=>{
  async function  fetchLocation(){
    try {
      const response = await fetch("https://pokeapi.co/api/v2/location");
      const data = await response.json();
      console.log(data)
      setLocation(data.results);

  }
  
  catch (error) {
      console.error(error);
  } 
  }
  fetchLocation()
},[]) 
//console.log(locations);

  return (
    <div className="App">

    {locations && locations.map(location =>(
    <ReadLocation name = {location.name}
      key = {location.name}
    />
    ))}


    </div>
  );
}

export default App;
