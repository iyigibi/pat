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
var client;
  soap.createClient(url, function(err, client_) {
      client=client_;
      
  });

setInterval(function(){
  client.GetDate(args, function(err, result) {
          console.log(result.GetDateResult);
      });
}, 5 * 100000);  



var fs = require('fs');
var filename="my_file.txt";
var message="OK";

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) {
         rl.question('Signage isimini giriniz : ', (answer) => {
            //console.log(`wwww : ${answer}`);
             var name_=answer;
        });
      rl.question('Şifre giriniz : ', (answer) => {
            var pass_=answer;
            rl.close();
        });
/*
      client.RegisterDevice(args, function(err, result) {
          console.log(result.GetDateResult);
      });
  */    
            var stream = fs.createWriteStream(filename);
            stream.once('open', function(fd) {
                stream.write(message);
                stream.end();
            });
  }else{
    if(data==message){
          console.log(data);
    }else{
          console.log(data);
    }
  }
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




