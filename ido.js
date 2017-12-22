const spawn = require('child_process').spawn;

var listem=["a1.ts","a2.ts","a3.ts"];
var index=0;
var omx = require('omxdirector').enableNativeLoop();
var mu;
var vu;
var ilkkez=true;
var kez=0;
//next();
omx.on('stop', function(){
	//next();
});
var path = require('path'); 
function next(){
	console.log("oynatılıyor "+listem[0]);
	
    omx.play(listem, {loop: true});
    //Go();
    index++;
    index=index%listem.length;
  
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
}, 50000 * 1000);  




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
				timeout: 5000,
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


var downloadcount;
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
		     		//var gorevsayisi=tl_.length;
		   		 var gorevsayisi=4;
		     		var gorevler=[];
					downloadcount=0;
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
							i: i
						
						};
					gorevler.push(options);
					
					if (path.existsSync(options.directory+options.filename)) { 
					  console.log("dosya var "+i+"/"+gorevsayisi-1);
					  
					  if(gorevsayisi == (i+1) && downloadcount==0){
								offset=0;
								convertAll(gorevler);
							   }
					} else {
					//////////////////////////////////////////////////////////
					console.log("dosya İNDİİİR "+i+"/"+gorevsayisi);
					downloadcount++;
						download(url, options, function(err){
						    
							downloadcount--;
							console.log(err +"---"+url);
						    console.log("meoww "+downloadcount);
							if(err){
								gorevler.splice(options.i, 1);
							}
							if(downloadcount == 0){
								offset=0;
								convertAll(gorevler);
							   }
						}) 						
					}
				}
             });
      });
}
var offset;
function convertAll(gorevler){
listem=[];
		console.log('gorev başladı');
		for(var lp=0;lp<gorevler.length;lp++){
			listem.push(gorevler[lp].directory+gorevler[lp].filename);
			console.log('gorev eklendi '+gorevler[lp].directory+gorevler[lp].filename);
			
		}
		next();	
	
}
