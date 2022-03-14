import {prePathUrl} from "../components/CommonFunctions"

const loadSound = (name, isEffectSound = false) => {
    return new Audio("./sounds/" + (isEffectSound ? "/effect/" :"") + name + ".mp3")
}

export default loadSound