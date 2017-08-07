var omx = require('omxdirector');
omx.play('a1.mp4');
omx.on('stop', function(){omx.play('a3.mp4');});
