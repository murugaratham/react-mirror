'use strict';

var React     = require('react'),
    Constants = require('../Utils/Constants'),
    moment    = require('moment');

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
    return moment(this.state.date).format(Constants.Calendar.Formats.Date);
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