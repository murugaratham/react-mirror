'use strict';

var React           = require('react'),
    Moment          = require('moment'),
    $               = require('jquery'),
    Constants       = require('../Utils/Constants'),
    Jarvis          = require('../Utils/Jarvis'),
    Service         = require('../Utils/Service');


var Weather = React.createClass({
  getInitialState: function () {
    return {
      city: '',
      country: '',
      weekWeather: []
    };
  },
  updateState: function (latlon, city) {
    var self = this;
    Service.getWeather(latlon, city).then(function(data) {
      var result = $.parseJSON(data.query.results.body);
      if (self.isMounted()) {
        self.setState({
          city: result.city.name,
          country: result.city.country,
          weekWeather: result.list
        });
      }
    });
  },  
  geolocationSearch: function () {
    var success = function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      this.updateState([lat, lon]);
    }.bind(this);
    var error = function (error) {
      var latlon = Constants.Weather.DefaultLocation;
      var city = Constants.Weather.DefaultCity;
      if(city)
      this.updateState(latlon, city);
    }.bind(this);
    navigator.geolocation.getCurrentPosition(success, error);
  },
  componentDidMount: function () { 
    this.geolocationSearch();
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
  },
  render: function() {
    if(this.state.weekWeather.length !== 0)
    {
      return (
        <WeatherContainer weekWeather={this.state.weekWeather}
                          country={this.state.country}
                          city={this.state.city}/>
      );
    } else {
      return <div/>
    }
  }  
});

var WeatherContainer = React.createClass({
  render: function() {
  var todayWeather = this.props.weekWeather[0],
      timestamp = todayWeather.dt,
      max_temp = todayWeather.temp.max,
      min_temp = todayWeather.temp.min,
      weather_type = todayWeather.weather[0].main,
      humidity = todayWeather.humidity,
      wind_speed = todayWeather.speed,
      icon = 'wi wi-owm-' + todayWeather.weather[0].id + ' centericon k-widget',
      wind_degrees = 'wi wi-wind towards-'  + todayWeather.deg + '-deg';
     return (
      <div className="maincage themecolor">
        <div className="bgimagecage">
          <div className="location">
            {this.props.city}{this.props.country ? `, ${this.props.country}` : null}
          </div>
          <span className="tempvalue">
            <i className={icon}/>
          </span>
          <div className="todayweather">
            <div className="todayweatherinner">
              <div className="todayweathertxt">{weather_type}<b> | </b>
                <i className="icon-up-open arrowsupdown"></i>{Math.round(max_temp)}°c<b> | </b>
                <i className="icon-down-open arrowsupdown"></i>{Math.round(min_temp)}°c
              </div>
              <div className="todayweathertxt">
                <i className={wind_degrees}></i>{wind_speed}<b> | </b>
                {humidity}<i className="wi wi-humidity"></i>
              </div>
            </div>
          </div>
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