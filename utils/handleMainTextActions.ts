import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addMainText, incrementIndex, decrementIndex, editMainText, remove, clear } from "../store/reducers/handleMainText";

interface handleSubmitTextProps {
    radioChoice : string;
    setRadioChoice : (value : string) => void;
    text : string;
    setText : (value : string) => void;
    setTextError :(value : string) => void;
    dispatch : AppDispatch;
}

//enregistre les textes du mainText dans le reducer
export const handleSubmitText = ({ radioChoice, setRadioChoice, text, setText, setTextError, dispatch } : handleSubmitTextProps) => {
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

    dispatch(addMainText({text: mainText , type: radioChoice }));    
    setText("");
    setRadioChoice("autre");
}

interface handleIncrementIndexProps {
    index : number;
    dispatch : AppDispatch
}

//augmente l'index
export const handleIncrementIndex = ({ index, dispatch } : handleIncrementIndexProps ) : void => {
    console.log("click", index)
    dispatch(incrementIndex(index))
};


interface handleDecrementIndexProps {
    index : number;
    dispatch : AppDispatch
}
//diminue l'index
export const handleDecrementIndex = ({ index, dispatch } : handleDecrementIndexProps) : void => {
    console.log("click", index)

    dispatch(decrementIndex(index))
 };


 interface handleEditTextProps {
    dispatch : AppDispatch;
    editedText : string[];
    setEditedText : (value : string[]) => void;
    selectedType : string;
    setSelectedType : (value : string) => void;
}
//modifie la valeur du reducer
export const handleEditText = ({ dispatch ,editedText, setEditedText, selectedType, setSelectedType } : handleEditTextProps ) : void => {
    console.log("text, type", editedText, selectedType)
    console.log("editedText in handleEditTextNext", editedText)
    const mainText = [];
    console.log("editedText type:", typeof editedText, "Is array?", Array.isArray(editedText), "Value:", editedText);

    mainText.push(...editedText.join("\n").split(/[\r\n]+/).filter(item => item !== ""))
    console.log("text of Edit:", mainText, "type", selectedType)
    dispatch(editMainText({text : mainText, type: selectedType}))
    setSelectedType("");
    setEditedText([""]);
}


interface handleDeleteTextProps {
    dispatch : AppDispatch
    index: number;
}
//efface le texte selectionné
export const handleDeleteText = ({dispatch, index} : handleDeleteTextProps) : void => {
    dispatch(remove(index));
}

//reset tout le reducer
export const clearMainText = (dispatch : AppDispatch) => {
    dispatch(clear())
}