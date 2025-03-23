import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleDecrementIndex, handleIncrementIndex, handleSubmitText } from "../utils/submitMainTextActions";

const HandleSubmitMainText = () => {

    const [text, setText] = useState("")

    const [textError, setTextError] = useState("")
    const [radioChoice, setRadioChoice] = useState('');


    const dispatch = useDispatch();
    const textData = useSelector((state) => state.submitMainText.value);
    console.log("textData", textData)



    // enregistre le choix type de texte
    const handleRadioChange = (event) => {
        setRadioChoice(event.target.value);
    };
    return (

        <div className="mt-2 mb-4 p-1 bg-gray-200 rounded-md flex flex-col">
            <h3>Texte Principale</h3>

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
            </div>

            <div>
                <div className="w-[90%] my-2 ml-4 py-2 px-2 border border-white border-3 rounded-md bg-white">
                    <div className="flex">
                        <div>
                            <input type="radio" name="mediaType" value="couplet" onChange={(e) => handleRadioChange(e)} />
                            <label for="couplet">Couplet</label>
                        </div>
                        <div>
                            <input type="radio" name="mediaType" value="refrain" onChange={(e) => handleRadioChange(e)} />
                            <label for="refrain">Refrain</label>
                        </div>
                        <div>
                            <input type="radio" name="mediaType" value="autre" onChange={(e) => handleRadioChange(e)} />
                            <label for="autre">Autre</label>
                        </div>
                    </div>
                    <textarea
                        className="h-[22rem] border-none w-full bg-gray-200 text-black p-2"
                        placeholder="Text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {textError && <p className="text-red-500 text-sm">{textError}</p>}
                    <button className="px-2 py-1 rounded-lg bg-black text-md text-white "
                        onClick={() => handleSubmitText({
                            radioChoice,
                            text,
                            setText,
                            textData,
                            dispatch,
                            textError,
                            setTextError
                        })}>
                        submit
                    </button>


                </div>
                <div className=" bg-white rounded-md py-2">
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

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </div>)
                    ))}
                </div>
            </div>
        </div>

    )
}

export default HandleSubmitMainText
