'use strict';

var React             = require('react'),
    ReactDOM          = require('react-dom'),
    $                 = require('jquery'),
    moment            = require('moment'),
    Clock             = require('./components/Clock'),
    Calendar          = require('./components/Calendar'),
    Weather           = require('./components/Weather'),
    Say               = require('./components/Speech'),
    Feed              = require('./components/RSS/YahooFeeds'),
    ValueTransformer  = require('./Utils/ValueTransformer');

//time transformer
var timeTransform = new ValueTransformer(function (date) {
  return moment(date).format('h:mm:ss a');
});

//date transformer
var dateTransform = new ValueTransformer(function (date) {
  return moment(date).format('dddd, MMMM D YYYY');
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
  displayName: 'Smart Mirror',
  render: function() {
    return (
      <div className="top">
        <Today />
        <Feeds />
        <div className="top-right">
          <div className="weather">
            <Weather />
          </div>
        </div>
      </div>
    );
  }
});

var Today = React.createClass({ 
  displayName: 'Today',
  render: function() {
    return (
      <div className="top-left">        
        <Calendar dateTransform={dateTransform}/>
        <Clock dateTransform={timeTransform}/>
      </div>      
    );
  }
});

var Feeds = React.createClass({
  displayName: 'Feeds',
  render: function() {
    return (
      <div className="top-left">
        <Feed url="http://news.yahoo.com/rss/" />
      </div>
    )
  }
});

ReactDOM.render(
  <SmartMirror />, $('.container').get(0)
);