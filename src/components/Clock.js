'use strict';

var React = require('react'),
    ValueTransformer = require('../Utils/ValueTransformer');

var Clock = React.createClass({
  getInitialState: function() {
    return { date: new Date() };
  },
  componentDidMount: function() {
    this.start();
  },
  start: function() {
    var self = this;
    (function tick() {
      self.setState({ date: new Date() });
      requestAnimationFrame(tick);
    }());
  },
  getTime: function () {
    return this.props.dateTransform.getTransformedValue(this.props.date);
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