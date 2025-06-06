import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { handleEditContent } from "../utils/handleEditSubmitedContent";
import { editTitle, editSecondaryTitle } from "../store/reducers/editSubmits";
import { editMainText, } from "../store/reducers/handleMainText";
import { handleEditText, handleDecrementIndex, handleIncrementIndex } from "../utils/handleMainTextActions";
import HandleEditMainText from "./HandleEditMainText";

interface Props {
    setIsEditOn: (value: boolean) => void;
}
const EditElement = ({ setIsEditOn }: Props) => {

    const contentToEdit = useAppSelector((state) => state.editSubmit.value);
    console.log("contentToEdit", contentToEdit)
    const contentMainText = useAppSelector((state) => state.editSubmit.value.mainText);
    console.log("contentMainText", contentMainText)
    const contentLinks = useAppSelector((state) => state.editSubmit.value.links);
    const dispatch = useDispatch();
    const token = useAppSelector((state) => state.authToken.value);

    const [type, setType] = useState(contentToEdit.type)
    const [title, setTitle] = useState(contentToEdit.title)
    const [secondaryTitle, setSecondaryTitle] = useState(contentToEdit.secondaryTitle || "unknown")
    const [secondaryType, setSecondaryType] = useState(contentToEdit.secondaryType)
    const [selectedSubType, setSelectedSubType] = useState("");
    const [mainText, setMainText] = useState(contentMainText)
    const [editedText, setEditedText] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState<number>(-1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [succesMessage, setSuccessMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const textData = useAppSelector((state) => state.handleMainText.value);

    const [links, setLinks] = useState(contentLinks);

    console.log("EditElementContent", mainText)
    function handleReturn() {
        setIsEditOn(false);
    }

    useEffect(() => {
        setTitle(contentToEdit.title)
        if (!contentToEdit.secondaryTitle) {
            setSecondaryTitle("unknown")
        } else {
            setSecondaryTitle(contentToEdit.secondaryTitle)
        }
        setMainText(contentToEdit.mainText)
    }, [contentToEdit])

    function handleSave() {
        const props = {token, type, title, secondaryTitle, secondaryType, mainText, links, setIsEditOn, selectedSubType, setError, setIsEditModalOpen, setLoading, dispatch, setSuccessMessage
        }
        handleEditContent(props)
    }

    const HandleEditTextClick = (index: number): void => {
        console.log("click Edit")
        setIsModalOpen(true);
        console.log("indexToEdit", index)
        console.log("textData[index]", textData[index])

        const textArr: string[] = [];

        for (let i = 0; i < textData.length; i++) {
            if (index === i) {
                console.log("setRadioChoice", textData[i].type);
                setSelectedType(textData[i].type);

                // Vérifie si textData[i].text est un tableau
                if (Array.isArray(textData[i].text)) {
                    for (const text of textData[i].text) {
                        textArr.push(text);
                        console.log("textARRRRRRRR", textArr)

                    }
                } else {
                    // Si textData[i].text est une chaîne de caractères, on la traite comme tel
                    textArr.push(textData[i].text + "\n");
                }
                setIndexToRemove(index);
            }
        }
        setEditedText(textArr);
    };

    return (
        <div>
            <div className="flex justify-end">
                <span className="text-center bg-black text-white px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-black"
                    onClick={() => handleReturn()}>return</span>
            </div>
            <div>
                <div className="w-[100%] my-2 py-2 px-2 flex flex-col rounded-md bg-gray-200">
                    <div className="flex justify-between">
                        <span>Title :</span>
                        <input className="border-none" type='text' value={title}
                            onChange={(e) => dispatch(editTitle(e.target.value))} />
                    </div>
                    <div className="flex justify-between">
                        <span>Secondary title :</span>
                        <input className="border-none" type='text' value={secondaryTitle} onChange={(e) => dispatch(editSecondaryTitle(e.target.value))} />

                    </div>
                </div>

                {textData.map((data: any, index: number) => (

                    <div className="w-[100%] my-2 py-2 px-2 flex flex-col rounded-md bg-gray-200"
                        key={index}>
                        <div className="flex justify-end -mb-3">
                            <svg className="size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                                onClick={() => HandleEditTextClick(index)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div className="flex justify-between my-2">
                            <div className="flex flex-col justify-center mr-2">
                                {index > 0 && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"
                                        onClick={() => handleDecrementIndex({ index, dispatch })}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>)}
                                {index < textData.length - 1 && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5} stroke="currentColor" className="size-4"
                                        onClick={() => handleIncrementIndex({ index, dispatch })}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>)}
                            </div>
                            <div className="w-full">
                                <div key={index} className={`w-full pr-6 m-0 flex flex-col text-center text-lg ${data.type}`}>
                                    {data.text.map((text: string, index: number) => (
                                        <span key={index} className="-mb-2 m-0">
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>))}


            </div>
            <div className="flex justify-center">
                <span className="text-center bg-black text-lg text-white px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black"
                onClick={() => handleSave()}
                >save</span>
            </div>
            {isModalOpen && (
                <div className="h-screen w-screen fixed inset-0 flex items-center justify-center z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" />
                    <div className="absolute h-fit w-[75%] bg-white z-1 rounded-xl">
                        <div className='h-auto w-full z-50 p-2 flex flex-col  justify-end items-center'>
                            <HandleEditMainText
                                type={type}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                editedText={editedText}
                                setEditedText={(value: string[]) => setEditedText(value)}
                                indexToRemove={indexToRemove}
                                setIndexToRemove={(value: number) => setIndexToRemove(value)}
                                setIsModalOpen={(value: boolean) => setIsModalOpen(value)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

};

export default EditElement