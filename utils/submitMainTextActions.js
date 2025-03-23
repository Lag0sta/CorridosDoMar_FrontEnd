import { useDispatch } from "react-redux";
import { add, incrementIndex, decrementIndex, remove, clear } from "../reducers/submitMainText";


//enregistre les textes du mainText dans le reducer
export const handleSubmitText = ({ radioChoice, text, setText, setTextError, textData, dispatch }) => {
    console.log("click")
    console.log("text", text)
    setTextError("")
    if (!text) {
        setTextError("Please enter a text");
        return;
    }

    const mainText = [];
    mainText.push(...text.split(/[\r\n]+/))
    console.log("mainText", mainText)

    dispatch(add({text: mainText , type: radioChoice }));    
    setText("");

}

//enregistre les liens Medias dans le reducer
export const handleIncrementIndex = ({ index, dispatch }) => {
    console.log("click", index)
   dispatch(incrementIndex(index))
};

export const handleDecrementIndex = ({ index, dispatch }) => {
    console.log("click", index)

    dispatch(decrementIndex(index))
 };

//supprime le lien du reducer
export const handleRemoveLinks = ({ index, dispatch ,imgLinkError, setImgLinkError, linkError, setLinkError }) => {
    console.log("index", index)
    dispatch(remove(index))
    if (imgLinkError) {
        setImgLinkError("")
        return
    }
    if (linkError) {
        setLinkError("")
        return
    }   
}

//reset tout le reducer
export const clearLinks = (dispatch) => {
    dispatch(clear())
}

