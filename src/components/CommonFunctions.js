import "../stylesheets/styles.css";

var intervalList = []
var innerIntervalList = []
var timerList = []

export function initialAudio(audioList) {
    let allkeys = Object.keys(audioList)
    for (let i = 0; i < allkeys.length; i++) {
        audioList[allkeys[i]].play()
            .catch(error => {
            })
        audioList[allkeys[i]].pause()
    }
}

export function getMaskStyle(info) {

    let maskStyle = {
        position: "absolute", width: info.scale + "%",
        height: info.scale + "%"
        , left: -(info.scale - 100) / 2 + "%",
        bottom: -(info.scale - 100) / 2 + "%",
        WebkitMaskImage: 'url("' + prePathUrl() + 'images/' + info.url + '.svg")',
        WebkitMaskRepeat: "no-repeat",
        backgroundColor: "white"
    }

    return maskStyle;
}

export function blinkFunc(refList, delay, interval, delRefList = []) {
    var currentNum = timerList.length;
    var isPlus = true;
    var currentIndex = 0;

    if (delRefList.length > 0)
        delRefList.map(ref => {
            ref.current.setClass('character-disappear')
        })
    if (refList[0].current != null)
        refList[0].current.setClass('character-appear')

    timerList.push(
        setTimeout(() => {

            intervalList.push(
                setInterval(() => {
                    if (innerIntervalList[currentNum] != null)
                        clearInterval(innerIntervalList[currentNum])
                    innerIntervalList[currentNum] = setInterval(() => {
                        if (refList[currentIndex].current != null)
                            refList[currentIndex].current.setClass('character-disappear')
                        if (isPlus) {
                            if (currentIndex < refList.length - 1)
                                currentIndex++;
                            else {
                                isPlus = false
                                currentIndex--
                            }
                        }
                        else {
                            if (currentIndex > 0)
                                currentIndex--;
                            else {
                                isPlus = true;
                                currentIndex = 0;
                                clearInterval(innerIntervalList[currentNum])
                            }
                        }
                        if (refList[currentIndex].current != null)
                            refList[currentIndex].current.setClass('character-appear')
                    }, 100);
                }, interval)
            )
        }, delay)
    )
    return currentNum;
}

export function stopBlinkFunc(num) {
    clearInterval(intervalList[num])
    clearTimeout(timerList[num])
    clearInterval(innerIntervalList[num])
}

let sharePrePath = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    sharePrePath = './'
} else {
    // production code
    sharePrePath = './'
}

export const prePathUrl = () => sharePrePath;


let repeatAudio, repeatInterval, repeartTimer;


export function setRepeatAudio(audio) {
    repeatAudio = audio;
}

export function startRepeatAudio(pastTime = 3000, intervalTime = 7000) {

    clearTimeout(repeartTimer)
    clearInterval(repeatInterval)

    repeartTimer = setTimeout(() => {
        repeatInterval = setInterval(() => {
            repeatAudio.play();
        }, intervalTime);
    }, pastTime);
}

export function stopRepeatAudio() {

    repeatAudio.pause();
    repeatAudio.currentTime = 0;

    clearTimeout(repeartTimer)
    clearInterval(repeatInterval)
    
}

var sourceList = [];
var gainNodeList = []
var audioCtxlist = []
var extraAudioList = []

export function setExtraVolume(audio, value) {
    if (!extraAudioList.includes(audio)) {
        extraAudioList.push(audio)
        audioCtxlist.push(new AudioContext())
        sourceList.push(audioCtxlist[audioCtxlist.length - 1].createMediaElementSource(audio))
        gainNodeList.push(audioCtxlist[audioCtxlist.length - 1].createGain())
        sourceList[sourceList.length - 1].connect(gainNodeList[gainNodeList.length - 1]);
        gainNodeList[gainNodeList.length - 1].connect(audioCtxlist[audioCtxlist.length - 1].destination);
        setVolume(extraAudioList.length - 1, value)
    }
    else {
        let index = extraAudioList.findIndex(element => element == audio)
        setVolume(index, value)
    }
}

function setVolume(index, value) {
    gainNodeList[index].gain.value = value; // double the volume
}