var SetIntervalMixin = {
  componentWillMount: function() {
    this._intervals = [];
  },
  setInterval: function() {
    this._intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this._intervals.forEach(clearInterval);
  }
};