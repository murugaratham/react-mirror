'use strict';

var Say = function (text){
  var utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

module.exports = Say;