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
            'onReady': onPlayerReady,
            'onStateChange': null
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
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
    player.setVolume(player.getVolume() + 1)
}

function decreaseVolume() {
    player.setVolume(player.getVolume() - 1)
}

function seekForward() {
    player.seekTo(player.getCurrentTime() + (0.05 * player.getDuration()), true)
}

function seekBackward() {
    player.seekTo(player.getCurrentTime() - (0.05 * player.getDuration()), true)
}

var controller = Leap.loop({enableGestures: true}, function(frame){
});

controller.on("gesture", function(gesture){
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
});