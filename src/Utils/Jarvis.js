'use strict';
var $                 = require('jquery'),
    Say               = require('../components/Speech');

var Jarvis = (function (text){
  var instance = {};
  
  instance.introduction = function(name) {
    Say('Hi ' + name + ', nice to meet you');
    //todo: store user's name..
  };

  // instance.addCommands = function (text, func) {
  //   var command = text[func];
  //   annyang.addCommands(command);
  //   console.debug(command);
  // }

  var _init = function () {
    if(annyang) {
      annyang.addCommands('(My name is) (I am) *name', instance.introduction);
      annyang.debug(true);
      annyang.start();
    }
  }  

  instance.init = function () {
    _init();
    Say('Greetings, how may i address you?');
  };
  return instance;
})();

module.exports = Jarvis;