
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudShowersHeavy, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'



function WeatherView(props) {

  const rawdata = props.weather.descp?.list
  var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  rawdata && rawdata.forEach(element => {
    element.dt_txt = element.dt_txt.slice(0, 10);
    let dateTime = new Date(element.dt * 1000);
    element.dayName = days[dateTime.getDay()];
    console.log("element.dayName=======>", element.dayName)
  });

  const key = 'dayName';

  const finalData = [...new Map(rawdata && rawdata.map(item =>
    [item[key], item])).values()];


  useEffect(() => {


  }, []);
  const getIcon = (data) => {
    if (data['weather'][0]['main'] === 'Clouds') {
      return faCloud
    } else if (data['weather'][0]['main'] === 'Snow') {
      return faSnowflake
    } else if (data['weather'][0]['main'] === 'Clear') {
      return faSun
    } else {
      return faCloudShowersHeavy
    }
  }
  const getTempInCel = (KTemp) => {
    return  (KTemp -273.15).toFixed(2) + " °C"
  }
  return (
    finalData.length > 0 && <div className="waetherViewContainer">
      <div className="today">
        <div>Today</div>
        <div className="todayInfoContainer">
          <FontAwesomeIcon icon={getIcon(finalData[0])} />
          <div>
            <div className="temp">{getTempInCel(finalData[0]['main']['temp'])}</div>
            <div>{finalData[0]['weather'][0]['description'].replace(/\b(\w)/g, s => s.toUpperCase())}</div>
          </div>
        </div>
      </div>
      <div className="otherDayContainer">
        <div className="otherDay">
          <div>{finalData[1].dayName}</div>
          <FontAwesomeIcon icon={getIcon(finalData[1])} />
          <div className="temp2">{getTempInCel(finalData[1]['main']['temp'])}</div>
        </div>
        <div className="otherDay">
          <div>{finalData[2].dayName}</div>
          <FontAwesomeIcon icon={getIcon(finalData[2])} />
          <div className="temp2">{getTempInCel(finalData[2]['main']['temp'])}</div>
        </div>
        <div className="otherDay">
          <div>{finalData[3].dayName}</div>
          <FontAwesomeIcon icon={getIcon(finalData[3])} />
          <div className="temp2">{getTempInCel(finalData[3]['main']['temp'])}</div>
        </div>
        <div className="otherDay">
          <div>{finalData[4].dayName}</div>
          <FontAwesomeIcon icon={getIcon(finalData[4])} />
          <div className="temp2">{getTempInCel(finalData[4]['main']['temp'])}</div>
        </div>
      </div>

    </div>
  );
}

export default WeatherView;
