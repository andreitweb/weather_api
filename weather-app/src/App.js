import React from 'react';
import './App.css';

import moment from 'moment/min/moment.min';

// Components
import Form from "./components/Form";

const APIKey = '7b9cd48c135743519b7158ef910b185d';
const APIPath = 'http://api.weatherbit.io/v2.0/forecast/daily';
const API_ICON_PATH = 'https://www.weatherbit.io/static/img/icons/';

class WeatherApp extends React.PureComponent{
  constructor(props){
    super(props);

    this.state = {
      data: [],
      city: '',
      error: '',
    }
  }

  getString = (city, days) => {
    return `${APIPath}${city ? `?city=${city}` : ''}${days ? `&days=${days}` : ''}&key=${APIKey}`;
  };

  onSubmit = (city, days) => {
    const url = this.getString(city, days);
    fetch(url)
        .then(res=>res.json())
        .then(res=>{
          this.setState({
              data: res.data,
              city: res['city_name'],
              error: ''
          });
        })
        .catch(error=>{
            this.setState({
                error: 'Wrong city name. Please try enter city name again.'
            })
        })
  };

  get date(){
      return this.state.data.map(day=>moment(day.datetime).format('dddd'));
  }

  render() {
    const {data, city, error} = this.state;
    const date = this.date;
    return  (
        <div className='weather'>
            <div className='weather__bg'>
                <div className='weather__img' style={{backgroundImage: 'url("images/cloudy.jpg")'}}>
                </div>
            </div>
            <div className='weather__form'>
                <Form onSubmit={this.onSubmit}/>
            </div>
            <div className='weather__content'>
                {error ?
                    <div className='alert alert-warning'>{error}</div> :
                    <div className='weather__list'>
                        {data.map((day, index)=>
                            <div key={index} className='weather__item'>
                                <div className='card weather__day weather__day_front'/>
                                <div className='card weather__day weather__day_back'>
                                    <div className='weather__day-header card-header'>
                                        <span className='font-weight-bold'>{date[index]}</span>
                                        <span className='weather__city'>{city}</span>
                                    </div>
                                    <div className='weather__day-body card-body'>
                                        <div className='weather__icon'>
                                            <img src={`${API_ICON_PATH}${day.weather.icon}.png`} alt={day.weather.description}/>
                                        </div>
                                        <div className='weather__day-data'>
                                            <div className='weather__temp'>
                                                <span>{Math.round(day['max_temp'])}&deg;</span>
                                                <span> / </span>
                                                <span>{Math.round(day['min_temp'])}&deg;</span>
                                            </div>
                                            <div className='weather__wind'>
                                                <img src="images/icons/wind.png" alt="Wind"/>
                                                <span>{Math.round(day['wind_spd'])} m/s</span>
                                            </div>
                                        </div>
                                        <div className='weather__day-data'>
                                            <div className='weather__temp weather__temp_feel'>
                                                <span>Feels Like: </span>
                                                <span>{Math.round(day['app_max_temp'])}&deg;</span>
                                                <span> / </span>
                                                <span>{Math.round(day['app_min_temp'])}&deg;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
  }
}

export default WeatherApp;
