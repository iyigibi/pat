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
const readline = require('readline');
var download = require('download-file');
  var soap = require('soap');
var child_process = require('child_process');

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


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



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
				var tl_=pp.diffgram.NewDataSet.TimeLine;
		     		var gorevsayisi=tl_.length;
		     		var gorevler=[];
				for(var i=0;i<gorevsayisi;i++){
					var sstr=tl_[i].UPLOAD_PATH;
					//console.log("buu");
					//console.log("http://yayin.medya.istanbul/broadcast/upload/"+sstr.substring(0,sstr.lastIndexOf("."))+"_720p.mp4");
					var url__=sstr.substring(0,sstr.lastIndexOf("."));
					
					var url = "http://yayin.medya.istanbul/broadcast/upload/"+url__+"_720p.mp4";
					//var tt_=url.replace(/\//g, '_')
					var int_=url__.lastIndexOf('/');
					var fname_=url__.substring(int_+1)+".mp4";
					var dir__=url__.substring(0,int_+1);
					console.log("buu "+fname_+" "+dir__);
						var options = {
						    directory: "vids/"+dir__,
						    filename: fname_,
						
						};
					gorevler.push(options);
						download(url, options, function(err){
						    if (err) throw err
							gorevsayisi--;
						    console.log("meow "+gorevsayisi);
							if(gorevsayisi == 0){
								offset=0;
								convertAll(gorevler);
							   }
							/*
										
							*/
						}) 
				}
				
             });
      });
}
var offset;
function convertAll(gorevler){
	
		var options=gorevler[offset];
		console.log('gorev ' + options.directory+""+options.filename);
					//'-c', 'copy', '-bsf:v', 'h264_mp4toannexb',
				var args_ = ['-y','-i', options.directory+options.filename,'-c', 'copy', '-bsf:v', 'h264_mp4toannexb', '-bsf:a', 'aac_adtstoasc', '-f','mpegts',options.directory+options.filename+".ts"];
				var ffmpeg = spawn('ffmpeg', args_);
				console.log('Spawning ffmpeg ' + args_.join(' '));
				ffmpeg.on('exit',  function (data) {
				console.log('grep exit: ' + data);
					offset++;
					if(offset<gorevler.length){
						convertAll(gorevler,offset);
					}else{
						birlestir(gorevler);	
					}
				});
				ffmpeg.stderr.on('data', function (data) {
					console.log('grep stderr: ' + data);
				});
		
		
		
	
}

function birlestir(gorevler){
	
	//ffmpeg -i "concat:a1.ts|a2.ts" -c copy -bsf:a aac_adtstoasc wer.mp4
	var strgorevler="concat:";
	for(var i=0;i<gorevler.length;i++){
		strgorevler+=gorevler[i].directory+gorevler[i].filename+".ts|";
	}
	
	var args_ = ['-y','-i', strgorevler,'-c', 'copy', '-f','mp4','wwwwww.mp4'];
				var ffmpeg = spawn('ffmpeg', args_);
				console.log('BOSS ffmpeg ' + args_.join(' '));
				ffmpeg.on('exit',  function (data) {
				console.log('BOSS exit: ' + data);
					
				});
				ffmpeg.stderr.on('data', function (data) {
					console.log('BOSS stderr: ' + data);
				});
	
}

