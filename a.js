const exec = require('child_process').exec;

var listem=["a1.mp4","a2.mp4","a3.mp4"];
var index=0;
var omx = require('omxdirector');
next();
omx.on('stop', function(){next();});

function next(){
  exec('pqıv -t -f -i a.jpg', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
     omx.play(listem[index]);
    index++;
    index=index%3;
});

  
  
}

