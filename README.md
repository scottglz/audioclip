# Audioclip

Easily load and play (over and over again if you like) all or part of short(ish) audio files in the browser. 

Uses the Web Audio API when available (which supports precise play length and multiple instances of the
same sound playing at once), otherwise falls back to HTML5 &lt;audio&gt; tags. If those aren't available either
(Internet Explorer 8 and below, basically), a graceful degredation to silence occurs.

# API

```javascript
var clip = new AudioClip(url); // Load the clip

clip.play(); // Play entire clip

clip.play(start_time_in_seconds);  // Play clip from start time to end

clip.play(start_time_in_seconds, duration_in_seconds); // Play clip from start time to start time + duration
```

# Licence

MIT