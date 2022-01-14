
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import './App.css';
import axios from 'axios'
import WeatherView from './component/WeatherView'

function App() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('DELHI');
  const apiKey = '6460e2062ab1cc982405845d1d72df8c';

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let res
    axios.get(url).then(response => {
      res = response
      setWeather({
        descp: res.data
      })
    })


  }, [city]);

  return (
    <div className="App">
      <header className="App-header">

        <TabView activeIndex={activeIndex} onTabChange={(e) => {
          setActiveIndex(e.index)
          setCity(e.originalEvent.currentTarget.innerText)
        }}>
          <TabPanel header="DELHI">
            <WeatherView weather={weather} />
          </TabPanel>
          <TabPanel header="MOSCOW">
            <WeatherView weather={weather} />
          </TabPanel>
          <TabPanel header="TOKYO">
            <WeatherView weather={weather} />
          </TabPanel>
        </TabView>


      </header>
    </div>
  );
}

export default App;
