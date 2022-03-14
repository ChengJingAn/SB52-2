import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/BaseShot";
import BaseImage from "../components/BaseImage";
import { prePathUrl, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"

var stepCount = 0;
var posBreadList = [
    { x: 0.215, y: 0.6 },
    { x: 0.41, y: 0.6 },
    { x: 0.595, y: 0.6 },
    { x: 0.785, y: 0.6 }
]

var currentPos = { x: 0.75, y: 0.6 }
var defaultpos = { x: 0.75, y: 0.6 }

var timerList = []
var correctAudioList = []
let randomList = []

let gameIsStarted = false;
export default function Scene({ nextFunc, _baseGeo, _geo }) {

    const audioList = useContext(UserContext)
    const musicBtn = useRef();

    const souseList = [
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()]
    ]
    const makeSouseList = [useRef(), useRef(), useRef()]
    const refMarkList = [
        useRef(), useRef(), useRef(), useRef()
    ]

    const correctAnswerList = [
        2, 3, 1, 0
    ]

    const showLetterList = [
        [1, 2, 0],
        [3, 1, 2],
        [2, 0, 1],
        [0, 2, 3]
    ]

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const refBreadList = [
        useRef(),
        useRef(),
        useRef(),
    ]

    const leftPosList = [0.19, 0.385, 0.58]

    const baseRef = useRef()
    const refBread = useRef();

    if (gameIsStarted)

        setTimeout(() => {
            changePos(currentPos);


            for (let i = 0; i < 3; i++) {
                refLetterList[showLetterList[randomList[stepCount]][i]].current.style.transition = '0.0s'
                refLetterList[showLetterList[randomList[stepCount]][i]].current.style.left = _baseGeo.left + _baseGeo.width * leftPosList[i] + "px"
                setTimeout(() => {
                    refLetterList[showLetterList[randomList[stepCount]][i]].current.style.transition = '0.3s'
                }, 100);
            }
        }, 100);

    useEffect(() => {
        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }

        gameIsStarted = true;

        stepCount = 0;

        audioList.bodyAudio.src = "./sounds/EP_52_Audio_44.mp3"
        setRepeatAudio(audioList.bodyAudio)

        correctAudioList = [
            audioList.wordAudio3,
            audioList.wordAudio4,
            audioList.wordAudio2,
            audioList.wordAudio1
        ]

        currentPos = defaultpos;
        baseRef.current.style.pointerEvents = 'none'
        refBread.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
        refBread.current.style.bottom = _baseGeo.height * currentPos.y + _baseGeo.bottom + "px"

        setTimeout(() => {
            refBread.current.style.transition = '1s'
        }, 1000);

        showLetter(0)

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            timerList[1] = setTimeout(() => {
                correctAudioList[randomList[0]].play().catch(error => { })
                startRepeatAudio();
                baseRef.current.style = ''
            }, audioList.bodyAudio.duration * 1000);
        }, 1800);

        return () => {
            currentPos = { x: 0.75, y: 0.6 }
            gameIsStarted = false;
        }
    }, [])



    function clickBreadFunc(currentNum) {

        stopRepeatAudio();

        clearTimeout(timerList[0])
        clearTimeout(timerList[1])
        clearTimeout(timerList[3])

        correctAudioList[randomList[stepCount]].pause();
        audioList.buzzAudio.pause()

        refLetterList[currentNum].current.className = 'bluecomeback commonButton'

        correctAudioList[randomList[0]].pause();
        audioList.bodyAudio.pause();

        let currentPos = 0;
        for (let i = 0; i < 3; i++)
            if (showLetterList[randomList[stepCount]][i] == currentNum)
                currentPos = i

        if (currentNum == correctAnswerList[randomList[stepCount]]) {
            baseRef.current.style.pointerEvents = 'none'

            audioList.tingAudio.play();
            refMarkList[stepCount].current.src = prePathUrl() + "images/SB_52_Icons/SB_52_Icecream-Cone_Icon.svg"
            changePos(posBreadList[currentPos])
            setTimeout(() => {

                let countNum = 0;
                makeSouseList[countNum].current.setClass('character-appear')
                let makeInterval = setInterval(() => {
                    makeSouseList[countNum].current.setClass('character-disappear')
                    countNum++;
                    makeSouseList[countNum].current.setClass('character-appear')
                    if (countNum == 2) {
                        clearInterval(makeInterval)

                        let cNum = 0;
                        souseList[currentPos][cNum].current.setClass('character-appear')
                        let showBreadInterval = setInterval(() => {
                            souseList[currentPos][cNum].current.setClass('character-disappear')
                            cNum++
                            souseList[currentPos][cNum].current.setClass('character-appear')

                            if (cNum == 2) {
                                clearInterval(showBreadInterval)
                                setTimeout(() => {
                                    souseList[currentPos][2].current.setClass('character-disappear')
                                }, 1000);
                            }
                        }, 200);

                        setTimeout(() => {
                            makeSouseList[2].current.setClass('character-disappear')
                        }, 500);
                    }
                }, 150);
            }, 1000);

            hideLetter(stepCount, currentPos)

            setTimeout(() => {
                baseRef.current.style.pointerEvents = ''

                if (stepCount < 3) {
                    hideLetter(stepCount)

                    stepCount++
                    setTimeout(() => {
                        showLetter(stepCount)
                    }, 500);

                    changePos(defaultpos)
                    startRepeatAudio();
                }
                else
                    nextFunc();
            }, 3000);
        }

        else {
            correctAudioList[randomList[stepCount]].currentTime = 0;
            audioList.buzzAudio.currentTime = 0;

            correctAudioList[randomList[stepCount]].pause();
            audioList.buzzAudio.play().catch(error => { })

            refLetterList[currentNum].current.className = 'bluehalf'
            timerList[3] = setTimeout(() => {
                correctAudioList[randomList[stepCount]].play().catch(error => { })
                refLetterList[currentNum].current.className = 'bluecomeback commonButton'
                baseRef.current.style.pointerEvents = ''
                startRepeatAudio();
            }, 400);
        }

    }

    function showLetter(num) {

        for (let i = 0; i < 3; i++) {
            refLetterList[showLetterList[randomList[num]][i]].current.style.transition = '0.0s'
            refLetterList[showLetterList[randomList[num]][i]].current.style.left = _baseGeo.left + _baseGeo.width * leftPosList[i] + "px"
            setTimeout(() => {
                refLetterList[showLetterList[randomList[num]][i]].current.style.transition = '0.3s'
                refLetterList[showLetterList[randomList[num]][i]].current.className = 'appear commonButton';
            }, 100);
        }

        if (num > 0)
            setTimeout(() => {
                correctAudioList[randomList[stepCount]].pause();
                correctAudioList[randomList[stepCount]].currentTime = 0;
                correctAudioList[randomList[stepCount]].play().catch(error => { });
            }, 500);
    }

    function hideLetter(num, currentNum = -1) {
        for (let i = 0; i < 3; i++) {
            if (currentNum != i)
                refLetterList[showLetterList[randomList[num]][i]].current.className = 'hide'
        }
    }


    function changePos(pos) {
        if (refBread != null) {
            currentPos = pos
            refBread.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refBread.current.style.bottom = _baseGeo.height * currentPos.y + _baseGeo.bottom + "px"




        }
    }


    return (
        <div className="aniObject"
            ref={baseRef}
        >
            {/* Bread */}
            <div
                ref={refBread}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.16 + "px",
                    height: _baseGeo.width * 0.16 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.14 + "px",
                    bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                }}
            >
                <BaseImage
                    scale={0.56}
                    posInfo={{ l: 0.085, t: -0.13 }}
                    url={"SB_52_Prop-Interactive/SB_52_PI_Icecream-Dispensser.svg"}
                />

                {
                    [0, 1, 2].map((value, index) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={makeSouseList[index]}
                                scale={0.3}
                                posInfo={{ l: 0.2, t: 0.9 }}
                                className={'character-disappear'}
                                url={"animations/SB_52_Prop_Animation/SB_52_Chaco-Syrup_Dispencer_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            {/* cups */}
            <div>


                {/* bowl - on */}
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.19 + "px",
                        bottom: _baseGeo.height * 0.16 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream-Cup.svg"}
                    />
                </div>

                {/* bowl - in */}
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.38 + "px",
                        bottom: _baseGeo.height * 0.16 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream-Cup.svg"}
                    />
                </div>

                {/* bowl - up */}
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.57 + "px",
                        bottom: _baseGeo.height * 0.16 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream-Cup.svg"}
                    />
                </div>

            </div>



            {/* breads */}
            <div>
                <div
                    ref={refBreadList[0]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.19 + "px",
                        bottom: _baseGeo.height * 0.28 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream.svg"}
                    />
                </div>

                <div
                    ref={refBreadList[1]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.38 + "px",
                        bottom: _baseGeo.height * 0.28 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream.svg"}
                    />
                </div>

                <div
                    ref={refBreadList[2]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.57 + "px",
                        bottom: _baseGeo.height * 0.28 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream.svg"}
                    />
                </div>

            </div>

            {/* letters */}
            <div>
                {/* letter - it */}
                <div
                    className="hide"
                    onClick={() => { clickBreadFunc(0) }}
                    ref={refLetterList[0]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                        bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.height * -0.02 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_it_1.svg"}
                        />
                    </div>
                </div>
                {/* letter  - up */}
                <div
                    className="hide"
                    onClick={() => { clickBreadFunc(1) }}
                    ref={refLetterList[1]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                        bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.height * -0.02 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_up_1.svg"}
                        />
                    </div>
                </div>
                {/* letter - on */}
                <div
                    className="hide"
                    onClick={() => { clickBreadFunc(2) }}
                    ref={refLetterList[2]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                        bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.height * -0.01 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_on_1.svg"}
                        />
                    </div>
                </div>

                {/* leter - us */}
                <div
                    className="hide"
                    onClick={() => { clickBreadFunc(3) }}
                    ref={refLetterList[3]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.height * 0.3 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                        bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.height * -0.01 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_us_1.svg"}
                        />
                    </div>
                </div>
            </div >

            {/* souses */}

            <div style={{ pointerEvents: 'none' }}>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.19 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    ref={souseList[0][index]}
                                    key={value}
                                    scale={1}
                                    posInfo={{ l: 0, t: 0.45 }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Chaco-Syrup_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.38 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    ref={souseList[1][index]}
                                    key={value}
                                    scale={1}
                                    posInfo={{ l: 0, t: 0.45 }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Chaco-Syrup_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.57 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    ref={souseList[2][index]}
                                    key={value}

                                    scale={1}
                                    posInfo={{ l: 0, t: 0.45 }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Chaco-Syrup_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

            </div>

            {/* dress */}
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 1 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    top: _baseGeo.height * -0.05 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Foreground/SB_52_FG_Tent.svg"}
                />
            </div>

            {/* marks */}
            <div
                className="hide1"
                style={{
                    position: "fixed", width: _baseGeo.width * 0.16 + "px"
                    , right: "2%",
                    top: "0.2%",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Fire_Icon_Pogress-Bar.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[3]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "-8%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Icecream-Cone_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[2]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "13%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Icecream-Cone_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[1]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "35%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Icecream-Cone_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[0]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "57%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Icecream-Cone_Icon.svg"}
                />
            </div>

            <div
                ref={musicBtn}
                onClick={() => {
                    correctAudioList[randomList[stepCount]].pause();
                    correctAudioList[randomList[stepCount]].currentTime = 0;
                    correctAudioList[randomList[stepCount]].play().catch(error => { });
                }}
                className='commonButton'
                style={{
                    position: "fixed", width: _geo.width * 0.055 + "px",
                    right: "2%"
                    , top: "46%", cursor: "pointer",
                }}>
                <img draggable={false} width={"100%"}
                    className='playBtn'
                    src={prePathUrl() + 'images/Buttons/Audio.svg'}
                />
            </div>

        </div >
    );
}
