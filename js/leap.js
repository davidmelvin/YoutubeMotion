//Load player api asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var done = false;
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'OVMuwa-HRCQ',
        events: {
            'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(evt) {
    evt.target.playVideo();
}

var pause = false;
function toggleVideo() {
    if (!pause) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    pause = !pause;
}

function increaseVolume() {
    player.setVolume(player.getVolume() + 5)
}

function decreaseVolume() {
    player.setVolume(player.getVolume() - 5)
}

function seekForward() {
    var newTime = player.getCurrentTime() + (0.02 * player.getDuration());
    if (newTime < player.getDuration())
        player.seekTo(newTime, true)
    else
        player.nextVideo()
}

function seekBackward() {
    var newTime = player.getCurrentTime() - (0.02 * player.getDuration());
    if (newTime >= 0)
        player.seekTo(newTime, true)
    else
        player.previousVideo()
}


var controller = Leap.loop({enableGestures: true}, function(frame){
    if (frame.valid && frame.gestures.length > 0) {
        var gesture = frame.gestures[0]
        if (gesture.type == "keyTap")
            toggleVideo();
        else if (gesture.type == "swipe"){
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
            //Classify as right-left or up-down
            if(isHorizontal){
                if(gesture.direction[0] > 0){
                    seekForward();
                } else {
                    seekBackward();
                }
            } else { //vertical
                if(gesture.direction[1] > 0){
                    increaseVolume();
                } else {
                    decreaseVolume();
                }
            }
        }
    }
});