'use strict';

var Promise = require('es6-promise-polyfill').Promise;

var audioContext = new window.AudioContext();
var speaker = audioContext.destination;


var AudioClip = function(url) {
   var request = new XMLHttpRequest();
   request.open("GET", url, true);
   request.responseType = "arraybuffer";
   this.promise = new Promise(function(resolve, reject) {
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
      this.promise.then(callback, error);
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