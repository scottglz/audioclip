'use strict';

var Promise = require('es6-promise-polyfill').Promise;

var TagAudioClip = function(url) {
   var tag = this.tag = document.createElement("audio");
   this.tag.preload = "auto";
   this.tag.src = url;
   
   this.promise = new Promise(function(resolve, reject) {
      tag.oncanplaythrough = function() {
         tag.oncanplaythrough = null;
         resolve(tag);   
      }; 
      tag.onerror = function(e) {
         reject(e);
      };
   });
   
   
   document.body.appendChild(this.tag);
};

TagAudioClip.prototype = {
   play: function(start, length) {
      this.readyPromise.then(function(tag) {
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
      });
   }
};

module.exports = TagAudioClip;