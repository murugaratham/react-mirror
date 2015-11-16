'use strict';

var React           = require('react'),
    Moment          = require('moment'),
    $               = require('jquery'),
    Constants       = require('../Utils/Constants'),
    Jarvis          = require('../Utils/Jarvis');

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
      + lat + '&lon=' + lon + '&APPID=' + Constants.Weather.ApiKey + '&units=metric&cnt=7');
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
    var latlon = Constants.Weather.DefaultLocation;
    var lat = latlon[0];
    var lon = latlon[1];
    var success = function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      this.updateState(lat, lon);
    }.bind(this);
    var error = function (error) {
      console.log('There was an error getting your position:' + error);
      //this.updateState(lat, lon);
    }.bind(this);
    navigator.geolocation.getCurrentPosition(success, error);
  },
  componentDidMount: function () { 
    this.geolocationSearch();
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
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
        <span className="country">{this.props.city}{this.props.country ? ', ${this.props.country}' : null}</span> 
        <div className="week-all-days">
          {this.props.weekWeather.map(function (weather, i) {
            return (
              <div key={i} className="week-one-day">
                <WeatherDetails data={weather} />
              </div>
            )
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