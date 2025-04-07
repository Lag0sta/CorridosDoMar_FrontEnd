import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";

import { useState } from "react"

import ModalSubmitMessage from "./ModalSubmitMessage";
import HandleSubmitMainText from "./HandleSubmitMainText";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";

interface Props {
    type: string;
    setCurrentMainComponent: (value: string) => void
}

const SubmitLexicon = ({ type, setCurrentMainComponent } : Props) => {
    const [title, setTitle] = useState<string>("");
    const [secondaryTitle, setSecondaryTitle] = useState<string>("");
    const [selectedSubType, setSelectedSubType] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const dispatch = useDispatch();
    const userToken = useAppSelector((state) => state.user.value.token);
    const mainText = useAppSelector((state) => state.submitMainText.value);
    const linksData = useAppSelector((state) => state.submitLinks.value);

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
            
                <HandleSubmitMainText type={type}/>

            </div>
            <div className="flex justify-center">
                <span
                    className="px-10 py-3 text-base bg-black text-white rounded-md"
                    onClick={() => handleSubmitNewContent({
                        userToken,type, title, secondaryTitle, selectedSubType, mainText, linksData, setIsSubmitModalOpen, setSuccessMessage, setError, setLoading, setCurrentMainComponent, dispatch
                      })}
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
                        setCurrentMainComponent={setCurrentMainComponent}
                    />
                }
            </div>
        </div>

    )
}

export default SubmitLexicon
