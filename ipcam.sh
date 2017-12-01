##Assign location of this script to variable
##Used to restart script after connection is lost
Script=/home/USER/ipcam.sh

xterm -fullscreen -fg black -bg black -e omxplayer -b --live rtmp://wowza.istweb.tv/dp/fs

##Find PID of omxplayer.bin
#The brackets "[ ]" around the n prevent grep from returning itself
#in the results of the ps command
PID=$(ps ax | grep omxplayer.bi[n] | cut -d' ' -f2)
echo "PID = $PID"

##Loop to test if connection is present every 60 seconds
while [ $PID ];
    do
      sleep 60
      PID=$(ps ax | grep omxplayer.bi[n] | cut -d' ' -f2)
    done

#If connection is not found to be present execute this command to retry every 15 seconds
sleep 15
exec $Script 
