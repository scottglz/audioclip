'use strict';

var noop = function() {};

var NullAudioClip = function() {};
NullAudioClip.prototype = {
   accessBuffer: noop,
   play: noop
};

module.exports = NullAudioClip;