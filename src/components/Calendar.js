'use strict';

var React            = require('react'),
    ValueTransformer = require('../Utils/ValueTransformer');

var Calendar = React.createClass({
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
  getDate: function () {
    return this.props.dateTransform.getTransformedValue(this.props.date);
  },
  render: function() {
    return(
      <div className="date grey">
        {this.getDate()}
      </div>
    )
  }
});

module.exports = Calendar;