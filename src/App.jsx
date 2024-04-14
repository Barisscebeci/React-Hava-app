import { useState } from "react";
import "./App.css";

const api = {
  key: "8da416c57620407d91461f2664fbbcfc",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Hava Durumu</h1>
        <div>
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {typeof weather.main != "undefined" ? (
               <div>
               <p>{weather.name}</p>
               <p>{weather.main.temp}*C</p>
               
                 <p>{weather.weather[0].main}</p>
                 <p>({weather.weather[0].descriptions})</p>
               </div>
        ): (
        "" 
        )}
 
      </header>
    </div>
  );
}

export default App;
