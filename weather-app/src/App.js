import React from 'react';
import './App.css';

// Components
import Form from "./components/Form";

const APIKey = '7b9cd48c135743519b7158ef910b185d';
const APIPath = 'http://api.weatherbit.io/v2.0/';

class WeatherApp extends React.PureComponent{
  constructor(props){
    super(props);

    this.state = {
      lang: 'ru',
      units: 'M', // Metrics (Celcius)
      days: '16', // Forecast days
      city: '',
      country: '',
      data: [],
    }
  }

  render() {
    return  (
      <div className='weather'>
        <div className='weather__header'>
          <div className='weather__form'>
            <Form/>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
