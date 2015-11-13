'use strict';
var $                 = require('jquery'),
    Say               = require('../components/Speech');

var Jarvis = (function (text){
  var instance = {};
  
  instance.toggleWeather = function() {
    $('.weather').toggle();
  };
  instance.greetings = function(name) {
    Say('Hi ' + name + ', nice to meet you?');
  };

  var commands = {
    '(hide) (show) weather': instance.toggleWeather,
    'My name is *name': instance.greetings
  };

  var _init = function () {
    if(annyang) {
      annyang.addCommands(commands);
      annyang.start();
    }
  }  
  instance.init = function () {
    _init();
  };
  return instance;
})();

module.exports = Jarvis;