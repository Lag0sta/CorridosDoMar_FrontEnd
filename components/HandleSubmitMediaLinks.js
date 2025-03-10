import TextOverflow from "react-text-overflow";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { add, remove, } from "../reducers/submitLinks";
import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleRemoveLinks, handleSubmitMediaLink } from "../utils/submitLinksActions";

const HandleSubmitMediaLinks = () => {

    const [link, setLink] = useState("")
    const [imgLink, setImgLink] = useState("")
    const [ImgLinkError, setImgLinkError] = useState("")
    const [linkError, setLinkError] = useState("")
    const [radioChoice, setRadioChoice] = useState('');


    const dispatch = useDispatch();
    const linksData = useSelector((state) => state.submitLinks.value);


    // enregistre le choix de media
    const handleRadioChange = (event) => {
        setRadioChoice(event.target.value);
    };
    return (

        <div className="mt-2 mb-4 p-1 bg-gray-200 rounded-md flex flex-col">
            <h3>Link to music/video:</h3>

            <div className="bg-gray-800 rounded-md flex mx-4 px-2 py-2">
                <span className="text-red-500 text-sm">Attention!</span>
                <span className="mx-4  text-xs text-yellow-500">
                    Si lien youtube : allez ne pas mettre l'URL! allez dans "partager/share", cliquez sur embed et copier l'URL du src sans les guillemets!
                </span>
            </div>

            <div>
                <div className="w-[90%] my-2 ml-4 py-2 px-2 border border-white border-3 rounded-md bg-white">
                    <div className="flex">
                        <div>
                            <input type="radio" name="mediaType" value="audio" onChange={(e) => handleRadioChange(e)} />
                            <label for="audio">Audio</label>
                        </div>
                        <div>
                            <input type="radio" name="mediaType" value="video" onChange={(e) => handleRadioChange(e)} />
                            <label for="video">Video</label>
                        </div>
                    </div>

                    <input
                        className="border-none w-full bg-gray-200 text-black p-2"
                        placeholder="Music/video link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    {linkError && <p className="text-red-500 text-sm">{linkError}</p>}
                    <button className="px-2 py-1 rounded-lg bg-black text-md text-white "
                        onClick={() => handleSubmitMediaLink({
                                        radioChoice, 
                                        linksData, 
                                        link, 
                                        setLink,
                                        dispatch, 
                                        linkError, 
                                        setLinkError
                        })}>
                        submit
                    </button>

                    <div className=" bg-black rounded-md">
                        {linksData.map((link, index) => (
                            link.type !== "img" && 
                            (<div key={index} className=" px-2 flex flex-raw justify-between align-center my-2 pb-2 pt-1 border-b border-white  text-white">
                                <span className="mr-6 text-sm text-yellow-500 inline-block" >{link.type}</span>
                                <TextOverflow text={link.link} className="inline-block" />

                                <button className="ml-6 px-2 py-1 rounded-lg bg-yellow-500 text-xs text-white "
                                    onClick={() => handleRemoveLinks({ index, dispatch, linkError, setLinkError })}>
                                    REMOVE
                                </button>
                            </div>)
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HandleSubmitMediaLinks
