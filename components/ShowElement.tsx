import { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { useAppSelector } from '../store/hooks';

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
    const search = useAppSelector((state) => state.search.value);

    useEffect(() => {
        const foundElement = search.find((element) => element.title === selectedTitle);

        if (foundElement) {
            setContent(foundElement);
        }
    }, [selectedTitle, search]);

    if (!content) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    return (
        <div className="h-screen overflow-auto px-4 py-6">

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
    );
};

export default ShowElement;
