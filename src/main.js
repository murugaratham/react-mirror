'use strict';

var React             = require('react'),
    ReactDOM          = require('react-dom'),
    $                 = require('jquery'),
    moment            = require('moment'),
    Clock             = require('./components/Clock'),
    Calendar          = require('./components/Calendar'),
    Weather           = require('./components/Weather'),
    Say               = require('./components/Speech'),
    Feed              = require('./components/RSS'),
    ValueTransformer  = require('./Utils/ValueTransformer'),
    Constants         = require('./Utils/Constants');

//time transformer
var timeTransform = new ValueTransformer(function (date) {
  return moment(date).format(Constants.TIME_FORMAT);
});

//date transformer
var dateTransform = new ValueTransformer(function (date) {
  return moment(date).format(Constants.DATE_FORMAT);
});

//main app
var SmartMirror = React.createClass({
  displayName: 'SmartMirror',
  componentDidMount: function() {
    if(annyang) {
      var toggleWeather = function() {
        $('.weather').toggle();
      };
      var greetings = function(name) {
        Say('Hi ' + name + ', nice to meet you?');
      };
    }
    var commands = {
      '(hide) (show) weather': toggleWeather,
      'My name is *name': greetings
    };
    annyang.addCommands(commands);
    annyang.start();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-9">        
          <Calendar dateTransform={dateTransform}/>
          <Clock dateTransform={timeTransform}/>
          <Feeds />
        </div>   
        <div className="col-xs-3">
          <Weather pollInterval={Constants.WEATHER_INTERVAL}/>
        </div>
      </div>
    );
  }
});

var Feeds = React.createClass({
  displayName: 'Feeds',
  render: function() {
    return (
      <div className="feeds">
        <a href="https://www.yahoo.com/?ilc=401" target="_blank">
          <img src="https://poweredby.yahoo.com/white.png" width="134" height="29"/>
        </a>
        <Feed url={Constants.FEED_URL} pollInterval={Constants.FEED_INTERVAL}/>
      </div>
    )
  }
});

ReactDOM.render(
  <SmartMirror />, $('.container').get(0)
);