'use strict';
//https://github.com/prabirshrestha/reactjs-playground/blob/master/rss-feed/client/utils/feed.js
var $ = require('jquery');
var GetFeed = function (feedUrl, callback) {  
  if(!/hr-pulsesubscriber.appspot.com/i.test(feedUrl)) {
    feedUrl = window.location.protocol 
    + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=150&callback=?&q=' 
    + encodeURIComponent(feedUrl);
  }
  $.ajax({
    url: feedUrl,
    dataType: 'jsonp',
    success: function(res) {
      callback(null, res.responseData.feed);
    }
  });
}
module.exports = GetFeed;