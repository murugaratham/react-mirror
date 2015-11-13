'use strict';

var React     = require('react'),
    Constants = require('../Utils/Constants'),
    moment    = require('moment');

var Clock = React.createClass({
  getInitialState: function() {
    return { time: new Date() };
  },
  componentDidMount: function() {
    this.start();
  },
  start: function() {
    var self = this;
    (function tick() {
      self.setState({ time: new Date() });
      requestAnimationFrame(tick);
    }());
  },
  getTime: function () {
    return moment(this.state.time).format(Constants.Calendar.Formats.Time);
  },
  render: function() {
    return(
      <div className="time">
        {this.getTime()}
      </div>
    )
  }
});

module.exports = Clock;