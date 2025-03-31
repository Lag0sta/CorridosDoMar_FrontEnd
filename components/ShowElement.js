import ReactPlayer from 'react-player';

import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const ShowElement = ({ setIsCurrentMainComponent, selectedTitle }) => {
    const [type, setType] = useState("");
    const [content, setContent] = useState({});
    const [formatedContent, setFormatedContent] = useState([]);

    const search = useSelector((state) => state.search.value);
    console.log("SelectedTitleSearch :", type)
    console.log("content", content)
    console.log("formatedContent", formatedContent)

    useEffect(() => {
        console.log("ShowElement useEffect Actif")
        for (const element of search) {
            console.log("ShowElement useEffect for() Actif")

            if (element.title === selectedTitle) {
                console.log("ShowElement useEffect 1st if() Actif")

                console.log("selectedElement", element)
                setType(element.type);
                setContent(element);
            }
        }
            const JSX = (
                <div className="h-screen">
                     {type === "biography" && content.links.map((link,) => (
                        <div>
                            {link.type === "img" && <img src={link.link} />}                    
                        </div>
                    ))}
                    <div className='mt-6 mb-6'>
                        <h2 className="text-center -mb-1 leading-tight ">{content.title}</h2>
                        <h3 className="text-center">{content.secondaryTitle}</h3>
                    </div>
    
                    {(type === "song" || type === "biography" || type === "rythm" || type === "lexicon") && content.mainText.map((mtContent, index) => (
                        <div key={index} className={`${mtContent.type} + flex flex-col justify-center`}>
                            {mtContent.text.map((sentence, index) => (
                                <span key={index} className='text-center'>{sentence}</span>
                            ))}
                        </div>))}
    
                    {(type === "song" || type === "biography" || type === "rythm") && content.links.map((link, index) => (
                        
                        <div className='w-[350px] h-[197px]'>
                            {(link.type === "video" && link.link) && (
                                <ReactPlayer key={index} url={link.link} controls width="100%" height="100%" />
                            )}
                            {(link.type === "audio" && link.link) && (
                                <ReactPlayer key={index} url={link.link} controls width="100%" height="100%" />
                            )}
    
                        </div>
    
                    ))}
                </div>
            );

        setFormatedContent([JSX]);
        
    }, [type])

    return (
        <div className=" h-[100%]">
            {formatedContent}
        </div>

    )
}

export default ShowElement
