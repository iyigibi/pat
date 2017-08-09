const spawn = require('child_process').spawn;

var listem=["b1.mp4","b2.mp4","b3.mp4"];
var index=0;
var omx = require('omxdirector');
var mu;
var vu;
next();
omx.on('stop', function(){next();});

function next(){

    omx.play(listem[index]);
    index++;
    index=index%3;
 
  
}

