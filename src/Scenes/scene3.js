import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage";
import { UserContext } from "../components/BaseShot";
import {prePathUrl} from "../components/CommonFunctions"

let imageCount = 0;

export default function Scene({ nextFunc, _geo, startTransition, _clickedRoomNum, _baseGeo }) {


    const audioList = useContext(UserContext)

    useEffect(() => {
        audioList.bodyAudio.src = "./sounds/EP_52_Audio_52.mp3"

        imageCount = 0;
        let timer = setTimeout(() => {
            baseObject.current.className = 'aniObject'
        }, 1500);

        const timer1 = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
        }, 2000);

        return () => {
            clearTimeout(timer)
            clearTimeout(timer1)
            audioList.bodyAudio.pause();
        }
    }, [])

    const baseObject = useRef();
    const sceneNumList = [3, 6]
    const highLightList = [
        useRef(),
        useRef()
    ]

    function loadImage() {
        imageCount++;
        if (imageCount == 2)
            baseObject.current.className = 'aniObject'
    }

    const clickFunc = (num) => {
        if (highLightList[num].current != null)
            highLightList[num].current.setStyle([{ key: 'opacity', value: 1 }])

        startTransition(num)
        audioList.bodyAudio.pause();
        setTimeout(() => {
            audioList.wooAudio.play().catch(error => { })
        }, 300);
        setTimeout(() => {
            nextFunc(sceneNumList[num]);
        }, 600);
    }



    return (
        <div ref={baseObject}
            className="hideObject">
            <div
                className="commonButton"
                onClick={() => { clickFunc(0) }}
                style={{
                    position: "fixed", width: _geo.width * 0.33 + "px",
                    height: _geo.width * 0.38 + "px"
                    , left: _geo.left + _geo.width * 0.1 + "px",
                    bottom: _geo.top + _geo.height * 0.15 + "px",
                    // opacity: _clickedRoomNum == 1 ? '0.7' : '1',
                    // pointerEvents: _clickedRoomNum == 1 ? 'none' : ''
                }}>
                <BaseImage
                    url={"SB_52_Icons/SB_52_Magic_Icon.svg"}
                    onLoad={loadImage}
                />
                {_clickedRoomNum != 0 &&
                    < BaseImage
                        ref={highLightList[0]}
                        url={"SB_52_Icons/SB_52_Magic-Icecream_Icon_Highlight.svg"}
                        style={{ opacity: 0 }}
                    />
                }
            </div>
            <div

                className="commonButton"
                onClick={() => { clickFunc(1) }}
                style={{
                    position: "fixed", width: _geo.width * 0.33 + "px",
                    height: _geo.width * 0.38 + "px"
                    , right: _geo.left + _geo.width * 0.1 + "px",
                    bottom: _geo.top + _geo.height * 0.15 + "px",
                    // opacity: _clickedRoomNum == 2 ? '0.7' : '1',
                    // pointerEvents: _clickedRoomNum == 2 ? 'none' : ''
                }}>

                <BaseImage
                    url={"SB_52_Icons/SB_52_Icecream_Icon.svg"}
                    onLoad={loadImage}
                />
                {_clickedRoomNum != 1 &&
                    < BaseImage
                        ref={highLightList[1]}
                        url={"SB_52_Icons/SB_52_Magic-Icecream_Icon_Highlight.svg"}
                        style={{ opacity: 0 }}
                    />
                }
            </div>

        </div>
    );
}