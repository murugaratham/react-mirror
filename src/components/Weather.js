'use strict';

var React           = require('react'),
    moment          = require('moment'),
    $               = require('jquery'),
    SetIntervalMixin= require('../Utils/mixin/SetIntervalMixin'),
    Constants       = require('../Utils/Constants'),
    Jarvis          = require('../Utils/Jarvis'),
    Service         = require('../Utils/Service');


var Weather = React.createClass({
  mixins: [SetIntervalMixin],
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
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
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
  getInitialState: function () {
    var todayWeather = this.props.weekWeather.splice(0, 1)[0];
    return {
      weekWeather: this.props.weekWeather,
      todayWeather: todayWeather
    }
  },
  getIcon: function () {
    return 'wi wi-owm-' + this.state.todayWeather.weather[0].id + ' centericon k-widget';
  },
  render: function() {  
     return (
      <div className="maincage themecolor">
        <div className="bgimagecage">
          <div className="location">
            {this.props.city}{this.props.country ? `, ${this.props.country}` : null}
          </div>
          <span className="tempvalue">
            <i className={this.getIcon()}/>
          </span>
          <div className="todayweather">
            <TodayWeather weather={this.state.todayWeather}/>
          </div>
          <div className="dayscell themecolor">
          {
            this.state.weekWeather.map(function (weather, i) {
              return (
                <RemainingDaysWeather key={i} weather={weather} />
              )
            })
          }
          </div>
        </div>
      </div>
    )
  }
});

var TodayWeather = React.createClass({
  getInitialState: function () {
    var todayWeather = this.props.weather;
    return {
      max_temp: todayWeather.temp.max,
      min_temp: todayWeather.temp.min,
      weather_type: todayWeather.weather[0].main,
      humidity: todayWeather.humidity,
      wind_speed: todayWeather.speed,
      wind_degrees: 'wi wi-wind towards-'  + todayWeather.deg + '-deg'
    }
  },
  componentDidMount: function () {
    //should load a gif dynamically depending on weather condition (e.g. rain, sunny, windy, etc)
    $('body').append('<style>div.maincage::after{background: url(images/giphyfff.gif);');
  },
  render: function () {
    return (
       <div className="todayweatherinner">
        <div className="todayweathertxt">{this.state.weather_type}<b> | </b>
          <i className="icon-up-open arrowsupdown"></i>{Math.round(this.state.max_temp)}°C<b> | </b>
          <i className="icon-down-open arrowsupdown"></i>{Math.round(this.state.min_temp)}°C
        </div>
        <div className="todayweathertxt">
          <i className={this.state.wind_degrees}></i>{this.state.wind_speed}m/s<b> | </b>
          {this.state.humidity}<i className="wi wi-humidity"></i>
        </div>
      </div>
    );
  }
});

var RemainingDaysWeather = React.createClass({
  getInitialState: function () {
    var weather = this.props.weather;
    return {
      timestamp: weather.dt,
      morn_temp: weather.temp.morn,
      eve_temp: weather.temp.eve,
      night_temp: weather.temp.night,
      weather_type: weather.weather[0].main,
      humidity: weather.humidity,
      wind_speed: weather.speed,
      wind_degrees: 'wi wi-wind towards-'  + weather.deg + '-deg',
      id: weather.weather[0].id,
      day: this.getDay(),
      date: this.getDate()
    }
  },
  getIcon: function () {
    return 'wi wi-owm-' + this.state.id;
  },
  getDay: function () {
    return moment.unix(this.props.weather.dt).format('ddd');
  },
  getDate: function () {
    return moment.unix(this.props.weather.dt).format('MMM DD');
  },
  render: function () {
    return (
      <div className="daycol">{this.state.day}<br/>
        <span className="smalldate">{this.state.date}</span><br/>
        <i className={this.getIcon()}></i><br/>
        <i className="icon-sunrise"></i>{Math.round(this.state.morn_temp)}°<br/>
        <i className="icon-sun"></i>{Math.round(this.state.eve_temp)}°<br/>
        <i className="icon-moon"></i>{Math.round(this.state.night_temp)}°<br/>
      </div>
    );
  }
});

module.exports = Weather;