'use strict';

var Promise = require('es6-promise-polyfill').Promise;

var noop = function() {};

var NullAudioClip = function() {};
NullAudioClip.prototype = {
   accessBuffer: noop,
   play: noop,
   promise: Promise.resolve()
};

module.exports = NullAudioClip;