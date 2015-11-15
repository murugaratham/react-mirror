'use strict';
var $                 = require('jquery'),
    Say               = require('../components/Speech');

var Jarvis = (function (){
  var instance = {};
  
  instance.introduction = function(name) {
    console.log('Hi Gary');
    Say('Hi ' + name + ', nice to meet you');
    //todo: store user's name..
  };

  instance.addCommands = function (text, func) {
    var command = {};
    command[text] = func;
    annyang.addCommands(command);
    console.debug(command);
  }

  var _init = function () {
    if(annyang) {
      instance.addCommands('i am *name', instance.introduction);
      annyang.debug(true);
      annyang.start();
    }
  }

  instance.init = function () {
    _init();
    Say('Greetings, how may i address you?');
  };

  instance.pause = function () {
    annyang.pause();
  }

  instance.resume = function () {
    annyang.resume();
  }

  instance.shutUp = function () {
    speechSynthesis.cancel();
  }

  
  return instance;
})();

module.exports = Jarvis;