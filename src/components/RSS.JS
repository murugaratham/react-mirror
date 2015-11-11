'use strict';

var React       = require('react'),
    GetFeed     = require('../Utils/FetchRss'),
    $           = require('jquery')

var Feed = React.createClass({
    getInitialState: function () {
        return { feed: { entries: [] } };
    },
    componentDidMount: function() {
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
            <ul id="js-news" className="js-hidden">
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
      <li className="news-item">
        <div> {this.props.entry.title} </div>       
      </li>
    );
  }
});

module.exports = Feed;