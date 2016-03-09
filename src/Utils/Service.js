'use strict';
//https://github.com/prabirshrestha/reactjs-playground/blob/master/rss-feed/client/utils/feed.js
var $         = require('jquery'),
    Constants = require('./Constants');

var Service = (function() {
  var instance = {};

  instance.getFeed = function (feedUrl, callback) {  
    if(!/hr-pulsesubscriber.appspot.com/i.test(feedUrl)) {
      feedUrl = window.location.protocol 
      + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=150&callback=?&q=' 
      + encodeURIComponent(feedUrl);
    }
    return $.ajax({
      url: feedUrl,
      dataType: 'jsonp'
    });
  };

  instance.getWeather =  function (latlon, city) {
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=';
    yql += encodeURIComponent('select * from html where url=');
    yql += encodeURIComponent('"http://api.openweathermap.org/data/2.5/forecast/daily?');
    if(city)
      yql += encodeURIComponent('q=' + city + '&');
    else if (latlon)
      yql += encodeURIComponent('lat=' + latlon[0] + '&lon=' + latlon[1]);
    else 
      throw 'Please specify location in Constants.js';
    yql += encodeURIComponent('&APPID=' + Constants.Weather.ApiKey + '&units=metric&cnt=7"');
    yql += '&format=json&env=store';
    yql += encodeURIComponent('://datatables.org/alltableswithkeys');
    return $.get(yql);
  };

  return instance;
})();

module.exports = Service;