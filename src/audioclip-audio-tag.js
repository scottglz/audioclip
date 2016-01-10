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