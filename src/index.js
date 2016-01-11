'use strict';

var audioApiSupported = typeof AudioContext === "function" && 
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