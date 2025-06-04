import { useDispatch } from "react-redux";
import { add, remove, clear } from "../store/reducers/handleLinks";
import { AppDispatch } from "../store/store";

interface Link {
    link : string;
    type : string;
}

interface handleSubmitImgLinkProps {
    imgLink : string;
    setImgLink : (value : string) => void;
    setImgLinkError : (value : string) => void;
    linksData: Link[];
    dispatch : AppDispatch
}

//enregistre les liens Images dans le reducer
export const handleSubmitImgLink = ({ imgLink, setImgLink, setImgLinkError, linksData, dispatch } : handleSubmitImgLinkProps) => {
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

interface handleSubmitMediaLinkProps {
    link : string;
    setLink : (value : string) => void;
    setLinkError : (value : string) => void;
    linksData : Link[];
    dispatch : AppDispatch;
    radioChoice : string
}

//enregistre les liens Medias dans le reducer
export const handleSubmitMediaLink = ({ link, setLink, setLinkError, linksData, dispatch, radioChoice } : handleSubmitMediaLinkProps) => {
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

interface handleRemoveLinksProps{
    index: number;
    dispatch: AppDispatch;
    imgLinkError : string;
    setImgLinkError : (value : string) => void;
    linkError : string;
    setLinkError : (value : string) => void;
}

//supprime le lien du reducer
export const handleRemoveLinks = ({ index, dispatch ,imgLinkError = "", setImgLinkError, linkError, setLinkError } : handleRemoveLinksProps) => {
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
export const clearLinks = (dispatch : AppDispatch) => {
    dispatch(clear())
}

