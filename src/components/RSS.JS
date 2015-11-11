'use strict';

var React       = require('react'),
    GetFeed     = require('../Utils/FetchRss'),
    $           = require('jquery')

var Feed = React.createClass({
    getInitialState: function () {
        return { 
          feed: { 
            entries: [] 
          }, 
          isWithinViewPort: false
        };
    },
    componentDidMount: function () {
      this.loadFeedFromServer();
      setInterval(this.loadFeedFromServer, this.props.pollInterval);
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
        <ul className="newsticker" ref="feeds">
            {this.state.feed.entries.map(function (entry, i) {
                return <FeedItem key={i} entry={entry} />
            })}
        </ul>
      );
    }
});

var FeedItem = React.createClass({
  render: function () {
    return (
      <li>{this.props.entry.title}</li>
    );
  }
});

module.exports = Feed;