import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // Başlangıçta tam dosya yolu ile başlayın.
  const [backgroundImage, setBackgroundImage] = useState('/assets/Arkaplan.jpg'); 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6b45ec28e633a07e3038b51c69990578&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        updateBackground(response.data.name); // Arka planı güncelleme fonksiyonunu çağır
      });
      setLocation("");
    }
  };

  const updateBackground = (locationName) => {
    // İlçeye göre arka plan resmini güncelle
    if (locationName.toLowerCase() === "biga") {
      setBackgroundImage('/assets/resim.jpg'); // Biga için özel arka plan resmi
    } else {
      setBackgroundImage('/assets/Arkaplan.jpg'); // Varsayılan arka plan resmi
    }
  };

  const translateWeather = (weatherCondition) => {
    const conditions = {
      Clear: "Açık",
      Clouds: "Bulutlu",
      Rain: "Yağmurlu",
      Snow: "Karlı",
      Mist: "Sisli",
      Smoke: "Dumanlı",
      Haze: "Puslu",
      Dust: "Tozlu",
      Fog: "Sisli",
      Sand: "Kumlu",
      Ash: "Kül",
      Squall: "Sağanak",
      Tornado: "Kasırga",
      Drizzle: "Çiseleyen Yağmur",
      Thunderstorm: "Gök Gürültülü Fırtına",
    };

    return conditions[weatherCondition] || weatherCondition;
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Lütfen Şehir Adı Giriniz"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1 className="bold">{data.main.temp.toFixed()} °C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="bold">{translateWeather(data.weather[0].main)}</p>
            ) : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Hissedilen</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold"> {data.main.humidity}%</p>
              ) : null}
              <p>Nem Oranı</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Rüzgar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
