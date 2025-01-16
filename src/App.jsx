import { useState } from 'react'
import './App.css'
import { use } from 'react';


function Weather(){

  const [count, setCount] = useState(0);
  const [city,setCity] = useState("");
  const [latitude,setLat] = useState(0);
  const [longitude,setLon] = useState(0);
  const [icon,setIcon] = useState("");
  const [description,setDescription] = useState("");
  const [humidity,setHumidity] = useState(0);
  const [cityFound,setCityFound] = useState(false);
  
  async function getWeather(e){
    try{
      let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8187f17d75cd406b11a6f1e75356931`);
      const data = await url.json();
      if(data.cod==="404"){
        setCityFound(false);
      }
      setCityFound(true);
      setIcon(data.weather[0].icon);
      // setCity(cityname);
      setLat(data.coord.lat );
      setLon(data.coord.lon);
      setDescription(data.weather[0].description);
      setHumidity(data.main.humidity);
    }
    catch(e){
      setCityFound(false);
        setLat(0);
        setLon(0);
        setIcon('');
        setDescription('');
        setHumidity(0);
    }
  }

  function pressEnter(e){
    if(e.key==="Enter"){
      getWeather();
    }
  };

  return(
  <div className='weatherBody'>
    
    <h2 style={{textAlign:'center',paddingTop:'20px',color:'white'}}>Check climate &#x2600;</h2>
    <div className="weather">
      <div className="form">
        <input type="text" placeholder='enter the city ' onChange={(e)=> setCity(e.target.value)}/>
        <button onClick={()=>getWeather()} >check</button>
      </div>
      <div className='values'>
        {!cityFound ?(
          <h3>city not found</h3>
        ):(<>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather Icon"
          />
          <div>
            <h4>Latitude: {latitude}</h4>
            <h4>Longitude: {longitude}</h4>
          </div>
          <h4>Description: {description}</h4>
          <h4>Humidity: {humidity}</h4>
        </>)}
      </div>
    </div>
  </div>
  );
}

function App() {

  return (
    <>
      <Weather/>
      {/* <button onClick={changeWeather}>click me</button> */}
    </>
  )
}

export default App
