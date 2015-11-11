var React       = require('react'),
    FeedItem    = require('./FeedItem'),
    GetFeed     = require('../../Utils/FetchRss.js');

var Feed = React.createClass({
    getInitialState: function () {
        this.loadFeedFromServer();
        return { feed: { entries: [] } };
    },
    loadFeedFromServer: function () {
        GetFeed(this.props.url, function (err, feed) {
            if(err) return alert('error loading feed');
            this.setState({ feed: feed });
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                {this.state.feed.entries.map(function (entry, i) {
                    return <FeedItem key={i} entry={entry} />
                })}
            </div>
        );
    }
});

module.exports = Feed;