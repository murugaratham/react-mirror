'use strict';

var React                     = require('react'),    
    $                         = require('jquery'),
    moment                    = require('moment'),
    ReactBS                   = require('react-bootstrap'),
    ReactCSSTransitionReplace = require('react-css-transition-replace'),
    Jarvis                    = require('../Utils/Jarvis'),
    SetIntervalMixin          = require('../Utils/mixin/SetIntervalMixin'),
    Constants                 = require('../Utils/Constants'),
    GetFeed                   = require('../Utils/FetchRss'),
    Say                       = require('./Speech'),
    ButtonToolbar             = ReactBS.ButtonToolbar,
    Button                    = ReactBS.Button,
    Modal                     = ReactBS.Modal;

var Feed = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return { 
      feed: { 
        entries: [] 
      },
      currentFeed: 0,
      showDialog: false
    };
  },
  updateState: function (obj) {
    if (this.isMounted()) {
      this.setState(obj);
    }
  },
  startRotateFeed: function () {
    this.feedInterval = setInterval(this.displayNextFeed, Constants.Feed.AppearDuration);
  },
  pauseRotateFeed: function () {    
    clearInterval(this.feedInterval);
  },
  componentDidMount: function () {
    this.loadFeedFromServer();
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
    this.startRotateFeed();
    Jarvis.addCommands('wait', this.showModal);
    Jarvis.addCommands('read for me', this.readCurrentArticle);
  },
  getCurrentFeed: function () {
    return this.state.feed.entries[this.state.currentFeed];
  },
  displayNextFeed: function () {
    var feedCount = this.state.feed.entries.length - 1;
    var currentFeed = this.state.currentFeed;
    if(currentFeed < feedCount) {
      currentFeed++;
    } else {
      currentFeed = 0 //reset
    }   
    this.updateState({currentFeed: currentFeed});
  },
  loadFeedFromServer: function () {
    GetFeed(this.props.url, function (err, feed) {
      this.updateState({ feed: feed });
    }.bind(this));
  },
  handleClick: function () {
    this.readCurrentArticle();
  },
  showModal: function (cb) {
    this.updateState({ show: true });
    this.pauseRotateFeed();
  },
  hideModal: function () {    
    this.updateState({ show: false });
    this.startRotateFeed();
  },
  readCurrentArticle: function () {
    this.showModal();
    var feed = this.getCurrentFeed();
    console.log($(feed.content).not('style').not('script').text());
    Say($(feed.content).not('style').text());
  },
  rawHtml: function () {
    var feed = this.getCurrentFeed();
    return {
      __html: feed.content
    };
  },
  render: function () {
    var entry = this.getCurrentFeed();
    if (entry) {
      return (
        <div className="newsticker" onClick={this.handleClick}>
          <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">             
            <Modal.Body>
              <h2>{entry.title}</h2>
              <strong>by {entry.author}</strong><span className="divider">|</span><span>{entry.publishedDate}</span>
              <div className="article" dangerouslySetInnerHTML={this.rawHtml()} />
            </Modal.Body>
          </Modal>
          <ReactCSSTransitionReplace transitionName="fade-wait" 
                                     overflowHidden={false}
                                     transitionEnterTimeout={Constants.Feed.FadeTransitionInterval.Enter} 
                                     transitionLeaveTimeout={Constants.Feed.FadeTransitionInterval.Leave}>
            <FeedItem key={this.state.currentFeed} entry={entry} />
          </ReactCSSTransitionReplace>
        </div>
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
  getTimeago: function () {
    return moment.unix(this.props.entry.publishedDate_timestamp).fromNow();
  },
  render: function () {
    return (
      <div data-link={this.props.entry.link}>
        <h3>{this.props.entry.title}</h3>
        <div>{this.props.entry.contentSnippet} </div>
        <div>{this.getTimeago()}</div>
      </div>
    );
  }
});

module.exports = Feed;
