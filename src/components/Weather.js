'use strict';

var React           = require('react');
var $               = require('jquery');
var Config = require('../Utils/config');
var Moment          = require('moment');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      city: '',
      country: '',
      weekWeather: []
    };
  },
  getData: function (lat, lon) {    
    return $.get('data/2.5/forecast/daily?lat=' 
      + lat + '&lon=' + lon + '&APPID=' + Config.WEATHER_API_KEY() + '&units=metric&cnt=7');
  },
  updateState: function (lat, lon) {
    this.getData(lat, lon)
      .then(function(data) {
        if (this.isMounted()) {
          this.setState({
            city: data.city.name,
            country: data.city.country,
            weekWeather: data.list
          });
        }
      }.bind(this));      
  },  
  geolocationSearch: function () {    
    /// Successful geolocation
    var success = function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;      
      this.updateState(lat, lon);
    }.bind(this);
    var error = function (error) {
      if (error.message == 'User denied Geolocation')
      {
        alert('Please enable location services');
      } else {
        alert(error.message);
      }
    };
    
    /// Get the position
    navigator.geolocation.getCurrentPosition(success, error);
  },
  componentDidMount: function () {   
    this.geolocationSearch();
  },
  render: function() {
    return (        
      <WeatherContainer 
        weekWeather={this.state.weekWeather}
        country={this.state.country}
        city={this.state.city}/>
    );
  }
  
});

var WeatherContainer = React.createClass({  
  render: function() {
     return (
      <div className="week-container">   
        <span className="country">{this.props.city}{this.props.country ? `, ${this.props.country}` : null}</span> 
        <div className="week-all-days">
          {$.map(this.props.weekWeather, (weather, i) => {
            return <div key={i} className="week-one-day">
              <WeatherDetails data={weather} />
            </div>
          })}
        </div>      
      </div>
    )
  }  
});

var WeatherDetails = React.createClass({  
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getDayName: function() {
    var days = {
      sameDay: '[Today]',
      nextDay: 'dddd',
      nextWeek: 'dddd',
      lastDay: 'dddd',
      lastWeek: 'dddd'
    }    
    return (
      <div className="day">
        {Moment(this.props.data.dt * 1000).calendar(null, days)}
      </div>
    )
  },
  render: function() {
    var weather = this.props.data,
        timestamp = weather.dt,
        temperature = weather.temp.max,
        weatherType = weather.weather[0].description,
        weatherDescription = weather.weather[0].main,
        icon = 'wi wi-owm-' + weather.weather[0].id;
        //https://erikflowers.github.io/weather-icons/
    return ( 
      <div className="temperature-info">
        {this.getDayName()}
        <i className={icon}/>
        <span className="info">{this.capitalizeFirstLetter(weatherType)}</span>
        <div className="temperature">
          {Math.round(temperature)} °C          
        </div>        
      </div>
    )
  }
});

module.exports = Weather;