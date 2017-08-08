const spawn = require('child_process').spawn;

var listem=["a1.mp4","a2.mp4","a3.mp4"];
var index=0;
var omx = require('omxdirector');
var mu;
var vu;
next();
//omx.on('stop', function(){next();});

function next(){

    mu=spawn('omxplayer', [listem[index]]);
    mu.on('close', (code) => {
        mu.kill();
        next();
    });
    index++;
    index=index%3;
 
  
}

