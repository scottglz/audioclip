(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AudioClip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var audioContext = new window.AudioContext();
var speaker = audioContext.destination;


var AudioClip = function(url) {
   var request = new XMLHttpRequest();
   request.open("GET", url, true);
   request.responseType = "arraybuffer";
   this.readyPromise = new Promise(function(resolve, reject) {
      request.onload = function () {
         audioContext.decodeAudioData(request.response, function(buffer) {
            resolve(buffer);
         }, function() {
            reject("decodeAudioData error");
         });
      };
      request.onerror = function() {
         reject(this.statusText);
      };
   });
   
   request.send();
};

AudioClip.prototype = {
   
   accessBuffer: function(callback, error) {
      this.readyPromise.then(callback, error);
   },
   
   play: function(start, length) {
      this.accessBuffer(function(buffer) {
         var source = audioContext.createBufferSource();
         source.buffer = buffer; 
         source.connect(speaker);
         // Massage falsy params
         start = start || 0;
         length = length || buffer.duration - start;
         source.start(0, start, length);
      });
      return this;
   }
};

AudioClip.audioContext = audioContext;

module.exports = AudioClip;
},{}],2:[function(require,module,exports){
'use strict';

var TagAudioClip = function(url) {
   this.tag = document.createElement("audio");
   this.tag.preload = "auto";
   this.tag.src = url;
   document.body.appendChild(this.tag);
};

TagAudioClip.prototype = {
   play: function(start, length) {
      var tag = this.tag;
      // Massage falsy params
      start = start || 0;
      length = length || tag.duration - start;
      tag.currentTime = start;
      tag.play();
      if (length < tag.duration - start) {
         setTimeout(function() {
            tag.pause();
         }, length * 1000);
      }
   }
};

module.exports = TagAudioClip;
},{}],3:[function(require,module,exports){
'use strict';

var noop = function() {};

var NullAudioClip = function() {};
NullAudioClip.prototype = {
   accessBuffer: noop,
   play: noop
};

module.exports = NullAudioClip;
},{}],4:[function(require,module,exports){
'use strict';

var audioApiSupported = typeof AudioContext === "function" && 
   typeof Promise === "function" &&
   typeof new XMLHttpRequest().responseType === "string";
 
if (audioApiSupported) {
   module.exports = require("./audioclip-audio-api.js");
}
else {
   
   var audioTagSupported = !!document.createElement('audio').canPlayType;
   if (audioTagSupported) {
      module.exports = require("./audioclip-audio-tag.js");
      
   }
   else {
      module.exports = require("./audioclip-null.js");
   }   
}
},{"./audioclip-audio-api.js":1,"./audioclip-audio-tag.js":2,"./audioclip-null.js":3}]},{},[4])(4)
});