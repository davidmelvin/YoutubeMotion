var opened = false

var controller = Leap.loop({enableGestures: true}, function(frame){
    if (frame.valid && frame.gestures.length > 0) {
        var gesture = frame.gestures[0]
        if (gesture.type == "circle" && !opened) {
            console.log(document.URL);
            chrome.storage.local.set({"url": document.URL}, function() {
                opened = true
                window.open('http://davidmelvin.me/YoutubeMotion/')
            })
        }
    }
});