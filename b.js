const spawn = require('child_process').spawn;

var listem=["a1.ts","a2.ts","a3.ts"];
var index=0;
var omx = require('omxdirector');
var mu;
var vu;
//next();
omx.on('stop', function(){next();});

function next(){

    omx.play(listem[index]);
    
    index++;
    index=index%3;
  
}
//ffmpeg -i a3.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts a3.ts
//ffmpeg -i "concat:a1.ts|a2.ts" -c copy -bsf:a aac_adtstoasc wer.mp4

  var soap = require('soap');
  var url = 'http://yayin.medya.istanbul/broadcast/wssignage.asmx?wsdl';
  var args = {name: 'value'};
  soap.createClient(url, function(err, client) {
      client.GetDate(args, function(err, result) {
          console.log(result);
      });
  });
