import { useState, useEffect, use } from "react";
import { useDispatch } from "react-redux";
import ReactPlayer from 'react-player';
import { useAppSelector } from '../store/hooks';
import { initialise } from "../store/reducers/editSubmits";
import { initMainText } from "../store/reducers/handleMainText";
import { initLinks } from "../store/reducers/handleLinks";
import EditElement from "./EditElement";

interface Props {
    setCurrentMainComponent: (value: string) => void;
    selectedTitle: string;
}

interface Link {
    link: string;
    type: string;
}

interface MainText {
    text: string[];
    type: string;
}

interface SubmitData {
    type: string;
    title: string;
    secondaryTitle: string;
    secondaryType: string;
    mainText: MainText[];
    links: Link[];
    createdBy: string;
    creationDate: Date;
    latestUpdate: Date;
    authorised: boolean;
}

const ShowElement = ({ setCurrentMainComponent, selectedTitle }: Props) => {
    const [content, setContent] = useState<SubmitData | null>(null);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isEditOn, setIsEditOn] = useState<boolean>(false);
    const search = useAppSelector((state) => state.search.value);
    const token = useAppSelector((state) => state.authToken.value);
    const dispatch = useDispatch();
    console.log("content", content)
    console.log("isUser", isUser)
    console.log("ShowElementSearch", search)

    useEffect(() => {
        const fetchData = async () => {
            console.log("ShowElementToken", token, "ShowElementContent", content)
            if (token && content) {
                console.log("token && content", true)
                try {
                    const response: Response = await fetch("http://localhost:3000/auths/editSubmit", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            accessToken: token,
                            _id: content.createdBy
                        }),
                    });
                    const data = await response.json();
                    console.log("dataShowElements", data);
                    setIsUser(data.result);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        fetchData();
    }, [token, content]);

    useEffect(() => {
        const foundElement = search.find((element) => element.title === selectedTitle);

        if (foundElement) {
            setContent(foundElement);
        }
    }, [selectedTitle, search]);

    if (!content) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    function handleEdit() {
        setIsEditOn(true);

        if (!content) return;
        
        const contentToEdit = {
            type: content.type,
            title: content.title,
            secondaryTitle: content.secondaryTitle,
            secondaryType: content.secondaryType,
            mainText: content.mainText,
            links: content.links,
        } 
        
        dispatch(initialise(contentToEdit))
        dispatch(initMainText(contentToEdit.mainText))
        dispatch(initLinks(contentToEdit.links))
    }

    return (
        <div className="h-screen overflow-auto px-4 py-6">
            {isEditOn && (
                <EditElement setIsEditOn={(value: boolean) => setIsEditOn(value)}
                />
            )
            }
            {!isEditOn && (
                <div>
                { isUser && (
                    <div className="flex justify-end">
                        <div className="w-fit py-1 px-2 flex bg-black rounded-md stroke-white text-white hover:bg-yellow-400 "
                            onClick={() => handleEdit()}>
                            <span className="mr-1 text-lg   ">Modifier</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                    </div>
                )}
            {content.type === "biography" && content.links.map((link, index) => (
                link.type === "img" && (
                    <div key={index} className="mb-4">
                        <img src={link.link} alt={`media-${index}`} className="mx-auto max-w-full" />
                    </div>
                )
            ))}

            <div className='mt-6 mb-6'>
                <h2 className="text-center text-xl font-semibold">{content.title}</h2>
                <h3 className="text-center text-md text-gray-600">{content.secondaryTitle}</h3>
            </div>

            {/* includes va chercher les type. du Arr dans content */}
            {["song", "biography", "rythm", "lexicon"].includes(content.type) &&
                content.mainText.map((mtContent, index) => (
                    <div key={index} className={`mt-4 ${mtContent.type} flex flex-col items-center`}>
                        {mtContent.text.map((sentence, i) => (
                            <span key={i} className='text-center'>{sentence}</span>
                        ))}
                    </div>
                ))
            }

            {/* includes va chercher les type. du Arr dans content */}
            {["song", "biography", "rythm"].includes(content.type) &&
                content.links.map((link, index) => (
                    (["video", "audio"].includes(link.type) && link.link) && (
                        <div key={index} className='w-[350px] h-[197px] mx-auto my-4'>
                            <ReactPlayer url={link.link} controls width="100%" height="100%" />
                        </div>
                    )
                ))
            }
            </div>
            )}

        </div>
    );
};

export default ShowElement;
