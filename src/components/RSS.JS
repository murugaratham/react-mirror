'use strict';

var React       = require('react'),
    GetFeed     = require('../Utils/FetchRss'),
    $           = require('jquery'),
    tweenState  = require('react-tween-state');

var Feed = React.createClass({
  getInitialState: function () {
    return { 
      feed: { 
        entries: [] 
      },
      currentFeed: {}
    };
  },
  randomNumber: function () {
    return Math.floor(Math.random() * (this.state.feed.entries.length - 0)) + min;
  },
  displayRandomEntry: function () {
    
  },
  componentDidMount: function () {
    this.loadFeedFromServer();
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
    setTimeout(function() {
      setInterval(this.displayRandomEntry(), 5000);
    }, 5000);
  },
  loadFeedFromServer: function () {
    GetFeed(this.props.url, function (err, feed) {
      if(err) return alert('error loading feed');
      if (this.isMounted()) {
        this.setState({ feed: feed });
      }
    }.bind(this));
  },
  render: function () {
    return (
      <span className="newsticker" ref="feeds">
          return <FeedItem />
      </span>
    );
  }
});

var FeedItem = React.createClass({
  render: function () {
    return (
      <div>{this.props.entry.title}</div>
    );
  }
});

module.exports = Feed;