var listem=["a1.mp4","a2.mp4","a3.mp4"];
var index=0;
var omx = require('omxdirector');
next();
omx.on('stop', function(){next();});

function next(){
  //omx.play(listem[index]);
  index++;
  index=index%3;
}

const exec = require('child_process').exec;
exec('ffmpeg -i '+listem[index]+' -vf select="eq(n,LAST_FRAME_INDEX)" -vframes 1 LAST_FRAME.PNG', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
});
