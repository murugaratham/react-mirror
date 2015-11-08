'use strict';

var React             = require('react');
var ReactDOM          = require('react-dom');
var $                 = require('jquery');
var moment            = require('moment');
var Clock             = require('./components/Clock');
var Calendar          = require('./components/Calendar');
var Weather           = require('./components/Weather');
var Say               = require('./components/Speech');
var ValueTransformer  = require('./Utils/ValueTransformer');

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
  componentDidMount: function() {
    if(annyang) {
      var toggleWeather = function() {
        $('.weather').toggle();
      };
      var greetings = function(name) {
        Say('Hi ' + name + ', nice to meet you!');
      };
    }
    var commands = {
      '(hide) (show) weather': toggleWeather,
      'My name is *name': greetings
    };
    annyang.debug();
    annyang.addCommands(commands);
    annyang.start();
  },
  displayName: 'Smart Mirror',
  render: function() {
    return (
      <div className="top">
        <Today />
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

ReactDOM.render(
  <SmartMirror />, $('#container').get(0)
);