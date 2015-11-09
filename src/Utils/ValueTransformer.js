'use strict';

// A simple class to capture a one-way value transform function.
var ValueTransformer = function (transform) {
  this.func = (typeof transform === 'function') 
  ? transform 
  : function (value) { return value.toString ? value.toString() : value; }
};

// Transforms the input value according to the pre-defined transform function
ValueTransformer.prototype.getTransformedValue = function (value) {
  return this.func.call(null, value);
};

module.exports = ValueTransformer;