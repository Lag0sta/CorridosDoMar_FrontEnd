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

        if (type === "song") {
            console.log("ShowElement useEffect 2nd if() Actif")

            const JSX = (
                <div className="h-screen">
                    <h2 className="text-center">{content.title}</h2>
                    <h3 className="text-center">{content.secondaryTitle}</h3>
                    <div>
                        {content.mainText.map((sentence, index) => (
                            <p key={index} className="text-center">{sentence}</p>))}
                    </div>
                    <div>
                        
                    </div>
                </div>
            );
            console.log('JSX', JSX)
            setFormatedContent([JSX]);
        }

        if (type === "biography") {
            console.log("ShowElement useEffect 2nd if() Actif")

            const JSX = (
                <div className="h-screen">
                    <h2 className="text-center">{content.title}</h2>
                    <h3 className="text-center">{content.secondaryTitle}</h3>
                    <div>
                        {content.mainText.map((sentence, index) => (
                            <p key={index} className="text-center">{sentence}</p>))}
                    </div>
                </div>
            );
            console.log('JSX', JSX)
            setFormatedContent([JSX]);
        }
    }, [type])






    return (
        <div className=" h-[100%]">
            {formatedContent}
        </div>

    )
}

export default ShowElement
