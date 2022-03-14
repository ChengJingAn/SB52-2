import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/BaseShot";
import BaseImage from "../components/BaseImage";
import { prePathUrl, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"

var stepCount = 0;
var posBreadList = [
    { x: 0.165, y: 0.55 },
    { x: 0.36, y: 0.55 },
    { x: 0.545, y: 0.55 },
    { x: 0.735, y: 0.55 }
]

var movePos = { x: 0.165, y: 0.525 }
var currentPos = { x: 0.165, y: 0.9 }
var timerList = []

export default function Scene({ nextFunc, _baseGeo }) {
    const audioList = useContext(UserContext)
    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const refShowingTextList = [
        useRef(), useRef(), useRef(), useRef()
    ]

    const souseList = [
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()]
    ]


    const refBread = useRef();
    const firstBowl = useRef();

    const breadList = [
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()]
    ]

    const makeSouseList = [useRef(), useRef(), useRef()]

    const makeBreadList = [
        useRef(),
        useRef(),
        useRef()
    ]

    setTimeout(() => {
        changePos(currentPos);
    }, 100);

    useEffect(() => {
        stepCount = 0;
        currentPos = { x: 0.165, y: 0.55 }


        audioList.bodyAudio.src = "./sounds/EP_52_Audio_53.mp3"
        setRepeatAudio(audioList.bodyAudio);

        audioList.subBodyAudio.src = "./sounds/EP_52_Audio_54.mp3"

        audioList.wordAudio1.volume = 1
        audioList.wordAudio1.src = "./sounds/EP_52_Audio_55.mp3"
        audioList.wordAudio2.src = "./sounds/EP_52_Audio_56.mp3"
        audioList.wordAudio3.src = "./sounds/EP_52_Audio_57.mp3"
        audioList.wordAudio4.src = "./sounds/EP_52_Audio_58.mp3"

        setTimeout(() => {
            refBread.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refBread.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            refBread.current.style.transition = '1s'
        }, 200);


        timerList[0] = setTimeout(() => {

            audioList.bodyAudio.play().catch(error => { })
            startRepeatAudio();

            firstBowl.current.className = 'out-scaleBtn commonButton'
        }, 2000);

        return () => {
            currentPos = { x: 0.165, y: 0.9 }
        }
    }, [])

    function clickBreadFunc() {
        let countNum = 0;

        stopRepeatAudio();

        switch (stepCount) {
            case 0:
                audioList.subBodyAudio.pause();
                
                clearTimeout(timerList[1]); audioList.wordAudio1.play().catch(error => { });

                break;

            case 1: audioList.wordAudio2.play().catch(error => { }); break;
            case 2: audioList.wordAudio3.play().catch(error => { }); break;
            case 3: audioList.wordAudio4.play().catch(error => { }); break;
            default:
                break;
        }

        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })

        makeBreadList[countNum].current.setClass('character-appear')
        let makeInterval = setInterval(() => {
            makeBreadList[countNum].current.setClass('character-disappear')
            countNum++;
            makeBreadList[countNum].current.setClass('character-appear')
            if (countNum == 2) {
                clearInterval(makeInterval)

                let cNum = 0;
                breadList[stepCount][cNum].current.setClass('character-appear')
                let showBreadInterval = setInterval(() => {
                    breadList[stepCount][cNum].current.setClass('character-disappear')
                    cNum++
                    breadList[stepCount][cNum].current.setClass('character-appear')

                    if (cNum == 2) {
                        clearInterval(showBreadInterval)
                    }
                }, 200);


                setTimeout(() => {
                    makeBreadList[2].current.setClass('character-disappear')
                }, 500);
            }
        }, 150);

        refLetterList[stepCount].current.style.pointerEvents = 'none'

        setTimeout(() => {
            if (stepCount < 3) {
                startRepeatAudio();
                changePos(posBreadList[stepCount + 1]);
                refLetterList[stepCount + 1].current.className = 'appear'
                refShowingTextList[stepCount].current.className = 'bluehalf'
                stepCount++;
            }
            else
                repeatFunc();
        }, 3000);

    }

    const repeatFunc = () => {
        changePos({ x: 0.735, y: 1 });

        setTimeout(() => {
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    changePos(posBreadList[3 - i]);
                    stepCount = 3 - i;

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
                                souseList[stepCount][cNum].current.setClass('character-appear')
                                let showBreadInterval = setInterval(() => {
                                    souseList[stepCount][cNum].current.setClass('character-disappear')
                                    cNum++
                                    souseList[stepCount][cNum].current.setClass('character-appear')

                                    if (cNum == 2) {
                                        clearInterval(showBreadInterval)
                                    }
                                }, 200);

                                setTimeout(() => {
                                    makeSouseList[2].current.setClass('character-disappear')
                                }, 500);
                            }
                        }, 150);

                        refShowingTextList[3 - i].current.className = 'bluecomeback scaleText'
                        setTimeout(() => {
                            refShowingTextList[3 - i].current.className = 'bluecomeback normalText'
                        }, 2000);


                        switch (i) {
                            case 0: audioList.wordAudio4.play().catch(error => { }); break;
                            case 1: audioList.wordAudio3.play().catch(error => { }); break;
                            case 2: audioList.wordAudio2.play().catch(error => { }); break;
                            case 3: audioList.wordAudio1.play().catch(error => { }); break;
                            default:
                                break;
                        }
                    }, 1000);
                }, 3000 * i);
            }

            // setTimeout(() => {
            //     refLetterList[0].current.className = 'bluecomeback normalText'
            // }, 12000);
        }, 1300);

        setTimeout(() => {
            nextFunc();
        }, 15000);
    }


    function changePos(pos) {
        if (refBread != null) {
            currentPos = pos
            refBread.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refBread.current.style.bottom = _baseGeo.height * currentPos.y + _baseGeo.bottom + "px"
        }
    }


    return (
        <div className="aniObject">

            {/* cups */}
            <div>
                {/* bowl - on */}
                <div
                    ref={firstBowl}
                    className='commonButton'
                    onClick={() => {
                        setTimeout(() => {
                            refLetterList[0].current.className = 'appear'
                            firstBowl.current.className = 'disable'
                            audioList.bodyAudio.pause();
                            clearTimeout(timerList[0])
                            audioList.subBodyAudio.play();

                            setRepeatAudio(audioList.subBodyAudio)
                            startRepeatAudio();
                        }, 200);

                    }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.14 + "px",
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
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
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
                        , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                        bottom: _baseGeo.height * 0.16 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream-Cup.svg"}
                    />
                </div>

                {/* bowl - it */}
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.71 + "px",
                        bottom: _baseGeo.height * 0.16 + _baseGeo.bottom + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={prePathUrl() + "images/SB_52_Prop-Interactive/SB_52_PI_Icecream-Cup.svg"}
                    />
                </div>

            </div>



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
                                ref={makeBreadList[index]}
                                scale={0.3}
                                posInfo={{ l: 0.2, t: 0.9 }}
                                className={'character-disappear'}
                                url={"animations/SB_52_Prop_Animation/SB_52_Softy_Dispencer_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }

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

            {/* breads */}
            <div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.14 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [
                            [0.7, 0.12, 0.685],
                            [0.7, 0.12, 0.635],
                            [1, 0, 0.46],
                        ].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={breadList[0][index]}
                                    scale={value[0]}
                                    posInfo={{ l: value[1], t: value[2] }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Softy_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [
                            [0.7, 0.12, 0.685],
                            [0.7, 0.12, 0.635],
                            [1, 0, 0.46],
                        ].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={breadList[1][index]}
                                    scale={value[0]}
                                    posInfo={{ l: value[1], t: value[2] }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Softy_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [
                            [0.7, 0.12, 0.685],
                            [0.7, 0.12, 0.635],
                            [1, 0, 0.46],
                        ].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={breadList[2][index]}
                                    scale={value[0]}
                                    posInfo={{ l: value[1], t: value[2] }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Softy_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.709 + "px",
                        bottom: _baseGeo.height * 0.325 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [
                            [0.7, 0.12, 0.685],
                            [0.7, 0.12, 0.635],
                            [1, 0, 0.46],
                        ].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={breadList[3][index]}
                                    scale={value[0]}
                                    posInfo={{ l: value[1], t: value[2] }}
                                    className={'character-disappear'}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Softy_" + (index + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {/* letters */}
            <div>
                {/* letter - it */}
                <div
                    className="hide" ref={refLetterList[0]}>
                    <div
                        className="commonButton"
                        onClick={clickBreadFunc}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.height * 0.2 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.14 + "px",
                            bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",

                        }}
                    >
                        <div
                            ref={refShowingTextList[0]}
                            style={{
                                position: "absolute", width: _baseGeo.width * 0.07 + "px"
                                , left: _baseGeo.width * 0.04 + "px",
                                bottom: _baseGeo.height * -0.01 + "px",
                            }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_it_1.svg"}
                            />
                        </div>
                    </div>
                </div>

                {/* letter  - up */}
                <div
                    className="hide" ref={refLetterList[1]}>
                    <div
                        onClick={clickBreadFunc}
                        className="commonButton"
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.height * 0.2 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                            bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",

                        }}
                    >
                        <div
                            ref={refShowingTextList[1]}
                            style={{
                                position: "absolute", width: _baseGeo.width * 0.065 + "px"
                                , left: _baseGeo.width * 0.05 + "px",
                                bottom: _baseGeo.height * -0.01 + "px",
                            }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_up_1.svg"}
                            />
                        </div>
                    </div>
                </div>
                {/* letter - on */}
                <div
                    className="hide" ref={refLetterList[2]}>
                    <div
                        onClick={clickBreadFunc}
                        className="commonButton"
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.height * 0.2 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                            bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",

                        }}
                    >
                        <div
                            ref={refShowingTextList[2]}
                            style={{
                                position: "absolute", width: _baseGeo.width * 0.07 + "px"
                                , left: _baseGeo.width * 0.045 + "px",
                                bottom: _baseGeo.height * -0.01 + "px",
                            }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_on_1.svg"}
                            />
                        </div>
                    </div>
                </div>

                {/* letter - us */}
                <div
                    className="hide" ref={refLetterList[3]}>
                    <div
                        onClick={clickBreadFunc}
                        className="commonButton"
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.16 + "px",
                            height: _baseGeo.height * 0.2 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.71 + "px",
                            bottom: _baseGeo.height * 0.175 + _baseGeo.bottom + "px",

                        }}
                    >
                        <div
                            ref={refShowingTextList[3]}
                            style={{
                                position: "absolute", width: _baseGeo.width * 0.07 + "px"
                                , left: _baseGeo.width * 0.045 + "px",
                                bottom: _baseGeo.height * -0.01 + "px",
                            }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + "images/SB_52_Text-Interactive/SB_52_TI_us_1.svg"}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* souses */}
            <div style={{ pointerEvents: 'none' }}>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.14 + "px",
                        bottom: _baseGeo.height * 0.33 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={souseList[0][index]}
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
                        , left: _baseGeo.left + _baseGeo.width * 0.33 + "px",
                        bottom: _baseGeo.height * 0.33 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}

                                    ref={souseList[1][index]}
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
                        , left: _baseGeo.left + _baseGeo.width * 0.52 + "px",
                        bottom: _baseGeo.height * 0.33 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={souseList[2][index]}
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
                        , left: _baseGeo.left + _baseGeo.width * 0.709 + "px",
                        bottom: _baseGeo.height * 0.33 + _baseGeo.bottom + "px",
                    }}
                >
                    {
                        [0, 1, 2].map((value, index) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={souseList[3][index]}
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
        </div >
    );
}
