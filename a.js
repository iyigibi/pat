var listem=["a1.mp4","a2.mp4","a3.mp4"];
var index=0;
var omx = require('omxdirector');
next();
omx.on('stop', function(){next();});

function next(){
   omx.play(listem[index]);
  index++;
  index=index%3;
}


const wallpaper = require('wallpaper');
 
wallpaper.set('a.jpg').then(() => {
    console.log('done');
});
