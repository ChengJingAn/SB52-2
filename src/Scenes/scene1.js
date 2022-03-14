import React, { useEffect, useRef, useContext, useState } from 'react';
import "../stylesheets/styles.css";
import { initialAudio, blinkFunc, stopBlinkFunc } from '../components/CommonFunctions';
import { prePathUrl } from "../components/CommonFunctions"
import BaseImage from '../components/BaseImage';
let eyeBlinkNumbers = []

import { UserContext } from '../components/BaseShot';
let imageCount = 0;
let isGameplaying = false;
let activeTimer

let timerList = []
const Scene1 = React.forwardRef(({ nextFunc, _geo, _baseGeo }, ref) => {


    const audioList = useContext(UserContext)
    const [isShow, setShow] = useState(false)

    // const playBtnRef = useRef();
    const introText = useRef();
    const introHolder = useRef();

    const baseObject = useRef()

    function loadImage() {
        imageCount++;
        if (imageCount == 11) {
            activeFunc();
            clearTimeout(activeTimer)
        }
    }


    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),

        useRef(),
        useRef(),
        useRef(),
        useRef(),

        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]

    // if (isShow) {
    //     introHolder.current.style.top = '-7%'
    // }



    useEffect(fomartFunc, [])

    function clickFunc() {
        if (!isGameplaying)
            initialAudio(audioList)

        setTimeout(() => {
            if (!isGameplaying) {
                isGameplaying = true
            }

            audioList.backAudio.play().catch(error => {
            });

            nextFunc();
        }, 200);

    }


    function activeFunc() {
        baseObject.current.className = 'aniObject'
        imageCount == 11


        // timerList[0] = setTimeout(() => {
        //     timerList[1] = setTimeout(() => {
        //         introHolder.current.style.top = '-7%'
        //         introText.current.className = 'introText'
        //     }, 300);
        //     setShow(true)
        // }, 1000);

        setTimeout(() => {
            // audioList.titleAudio.play();
        }, 1000);

        setTimeout(() => {
            // playBtnRef.current.className = 'introText'
            // playBtnRef.current.style.pointerEvents = 'none'
        }, 2500);

        setTimeout(() => {
            // playBtnRef.current.className = 'commonButton'
            // playBtnRef.current.style.pointerEvents = ''
        }, 3500);
    }

    function fomartFunc() {

        activeTimer = setTimeout(() => {
            activeFunc()
        }, 3000);

        imageCount = 0;
        // introHolder.current.style.top = '-40%'

        // playBtnRef.current.style.pointerEvents = 'none'
        // if (playBtnRef.current != null)
        //     playBtnRef.current.className = 'hide'

        eyeBlinkNumbers[0] = blinkFunc(eyeList.slice(0, 4), 1500, 2000)
        eyeBlinkNumbers[1] = blinkFunc(eyeList.slice(4, 8), 500, 2500)
        eyeBlinkNumbers[2] = blinkFunc(eyeList.slice(-4), 100, 2100)

        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])

            timerList.map(timer => {
                clearTimeout(timer)
            })

            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;
        }
    }



    return (
        <div ref={baseObject} className='hideObject'>


            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px"
                    , left: _baseGeo.left + "px",
                    bottom: -0.1 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_/SB_52_Intro_BG_1_Ground.svg"}
                />
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.4 + "px"
                    , left: _baseGeo.left + "px",
                    bottom: 0.17 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_/SB_52_Intro_BG_1_Play-House_1.svg"}
                />
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.4 + "px"
                    , right: _baseGeo.left + "px",
                    bottom: 0.17 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_/SB_52_Intro_BG_1_Play-House_2.svg"}
                />
            </div>
            <div
                ref={introHolder}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.45 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.275 + "px",
                    top: '-7%',
                    // transition: '0.5s'
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_2/SB_52_Intro_BG_2_Text-Holder.svg"}
                />
            </div>

            <div
                ref={introText}
                // className='hide'
                style={{
                    position: "fixed", width: _baseGeo.width * 0.25 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.375 + "px",
                    top: '0%',
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_2/SB_52_Intro_BG_2_Text.svg"}
                />
            </div>


            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.14 + "px",
                    height: _baseGeo.width * 0.14 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.625 + "px",
                    bottom: 0.22 * _baseGeo.height + "px",
                }}>


                <BaseImage
                    posInfo={{ l: 0.1, t: 0.14 }}
                    onLoad={loadImage}
                    url={"animations/SB_52_Character_Eye-Blink/Intro_boy_02.svg"}
                />

                {
                    [4, 5, 6, 7].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.23}
                                posInfo={{ l: 0.315, t: 0.335 }}
                                className={value != 4 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/Intro_boy_02_Eye_0" + (value - 3) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.17 + "px",
                    height: _baseGeo.width * 0.17 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.2 + "px",
                    bottom: 0.2 * _baseGeo.height + "px",
                }}>
                <BaseImage
                    posInfo={{ l: 0.1, t: 0.14 }}
                    onLoad={loadImage}
                    url={"SB_52_BG/SB_52_Intro_BG_2/SB_52_Intro_BG_2_Boy-with-box.svg"}
                />

                {
                    [8, 9, 10, 11].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.225}
                                posInfo={{ l: 0.295, t: 0.365 }}
                                className={value != 8 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/Intro_boy_01_Eye_0" + (value - 7) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.34 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.36 + "px",
                    bottom: 0.1 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Intro_BG_2/SB_52_Intro_BG_2_Boxes.svg"}
                />
            </div>

            {/* Girl */}
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.09 + "px",
                    height: _baseGeo.width * 0.147 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.575 + "px",
                    bottom: 0.3 * _baseGeo.height + "px",
                }}>
                <BaseImage
                    onLoad={loadImage}
                    url={"animations/SB_52_Character_Eye-Blink/Intro_girl.svg"}
                />

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.38}
                                posInfo={{ l: 0.13, t: 0.14 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/Intro_girl_Eye_0" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
                <BaseImage
                    scale={1}
                    onLoad={loadImage}
                    posInfo={{ t: -0.38, l: -0.045 }}
                    url={"animations/SB_52_Character_Eye-Blink/Intro_girl_hair.svg"}
                />

            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.07 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.65 + "px",
                    bottom: 0.275 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    onLoad={loadImage}
                    src={prePathUrl() + "images/animations/SB_52_Character_Eye-Blink/Intro_boy_02_Left_Hand.svg"}
                />
            </div>

            <div
                className='commonButton'
                onClick={clickFunc}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px",
                    left: _baseGeo.width * 0.46 + _baseGeo.left + "px"
                    , bottom: _baseGeo.height * 0.43 + "px"
                }}>
                <img
                    draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                />
            </div>
        </div>
    );
});

export default Scene1;
