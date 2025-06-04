import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from '../store/hooks';


import HandleEditMainText from "./HandleEditMainText";
import { handleDecrementIndex, handleIncrementIndex, handleSubmitText } from "../utils/handleMainTextActions";

interface Props {
    type: string
}

const HandleSubmitMainText = ({ type, }: Props) => {

    const [text, setText] = useState<string>("")
    const [editedText, setEditedText] = useState<string[]>([])
    const [indexToRemove, setIndexToRemove] = useState<number>(-1)

    const [textError, setTextError] = useState<string>("")
    const [radioChoice, setRadioChoice] = useState<string>("autre");
    const [selectedType, setSelectedType] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const textData = useAppSelector((state) => state.handleMainText.value);
    console.log("textData", textData)
    console.log("editedTextHandleSubmitMainText", editedText)

    // enregistre le choix type de texte
    const handleRadioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRadioChoice(event.target.value);
    };

    useEffect(() => {
        console.log("editedText updated:", editedText);
    }, [editedText]);
    console.log("editedText before sending as props:", Array.isArray(editedText), editedText);


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
                        textArr.push(text + "\n");
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

        <div className="mt-2 mb-4 p-1 bg-gray-200 rounded-md flex flex-col">
            <h3>Texte Principale</h3>

            {type === "song" && (
                <div className="bg-gray-800 rounded-md flex flex-col mx-4 px-2 py-2 max-h-[9rem] overflow-y-auto">
                    <span className="text-white font-bold ">Notice: </span>
                    <span className=" text-yellow-500 text-sm">l'ajout de texte pour les paroles de chansons ce fait d'une manière différente du reste. A chaque submit, la partie du texte s'affichera juste en dessous vous permettants de voir ce que vous êtes en train de faire.
                        Vous pouvez modifier ces parties en cliquant dessus.</span>
                    <span className="font-bold text-white mt-4">
                        Veuillez choisir entre :</span>
                    <div className="mx-4 text-sm text-yellow-500 text-sm">
                        <div className="my-2">
                            <span className="text-sm"><span className="font-bold text-base text-white">Couplet</span> pour les couplets ou textes principaux.</span>
                        </div>
                        <div className="my-2">
                            <span className="text-sm"><span className="font-bold text-base text-white">Refrain</span> pour les refrains.</span>
                        </div>
                        <div className="my-2">
                            <span className="text-sm"><span className="font-bold text-base text-white">Autre</span> pour un texte quelconque qui ne corresponde pas aux deux précédents.</span>
                        </div>
                    </div>
                </div>)
            }

            {type !== "song" && (
                <div className="bg-gray-800 rounded-md flex flex-col mx-4 px-2 py-2 max-h-[9rem] overflow-y-auto">
                    <span className="text-white font-bold ">Notice: </span>
                    <span className=" text-yellow-500 text-sm">A chaque ajout de texte, la partie du texte s'affichera juste en dessous vous permettants de voir ce que vous êtes en train de faire.
                        Vous pouvez modifier ces parties en cliquant dessus.</span>
                </div>)
            }

            <div>
                <div className="w-[90%] my-2 ml-4 py-2 px-2 rounded-md bg-white">
                    {type === "song" && (
                        <form className="flex justify-between items-center h-10 px-2 mb-2 bg-gray-800 rounded-md">
                            <div className="text-yellow-400">
                                <label htmlFor="type">Choisir un type :</label>
                            </div>
                            <select name="type" id="type" value={radioChoice} onChange={handleRadioChange}>
                                <option value="">Type</option>
                                <option value="couplet">Couplet</option>
                                <option value="refrain">Refrain</option>
                                <option value="autre">Autre</option>
                            </select>
                        </form>
                    )}

                    <textarea
                        className="h-[22rem] border-none w-full bg-gray-200 text-black p-2"
                        placeholder="Text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {textError && <p className="text-red-500 text-base">{textError}</p>}
                    <button className="px-2 py-1 rounded-md bg-black text-base text-white hover:bg-yellow-400 hover:text-black hover:text-lg"
                        onClick={() => handleSubmitText({
                            radioChoice,
                            setRadioChoice,
                            text,
                            setText,
                            dispatch,
                            setTextError
                        })
                        }
                    >
                        Valider
                    </button>

                </div>
                {textData.length !== 0 && <div className=" bg-white rounded-md py-2">
                    {textData.map((textInfo, index) => (

                        (<div key={index} className=" px-2 flex justify-between items-center my-1 ">
                            <div>
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

                            <div className={`${textInfo.type} musicText`}>
                                {textInfo.text.map((text, index) => (
                                    <span key={index} className="p-0 m-0">{text}</span>
                                ))}

                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                                onClick={() => HandleEditTextClick(index)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </div>)
                    ))}
                </div>}
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
}

export default HandleSubmitMainText
