import { useState } from "react"
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";

interface Props {
    type: string,
    setCurrentMainComponent: (value: string) => void
}

const SubmitRythm = ({ type, setCurrentMainComponent }: Props) => {
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
    const [secondaryTitle, setSecondaryTitle] = useState<string>("");
    const [selectedSubType, setSelectedSubType] = useState<string>("");

    const dispatch = useDispatch();
    const linksData = useAppSelector((state) => state.handleLinks.value);
    const userToken = useAppSelector((state) => state.user.value.token);
    const mainText = useAppSelector((state) => state.handleMainText.value);


    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSecondaryTitle(event.target.value);
    };

    return (
        <div className="">
            <div className="my-2 p-1 bg-gray-200 rounded-md">
                <input
                    id="title"
                    className="border-none"
                    placeholder="Titre"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div >
            <div className="mb-1 p-1 bg-gray-200 rounded-md" >
                <span className="">Spécification: </span>
                <select className="outline-none border-none" onChange={(e) => handleOptionChange(e)}>
                    <option value="">Choisissez une option</option>
                    <option value="Capoeira">Capoeira</option>
                    <option value="Samba">Samba</option>
                    <option value="Orichas">Orichas</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <HandleSubmitMainText type={type} />
                <HandleSubmitMediaLinks />
            </div>
            <div className="flex flex-col justify-center items-center">
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

export default SubmitRythm
