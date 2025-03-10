import { useDispatch } from "react-redux";
import { add, remove, clear } from "../reducers/submitLinks";


//enregistre les liens Images dans le reducer
export const handleSubmitImgLink = ({ imgLink, setImgLink, setImgLinkError, linksData, dispatch }) => {
    console.log("click")
    console.log("imgLink", imgLink)
    setImgLinkError("")
    if (!imgLink) {
        setImgLinkError("Please enter a link");
        return;
    }

    for (const links of linksData) {
        if (links.type === "img") {
            setImgLinkError("Already added an img");
            return;
        }
    }
    dispatch(add({ link: imgLink, type: "img" }));    
    setImgLink("");

}

//enregistre les liens Medias dans le reducer
export const handleSubmitMediaLink = ({ link, setLink, setLinkError, linksData, dispatch, radioChoice }) => {
    setLinkError("");
    if (!radioChoice) {
        setLinkError("Please choose the type of link");
        return;
    }

    if (!link) {
        setLinkError("Please fill in the required fields");
        return;
    }

    for (const links of linksData) {
        if (links.link === link && links.type === radioChoice) {
            setLinkError("Already added this link");
            return;
        }
    }

    dispatch(add({ link: link, type: radioChoice }));
    setLink("");
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

