import { useSelector } from "react-redux";

import { useState } from "react"

import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";

const SubmitLexicon = ({ type, setIsCurrentMainComponent }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const userToken = useSelector((state) => state.user.value.token);

    return (
        <div className=" h-[100%]">
            <div className="my-2 p-1 bg-gray-200 rounded-md">
                <input placeholder="word"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div >
            <div>
                <div className="my-2 p-1 bg-gray-200 rounded-md">
                    <textarea className="h-[28rem] w-full rounded-md"
                        placeholder="meaning"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)} />

                </div>

            </div>
            <div className="flex justify-center">
                <span
                    className="px-10 py-3 text-base bg-black text-white rounded-md"
                    onClick={() => handleSubmitNewContent({ userToken, type, title, text, setIsSubmitModalOpen, setSuccessMessage, setError, setLoading, setIsCurrentMainComponent, setIsCurrentMainComponent })}

                >
                    {loading ? "Submitting..." : "Submit"}
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
