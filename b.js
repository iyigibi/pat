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
      Go();
  });

setInterval(function(){
  client.GetDate(args, function(err, result) {
          //console.log(result.GetDateResult);
      });
}, 5 * 1000);  




var fs = require('fs');
var filename="my_file.txt";
var message="OK";
///
console.log('\033c');
///
function Go(){
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) {
      
         rl.question('Signage isimini giriniz : ', (answer) => {
                rl.question('Kullanıcı adı giriniz : ', (answer2) => {
                        rl.question('Şifre giriniz : ', (answer3) => {
                            var args2 = {DeviceName: answer,
                                username: answer2,
                                password: answer3,
                                token: "asdasd"};
                                  client.RegisterDevice(args2, function(err, result) {
                                      message=result.RegisterDeviceResult;
                                      var stream = fs.createWriteStream(filename);
                                        stream.once('open', function(fd) {
                                            stream.write(JSON.stringify(args2));
                                            stream.end();
                                            args=args2;
                                            loginIt();
                                        });
                                  });
                            rl.close();
                    });
                });
        });
  }else{
        args=JSON.parse(data);
        loginIt();
  }
});
};
///////////////

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var xsd = require('xsd');

function loginIt(){
    console.log("login");
    var arg_={username: args.username,
    pwd: args.password};
    client.UserLogin(arg_, function(err, result) {
          console.log(result.UserLoginResult);
            arg_={DeviceName: args.DeviceName,
                  Authkey: result.UserLoginResult,
                  token: args.token};
             client.GetPlayList(arg_, function(err, result) {
                 var pp=result.GetPlayListResult;
                 var json = xsd.stringToFlatJSON(pp.shema,function(errors, obj ){
                                              // do stuff with the object.
                                            });
                console.log(pp);
             });
      });
}

