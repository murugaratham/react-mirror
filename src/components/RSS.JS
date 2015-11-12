'use strict';

var React            = require('react'),
    GetFeed          = require('../Utils/FetchRss'),
    $                = require('jquery'),
    ReactCSSTransitionReplace = require('react-css-transition-replace'),
    SetIntervalMixin = require('../Utils/mixin/SetIntervalMixin');

var Feed = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return { 
      feed: { 
        entries: [] 
      },
      currentFeed: 0
    };
  },
  showNextFeed: function () {
    var feedCount = this.state.feed.entries.length - 1;
    var currentFeed = this.state.currentFeed;
    if(currentFeed < feedCount) {
      currentFeed++;      
    } else {
      currentFeed = 0 //reset
    }   
    if (this.isMounted()) {
      this.setState({ currentFeed: currentFeed });
    } 
  },
  componentDidMount: function () {
    this.loadFeedFromServer();
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
    setInterval(this.showNextFeed, 5000);
  },
  loadFeedFromServer: function () {
    GetFeed(this.props.url, function (err, feed) {
      if (this.isMounted()) {
        this.setState({ feed: feed });
      }
    }.bind(this));
  },
  render: function () {
    //http://stackoverflow.com/a/25225016
    //http://stackoverflow.com/a/21875460/670514
    var haveFeed = this.state.feed.entries.length !== 0;
    var entry = this.state.feed.entries[this.state.currentFeed]; 
    var feed;
    if (haveFeed) {
      return (
        <span className="newsticker">
          <ReactCSSTransitionReplace transitionName="fade-wait" 
                                     overflowHidden={false}
                                     transitionEnterTimeout={1000} 
                                     transitionLeaveTimeout={400}>
            <FeedItem key={this.state.currentFeed} entry={entry}/>
          </ReactCSSTransitionReplace>
        </span>
      );
    } else {
      return <div/>
    }
  }
});

var FeedItem = React.createClass({
  rawHtml: function () { 
    return { __html: this.props.entry.content }
  },
  render: function () {   
    return (
      <div ref='feedItem'>
        <div>{this.props.entry.title}</div>
        <div dangerouslySetInnerHTML={this.rawHtml()} />
      </div>
    );
  }
});

module.exports = Feed;