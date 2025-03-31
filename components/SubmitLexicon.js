import { useSelector, useDispatch } from "react-redux";

import { useState } from "react"

import ModalSubmitMessage from "./ModalSubmitMessage";
import HandleSubmitMainText from "./HandleSubmitMainText";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";

const SubmitLexicon = ({ type, setIsCurrentMainComponent }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user.value.token);
    const mainText = useSelector((state) => state.submitMainText.value);


    return (
        <div className=" h-[100%]">
            <div className="my-2 p-1 bg-gray-200 rounded-md">
                <input className="border-none text-black"
                    placeholder="mot"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div >
            <div>
            
                <HandleSubmitMainText
                    type={type}
                    setIsCurrentMainComponent={setIsCurrentMainComponent}
                />

            </div>
            <div className="flex justify-center">
                <span
                    className="px-10 py-3 text-base bg-black text-white rounded-md"
                    onClick={() => handleSubmitNewContent({ 
                                     userToken, 
                                     type, 
                                     title, 
                                     mainText, 
                                     dispatch,
                                     setIsSubmitModalOpen, 
                                     setSuccessMessage, 
                                     setError, 
                                     setLoading, 
                                     setIsCurrentMainComponent, 
                                     setIsCurrentMainComponent })}
                >
                    {loading ? "En Cours..." : "Valider"}
                </span>
                {isSubmitModalOpen &&
                    <ModalSubmitMessage
                        error={error}
                        setError={setError}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                        setIsSubmitModalOpen={setIsSubmitModalOpen}
                        setIsCurrentMainComponent={setIsCurrentMainComponent}
                    />
                }
            </div>
        </div>

    )
}

export default SubmitLexicon
