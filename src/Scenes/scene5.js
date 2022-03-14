import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../components/BaseShot";
import BaseImage from "../components/BaseImage";
import { blinkFunc, stopBlinkFunc, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from '../components/CommonFunctions';
import { prePathUrl } from "../components/CommonFunctions"

var varCurrentStep = 0;
var posRabbitList = [
    { x: 0.21, y: 0.13 },
    { x: 0.39, y: 0.13 },
    { x: 0.57, y: 0.13 },
    { x: 0.21, y: 0.13 }
]

var correctAudioList = [];
var timeList = [
    0.5, 0.35, 0.2
]


var timerList = []
var eyeId;
let randomList = []
let gameIsStarted = false;
export default function Scene({ nextFunc, _baseGeo, _geo }) {
    const audioList = useContext(UserContext)

    const refRabbit = useRef();
    const magicWandRef = useRef();
    const baseRef = useRef();
    const eyeList = [useRef(), useRef(), useRef(), useRef()];
    const magicList = [useRef(), useRef(), useRef()]

    const musicBtn = useRef();

    const correctAnsweList = [
        0, 3, 1, 2
    ]
    const magicOrignPos = { left: 0.75, bottom: 0.15 }

    const moveMagicPosList = [
        { left: 0.25, bottom: 0.15 },
        { left: 0.42, bottom: 0.15 },
        { left: 0.61, bottom: 0.15 },
        { left: 0.25, bottom: 0.15 }
    ]


    const positionList = [
        [0, 1, 2],
        [1, 3, 0],
        [0, 3, 1],
        [2, 1, 0]
    ]

    const refMarkList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const capPosList = [
        0.185, 0.365, 0.545
    ]

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]


    useEffect(() => {

        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }
        gameIsStarted = true;

        varCurrentStep = 0;

        eyeId = blinkFunc(eyeList, 200, 1500)


        refRabbit.current.style.display = 'none'
        refRabbit.current.style.pointerEvents = 'none'

        baseRef.current.style.pointerEvents = 'none'

        audioList.bodyAudio.src = "./sounds/EP_52_Audio_44.mp3"
        setRepeatAudio(audioList.bodyAudio);

        correctAudioList = [
            audioList.wordAudio3,
            audioList.wordAudio1,
            audioList.wordAudio2,
            audioList.wordAudio4
        ]

        showWords(0)

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            startRepeatAudio();
            timerList[1] = setTimeout(() => {
                correctAudioList[randomList[0]].play().catch(error => { })
                baseRef.current.style.pointerEvents = ''
            }, audioList.bodyAudio.duration * 1000);
        }, 1800);

        return () => {
            stopBlinkFunc(eyeId)
            gameIsStarted = false;
        }
    }, [])

    function showWords(num) {

        if (num > 0) {
            for (let i = 0; i < 3; i++) {
                refLetterList[positionList[randomList[num - 1]][i]].current.style.transition = '0.3s'
                refLetterList[positionList[randomList[num - 1]][i]].current.className = 'hide'
            }
            setTimeout(() => {
                correctAudioList[randomList[num]].pause();
                correctAudioList[randomList[num]].currentTime = 0;
                correctAudioList[randomList[num]].play().catch(error => { });
            }, 500);
        }

        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                refLetterList[positionList[randomList[num]][i]].current.style.transition = '0.0s'
                refLetterList[positionList[randomList[num]][i]].current.style.left = (capPosList[i] * _baseGeo.width + _baseGeo.left) + 'px'
            }

            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    refLetterList[positionList[randomList[num]][i]].current.style.transition = '0.3s'
                    refLetterList[positionList[randomList[num]][i]].current.className = 'appear commonButton'
                }
                setTimeout(() => {

                    baseRef.current.style.pointerEvents = ''
                }, 300);

            }, 100);

        }, 320);
    }

    if (gameIsStarted)
        setTimeout(() => {
            let pos = posRabbitList[randomList[varCurrentStep]]

            refRabbit.current.style.transition = '0.0s'
            refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * pos.x + "px"
            refRabbit.current.style.bottom = _baseGeo.height * 0.22 + "px"

            for (let i = 0; i < 3; i++) {
                refLetterList[positionList[randomList[varCurrentStep]][i]].current.style.transition = '0.0s'
                refLetterList[positionList[randomList[varCurrentStep]][i]].current.style.left = (capPosList[i] * _baseGeo.width + _baseGeo.left) + 'px'
            }
        }, 10);

    function clickCapFunc(num) {
        clearTimeout(timerList[0])
        clearTimeout(timerList[1])
        stopRepeatAudio();

        correctAudioList[0].pause();
        audioList.bodyAudio.pause();

        correctAudioList[randomList[varCurrentStep]].pause();
        audioList.buzzAudio.pause()
        refLetterList[num].current.className = 'bluecomeback commonButton'

        clearTimeout(timerList[3])

        let currentNum = 0;
        for (let i = 0; i < 3; i++)
            if (num == positionList[randomList[varCurrentStep]][i])
                currentNum = i

        if (correctAnsweList[randomList[varCurrentStep]] == num) {
            baseRef.current.style.pointerEvents = 'none'

            magicWandRef.current.style.transition = timeList[currentNum] + 's'
            magicWandRef.current.style.left = _baseGeo.width * moveMagicPosList[currentNum].left + _baseGeo.left + 'px'
            magicWandRef.current.style.bottom = _baseGeo.height * moveMagicPosList[currentNum].bottom + 'px'

            setTimeout(() => {
                setTimeout(() => {
                    magicWandRef.current.style.transition = '0.2s'
                    magicWandRef.current.style.transform = 'rotateZ(-15deg)'

                    setTimeout(() => {
                        magicWandRef.current.style.transform = 'rotateZ(0deg)'
                    }, 200);

                }, 10);

                setTimeout(() => {
                    magicWandRef.current.style.transition = '0.5s'
                    magicWandRef.current.style.left = _baseGeo.width * magicOrignPos.left + _baseGeo.left + 'px'
                    magicWandRef.current.style.bottom = _baseGeo.height * magicOrignPos.bottom + 'px'
                }, 1500);

                setTimeout(() => {


                    correctAudioList[randomList[varCurrentStep]].pause()
                    audioList.tingAudio.play().catch(event => { })

                    let countNum = 0;
                    magicList[0].current.setClass('character-appear')

                    refMarkList[varCurrentStep].current.src = prePathUrl() + "images/SB_52_Icons/SB_52_Star_Icon.svg"
                    let magicInterval = setInterval(() => {

                        magicList[countNum].current.setClass('character-disappear')
                        countNum++;
                        magicList[countNum].current.setClass('character-appear')
                        if (countNum == 2) {
                            clearInterval(magicInterval)
                            setTimeout(() => {
                                magicList[2].current.setClass('character-disappear')
                            }, 200);
                        }
                    }, 200);

                    for (let i = 0; i < 4; i++)
                        if (i != num)
                            refLetterList[i].current.className = 'hide'
                    appearRabit(posRabbitList[randomList[varCurrentStep]])


                }, 200);

            }, timeList[currentNum] * 1000 + 100);
        }
        else {
            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
            audioList.buzzAudio.currentTime = 0;

            correctAudioList[randomList[varCurrentStep]].pause();
            audioList.buzzAudio.play().catch(error => { })

            refLetterList[num].current.className = 'bluehalf'

            timerList[3] = setTimeout(() => {
                correctAudioList[randomList[varCurrentStep]].play().catch(error => { })
                refLetterList[num].current.className = 'bluecomeback commonButton'
                startRepeatAudio()
            }, 400);
        }
    }

    function appearRabit(pos) {


        refRabbit.current.style.display = 'inline-block'
        refRabbit.current.style.transition = '0.0s'
        refRabbit.current.style.opacity = 0
        refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * pos.x + "px"
        refRabbit.current.style.bottom = _baseGeo.height * 0.13 + "px"

        setTimeout(() => {
            refRabbit.current.style.transition = '0.5s'
            refRabbit.current.style.opacity = 1
            refRabbit.current.style.bottom = _baseGeo.height * 0.22 + "px"
        }, 100);

        setTimeout(() => {
            refRabbit.current.style.left = _baseGeo.left + _baseGeo.width * pos.x + "px"
            refRabbit.current.style.bottom = _baseGeo.height * 0.13 + "px"
            refRabbit.current.style.opacity = 0
            setTimeout(() => {
                refRabbit.current.style.display = 'none'

                varCurrentStep++
                if (varCurrentStep < 4) {
                    showWords(varCurrentStep)
                    startRepeatAudio();
                }
                else
                    nextFunc();
            }, 1000);
        }, 2000);

    }

    return (
        <div className="aniObject"
            ref={baseRef} >

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.18,
                    bottom: _baseGeo.height * 0.285
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.36,
                    bottom: _baseGeo.height * 0.285
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.54,
                    bottom: _baseGeo.height * 0.285
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_2.svg"}
                />
            </div>

            <div
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
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.18,
                    bottom: _baseGeo.height * 0.12
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.36,
                    bottom: _baseGeo.height * 0.12
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.54,
                    bottom: _baseGeo.height * 0.12
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Hat_1.svg"}
                />
            </div>

            {/* Letters */}
            {/* letter  - an */}
            <div
                className="hide" ref={refLetterList[0]}
                onClick={() => { clickCapFunc(0) }}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.13 + "px",
                    height: _baseGeo.width * 0.13 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.185 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",

                }}>
                <div style={{
                    position: "absolute", width: _baseGeo.width * 0.075 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.025 + "px",
                    bottom: _baseGeo.height * 0.0 + "px",
                }}>

                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_an_1.svg"}
                    />
                </div>
            </div>


            {/* letter - am */}
            <div
                onClick={() => { clickCapFunc(1) }}
                className="hide"
                ref={refLetterList[1]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.13 + "px",
                    height: _baseGeo.width * 0.13 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.365 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",

                }}>
                <div style={{
                    position: "absolute", width: _baseGeo.width * 0.08 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.025 + "px",
                    bottom: _baseGeo.height * 0.0 + "px",
                }}>

                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_am_1.svg"}
                    />
                </div>
            </div>


            {/* letter - in */}
            <div
                onClick={() => { clickCapFunc(2) }}
                className="hide" ref={refLetterList[2]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.13 + "px",
                    height: _baseGeo.width * 0.13 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",

                }}>
                <div style={{
                    position: "absolute", width: _baseGeo.width * 0.08 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.025 + "px",
                    bottom: _baseGeo.height * 0.0 + "px",
                }}>

                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_in_1.svg"}
                    />
                </div>
            </div>

            {/* letter - at */}
            <div
                onClick={() => { clickCapFunc(3) }}
                className="hide" ref={refLetterList[3]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.13 + "px",
                    height: _baseGeo.width * 0.13 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.365 + "px",
                    bottom: _baseGeo.height * 0.14 + "px",

                }}>
                <div style={{
                    position: "absolute", width: _baseGeo.width * 0.08 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.025 + "px",
                    bottom: _baseGeo.height * 0.0 + "px",
                }}>

                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_at_1.svg"}
                    />
                </div>
            </div>



            <div
                ref={magicWandRef}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px",
                    height: _baseGeo.width * 0.13 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.75 + 'px',
                    bottom: _baseGeo.height * 0.15 + 'px'
                }}>
                <BaseImage
                    url={"SB_52_Prop-Interactive/SB_52_PI_Magic-Wand.svg"}
                />

                {
                    [[1, -0.1, -0.1], [1.7, -0.40, -0.3], [2, -0.55, -0.3]].map((value, index) => {
                        return (
                            <BaseImage
                                ref={magicList[index]}
                                key={value}
                                scale={value[0]}
                                posInfo={{ l: value[1], t: value[2] }}
                                className={'character-disappear'}
                                url={"animations/SB_52_Prop_Animation/SB_52_Magic-Wand_Sparkels_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            {/* marks */}
            <div
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
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Star_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[2]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "13%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Star_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[1]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "35%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Star_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[0]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.08 + "px"
                        , right: "57%",
                        top: "3%",
                    }}
                    src={prePathUrl() + "images/SB_52_Icons/SB_52_Grey-Star_Icon.svg"}
                />
            </div>

            <div
                ref={musicBtn}
                onClick={() => {
                    correctAudioList[randomList[varCurrentStep]].pause();
                    correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                    correctAudioList[randomList[varCurrentStep]].play().catch(error => { });
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
