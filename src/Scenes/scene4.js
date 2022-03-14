import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../components/BaseShot";
import BaseImage from "../components/BaseImage";
import { blinkFunc, stopBlinkFunc, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from '../components/CommonFunctions';
import { prePathUrl } from "../components/CommonFunctions"

var stepCount = 0;
var posRabbitList = [
    { x: 0.21, y: 0.2 },
    { x: 0.39, y: 0.2 },
    { x: 0.57, y: 0.2 },
    { x: 0.75, y: 0.2 },
]

var posComplexRabbitPaths = [
    { x: 0.82, y: 0.13 },
    { x: 0.61, y: 0.13 },
    { x: 0.43, y: 0.13 },
    { x: 0.25, y: 0.13 }
]

//125-2
var currentPos = { x: 0.75, y: 0.2 }
var isHoverEnable = false;
var eyeId;
var timerList = []
var isGameLoaded = false;

export default function Scene({ nextFunc, _baseGeo }) {
    const audioList = useContext(UserContext)
    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]
    const eyeList = [useRef(), useRef(), useRef(), useRef()];
    const showTextList = [useRef(), useRef(), useRef(), useRef()];
    const refRabbit = useRef();
    const refFirstCap1 = useRef();
    const refFirstCap2 = useRef();

    const baseBackObj = useRef();

    function setTapHover() {
        if (isHoverEnable) {
            refFirstCap1.current.className = 'hover-scaleBtn'
            refFirstCap2.current.className = 'hover-scaleBtn'
        }
    }

    function setTapOut() {
        if (isHoverEnable) {
            refFirstCap1.current.className = 'out-scaleBtn'
            refFirstCap2.current.className = 'out-scaleBtn'
        }
    }

    setTimeout(() => {
        refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
        refRabbit.current.style.bottom = _baseGeo.height * 0.32 + "px"
        refRabbit.current.style.transition = '0s'
    }, 10);

    useEffect(() => {
        stepCount = 0;

        audioList.bodyAudio.src = "./sounds/EP_52_Audio_41.mp3"

        setRepeatAudio(audioList.bodyAudio);
        audioList.subBodyAudio.src = "./sounds/EP_52_Audio_42.mp3"

        audioList.wordAudio1.volume = 0.4
        audioList.wordAudio1.src = "./sounds/SB_52_Audio_01(at).mp3"
        audioList.wordAudio2.src = "./sounds/EP_52_Audio_45.mp3"
        audioList.wordAudio3.src = "./sounds/EP_52_Audio_46.mp3"
        audioList.wordAudio4.src = "./sounds/EP_52_Audio_48.mp3"

        isGameLoaded = true;
        currentPos = posRabbitList[0]
        eyeId = blinkFunc(eyeList, 200, 2000)


        isHoverEnable = false;
        refRabbit.current.style.display = 'none'
        setTimeout(() => {
            refFirstCap1.current.className = 'out-scaleBtn'
            refFirstCap2.current.className = 'out-scaleBtn'
            baseBackObj.current.style.pointerEvents = ''
            isHoverEnable = true;
        }, 2000);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            startRepeatAudio();
        }, 2000);

        return () => {
            stopBlinkFunc(eyeId)
            isGameLoaded = false;
        }
    }, [])

    function clickRabbitFunc() {

        stopRepeatAudio();
        refRabbit.current.style.pointerEvents = 'none'
        refFirstCap1.current.className = ''
        isHoverEnable = false;
        refFirstCap2.current.className = ''

        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })

        if (stepCount > 0) {
            baseBackObj.current.style.pointerEvents = 'none'
            setTimeout(() => {
                baseBackObj.current.style.pointerEvents = ''
            }, 3500);
        }


        if (stepCount < 4) {
            switch (stepCount) {
                case 0: timerList[1] = setTimeout(() => {
                    audioList.subBodyAudio.play().catch(error => { });

                    setRepeatAudio(audioList.subBodyAudio);
                    startRepeatAudio();
                }, 1000);
                    audioList.bodyAudio.pause();
                    clearTimeout(timerList[0])
                    break;
                case 1: audioList.subBodyAudio.pause(); clearTimeout(timerList[1]); audioList.wordAudio1.play().catch(error => { }); break;
                case 2: audioList.wordAudio2.play().catch(error => { }); break;
                case 3: audioList.wordAudio3.play().catch(error => { }); break;
                default:
                    break;
            }
            if (stepCount > 0)
                setTimeout(() => {
                    refLetterList[stepCount].current.className = 'show'
                    appearRabit(posRabbitList[stepCount]);
                    startRepeatAudio();
                    stepCount++;
                    if (stepCount > 1) {
                        refLetterList[stepCount - 2].current.style.pointerEvents = 'none'
                        showTextList[stepCount - 2].current.className = 'bluehalf'
                    }
                }, 2500);
            else {
                refLetterList[stepCount].current.className = 'show'
                appearRabit(posRabbitList[stepCount]);
                stepCount++;
            }
        }
        else {
            audioList.wordAudio4.play().catch(error => { });

            setTimeout(() => {
                refRabbit.current.style.transition = '0.3s ease-in-out'
                changePos(posComplexRabbitPaths[0], true, true);
            }, 1500);
            setTimeout(() => {
                setTimeout(() => {
                    refLetterList[3].current.style.pointerEvents = 'none'
                    showTextList[3].current.className = 'bluecomeback scaleText'
                    audioList.wordAudio4.play().catch(error => { });
                    setTimeout(() => {
                        showTextList[3].current.className = 'bluecomeback normalText'
                        showTextList[2].current.className = 'bluecomeback scaleText'
                        audioList.wordAudio3.play().catch(error => { });
                        setTimeout(() => {
                            showTextList[2].current.className = 'bluecomeback normalText'
                            showTextList[1].current.className = 'bluecomeback scaleText'
                            audioList.wordAudio2.play().catch(error => { });
                            setTimeout(() => {
                                showTextList[1].current.className = 'bluecomeback normalText'
                                showTextList[0].current.className = 'bluecomeback scaleText'
                                setTimeout(() => {
                                    showTextList[0].current.className = 'bluecomeback normalText'
                                }, 2000);
                                audioList.wordAudio1.play().catch(error => { });
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 500);

                setTimeout(() => {
                    nextFunc();
                }, 14000);
            }, 2500);
        }
    }

    function appearRabit(pos) {
        refRabbit.current.style.display = 'inline-block'
        refRabbit.current.style.transition = '0.0s'
        refRabbit.current.style.opacity = 0
        refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * pos.x + "px"
        refRabbit.current.style.bottom = _baseGeo.height * 0.22 + "px"

        setTimeout(() => {

            refRabbit.current.style.transition = '0.5s'
            refRabbit.current.style.opacity = 1
            refRabbit.current.style.bottom = _baseGeo.height * 0.32 + "px"
        }, 100);
        currentPos = posRabbitList[stepCount]
    }


    function changePos(pos, isJump = false, isFirst = false) {
        if (isJump) {
            let middlePos = {
                x: (currentPos.x + (isFirst ? (currentPos.x + 0.05) : pos.x)) / 2,
                y: 0.3 + currentPos.y
            }

            audioList.jumpAudio.pause();
            audioList.jumpAudio.currentTime = 0;
            audioList.jumpAudio.play();

            currentPos = pos
            console.log(middlePos)
            refRabbit.current.style.transition = '0.3s'
            refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * middlePos.x + "px"
            refRabbit.current.style.bottom = _baseGeo.height * middlePos.y + "px"
            setTimeout(() => {
                if (isFirst)
                    refRabbit.current.style.zIndex = 1
                refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
                refRabbit.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            }, 300);
        }
        else {
            currentPos = pos
            refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refRabbit.current.style.bottom = _baseGeo.height * currentPos.y + "px"
        }
    }

    return (
        <div className="aniObject"
            ref={baseBackObj}
            style={{ pointerEvents: 'none' }}
        >
            {/* Rabbit */}
            <div
                ref={refFirstCap1}
                onClick={clickRabbitFunc}
                onMouseEnter={setTapHover}
                onMouseLeave={setTapOut}

                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.18,
                    bottom: _baseGeo.height * 0.385
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.36,
                    bottom: _baseGeo.height * 0.385
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.54,
                    bottom: _baseGeo.height * 0.385
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.72,
                    bottom: _baseGeo.height * 0.385
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>

            {/* rabitobject */}
            <div
                onClick={clickRabbitFunc}
                ref={refRabbit}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.1 + "px"
                    , height: _baseGeo.width * 0.214 + "px"
                    , transition: '0.5s',
                    opacity: 1
                }}>

                <BaseImage
                    url={"SB_52_Character-Interactive/SB_52_CI_Rabbit.svg"}
                />

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.367}
                                posInfo={{ l: 0.17, t: 0.368 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Rabbit_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>



            <div
                onClick={clickRabbitFunc}
                ref={refFirstCap2}
                onMouseEnter={setTapHover}
                onMouseLeave={setTapOut}

                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.18,
                    bottom: _baseGeo.height * 0.22
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>

            <div

                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.36,
                    bottom: _baseGeo.height * 0.22
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>

            <div

                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.54,
                    bottom: _baseGeo.height * 0.22
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>

            <div

                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.72,
                    bottom: _baseGeo.height * 0.22
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>

            {/* letters */}

            {/* letter  - at */}
            <div
                className="hide" ref={refLetterList[0]}>
                <div
                    onClick={clickRabbitFunc}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.13 + "px",
                        height: _baseGeo.width * 0.12 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.185 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",

                    }}
                >
                    <div
                        ref={showTextList[0]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.025 + "px",
                            bottom: _baseGeo.height * 0.00 + "px",
                        }}
                    >
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_at_1.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter - am */}
            <div
                className="hide" ref={refLetterList[1]}>
                <div
                    onClick={clickRabbitFunc}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.13 + "px",
                        height: _baseGeo.width * 0.12 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.363 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",

                    }}
                >
                    <div
                        ref={showTextList[1]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.025 + "px",
                            bottom: _baseGeo.height * 0.00 + "px",
                        }}
                    >
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_am_1.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter - an */}
            <div
                className="hide" ref={refLetterList[2]}
            >
                <div
                    onClick={clickRabbitFunc}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.13 + "px",
                        height: _baseGeo.width * 0.12 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",

                    }}
                >
                    <div
                        ref={showTextList[2]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.025 + "px",
                            bottom: _baseGeo.height * -0.01 + "px",
                        }}
                    >
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_an_1.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter - in */}
            <div
                className="hide" ref={refLetterList[3]}
            >
                <div
                    onClick={clickRabbitFunc}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.13 + "px",
                        height: _baseGeo.width * 0.12 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.725 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",

                    }}
                >
                    <div
                        ref={showTextList[3]}
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.025 + "px",
                            bottom: _baseGeo.height * -0.01 + "px",
                        }}
                    >
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_in_1.svg"}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
