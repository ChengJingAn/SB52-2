import React, { useEffect, useContext, useRef } from 'react';
import "../stylesheets/styles.css";
import BaseImage from '../components/BaseImage';
import { blinkFunc, stopBlinkFunc } from '../components/CommonFunctions';
import { UserContext } from '../components/BaseShot';
import {prePathUrl} from "../components/CommonFunctions"

let timerList = []

var currentEyeIndex = 0;
var isPlusing = true;
let timeInterval2

let imageCount = 0;
export default function Scene2({ nextFunc, _geo, isOneStepFinished, completedCount, _baseGeo }) {

    const audioList = useContext(UserContext)

    let eyeBlinkNumbers = []

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),

        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ]
    const baseObject = useRef()

    function loadImage() {
        imageCount++;
        if (imageCount == 4)
            baseObject.current.className = 'aniObject'
    }

    useEffect(fomartFunc, [])


    function fomartFunc() {
        eyeBlinkNumbers[0] = blinkFunc(eyeList.slice(0, 4), 100, 2000)
        eyeBlinkNumbers[1] = blinkFunc(eyeList.slice(-4), 500, 2500)

        isPlusing = true;
        currentEyeIndex = 0;
        for (let i = 1; i < 4; i++)
            eyeList[i].current.setClass('character-disappear')

        const timeInterval1 = setInterval(() => {
            clearInterval(timeInterval2)
            timeInterval2 = setInterval(() => {

                eyeList[currentEyeIndex].current.setClass('character-disappear')
                if (isPlusing) {
                    if (currentEyeIndex > 2) {
                        isPlusing = false
                        currentEyeIndex--
                    }
                    else
                        currentEyeIndex++
                }
                else {
                    if (currentEyeIndex == 0) {
                        isPlusing = true;
                        clearInterval(timeInterval2)
                    }
                    else
                        currentEyeIndex--
                }

                eyeList[currentEyeIndex].current.setClass('character-appear')

            }, 100);
        }, 2500);


        timerList = []
        if (completedCount == 0) {
            if (isOneStepFinished) {
                audioList.bodyAudio.src = "./sounds/EP_52_Audio_50.mp3"
                timerList[0] = setTimeout(() => {
                    audioList.bodyAudio.play()
                }, 2000);

                timerList[0] = setTimeout(() => {
                    nextFunc();
                }, 10000);


            }
            else {
                audioList.bodyAudio.src = "./sounds/EP_52_Audio_43.mp3"
                timerList[0] = setTimeout(() => {
                    audioList.bodyAudio.play()
                }, 2000);

                timerList[1] = setTimeout(() => {
                    nextFunc()
                }, 5000);
            }
        }
        else {
            if (isOneStepFinished) {
                audioList.bodyAudio.src = "./sounds/EP_52_Audio_51_A.mp3"
                audioList.subBodyAudio.src = "./sounds/EP_52_Audio_51_B.mp3"
                timerList[0] = setTimeout(() => {
                    audioList.bodyAudio.play();
                    timerList[1] = setTimeout(() => {
                        audioList.subBodyAudio.play();
                    }, 5000);
                }, 2000);

                timerList[2] = setTimeout(() => {
                    nextFunc();
                }, 12000);
            }
            else {
                audioList.bodyAudio.src = "./sounds/EP_52_Audio_43.mp3"
                timerList[0] = setTimeout(() => {
                    audioList.bodyAudio.play();
                }, 2000);

                timerList[1] = setTimeout(() => {
                    nextFunc();
                }, 5000);
            }
        }

        imageCount = 0;
        let timer = setTimeout(() => {
            baseObject.current.className = 'aniObject'
        }, 3000);

        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])

            audioList.bodyAudio.pause();
            audioList.subBodyAudio.pause();
            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])
            clearTimeout(timer)

            clearInterval(timeInterval1)
            clearInterval(timeInterval2)
        }
    }


    return (
        <div
            ref={baseObject}
            className="hideObject"
        >
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.7 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.15 + "px",
                    bottom: 0.15 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Transition_BG_1/SB_52_Transition_BG_1_Board.svg"}
                />
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.6 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.2 + "px",
                    bottom: 0.19 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Transition_BG_1/SB_52_Transition_BG_1_Drawings-on-Board.svg"}
                />
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.23 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.39 + "px",
                    bottom: 0.4 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Transition_BG_2/SB_52_Transition_BG_2_Text.svg"}
                />
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.4 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.3 + "px",
                    bottom: 0.03 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Transition_BG_1/SB_52_Transition_BG_1_Books-Pencils.svg"}
                />
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.23 + "px",
                    height: _baseGeo.width * 0.23 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.665 + "px",
                    bottom: 0.34 * _baseGeo.height + "px",
                }}>

                <BaseImage
                    onLoad={loadImage}
                    posInfo={{ l: 0.1, t: 0.14 }}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Tansition_BG_Boy.svg"}
                />

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.08}
                                onLoad={value == 0 ? loadImage : null}
                                posInfo={{ l: 0.37, t: 0.325 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Tansition_BG_Boy_Eye_0" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.13 + "px",
                    height: _baseGeo.width * 0.13 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.15 + "px",
                    bottom: 0.25 * _baseGeo.height + "px",
                }}>

                <BaseImage
                    posInfo={{ l: 0.1, t: 0.14 }}
                    onLoad={loadImage}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Tansition_BG_Girl.svg"}
                />

                {
                    [4, 5, 6, 7].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.29}
                                posInfo={{ l: 0.6, t: 0.54 }}
                                onLoad={value == 4 ? loadImage : null}
                                className={value != 4 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Tansition_BG_Girl_Eye_0" + (value - 3) + ".svg"}
                            />
                        )
                    })
                }
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.1 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.88 + "px",
                    bottom: 0.07 * _baseGeo.height + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB_52_BG/SB_52_Transition_BG_1/SB_52_Transition_BG_1_Bag-Globe.svg"}
                />
            </div>

            <div
                className='commonButton'
                onClick={() => {
                    setTimeout(() => {
                        nextFunc(); 
                    }, 200);
                }}
                style={{
                    position: "fixed", width: _geo.width * 0.06 + "px",
                    right: "2%"
                    , bottom: "2%", cursor: "pointer",
                }}>
                <img draggable={false}
                    width={"100%"}
                    src={prePathUrl() + 'images/Buttons/Skip_blue.svg'}
                />
            </div>



        </div>
    );
}
