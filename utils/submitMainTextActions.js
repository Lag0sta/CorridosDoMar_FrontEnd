import { useDispatch } from "react-redux";
import { add, incrementIndex, decrementIndex, edit, remove, clear } from "../reducers/submitMainText";


//enregistre les textes du mainText dans le reducer
export const handleSubmitText = ({ radioChoice, setRadioChoice, text, setText, setTextError, textData, dispatch }) => {
    console.log("click")
    console.log("text", text)
    setTextError("")
    if(!radioChoice) {
        setTextError("Please choose the type of text");
        return;
    }
    if (!text) {
        setTextError("Please enter a text");
        return;
    }

    const mainText = [];
    mainText.push(...text.split(/[\r\n]+/))
    console.log("mainText", mainText)

    dispatch(add({text: mainText , type: radioChoice }));    
    setText("");
    setRadioChoice("");
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
export const handleEditText = ({ index, dispatch ,editedText, setEditedText, selectedType, setSelectedType }) => {
    console.log("index", index)
    console.log("index, text, type", index, editedText, selectedType)
    const mainText = [];
    mainText.push(...editedText.split(/[\r\n]+/))
    console.log("text :", mainText, "type", selectedType)
    dispatch(edit({text : mainText, type: selectedType}))
    setSelectedType("");
    setEditedText([""]);
}

//reset tout le reducer
export const clearLinks = (dispatch) => {
    dispatch(clear())
}

