import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";

const SubmitRythm = ({ type, setIsCurrentMainComponent }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [secondaryTitle, setSecondaryTitle] = useState("");

    const dispatch = useDispatch();
    const linksData = useSelector((state) => state.submitLinks.value);
    const userToken = useSelector((state) => state.user.value.token);


    const handleOptionChange = (event) => {
        setSecondaryTitle(event.target.value);
    };

    return (
        <div className=" ">
            <div className="my-2 p-1 bg-gray-200 rounded-md">
                <input
                    id="title"
                    className="border-none"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div >
            <div className="mb-1 p-1 bg-gray-200 rounded-md" >
                <span className="">Specification: </span>
                <select className="outline-none border-none" onChange={(e) => handleOptionChange(e)}>
                    <option value="">Select an option</option>
                    <option value="Capoeira">Capoeira</option>
                    <option value="Samba">Samba</option>
                    <option value="Orichas">Orichas</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="my-2 p-1 bg-gray-200 rounded-md">
                <textarea
                    id="text"
                    className="h-[11rem] w-full rounded-md"
                    placeholder="Text"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
            <HandleSubmitMediaLinks link={link}
                                setLink={setLink}
        />
            </div>
            <div className="flex flex-col justify-center items-center">
                <span
                    className="px-10 py-3 text-base bg-black text-white rounded-md"
                    onClick={() => handleSubmitNewContent({ 
                        userToken, 
                        type, 
                        title, 
                        secondaryTitle, 
                        text, 
                        linksData, 
                        setIsSubmitModalOpen, 
                        setSuccessMessage, 
                        setError, 
                        setLoading, 
                        setIsCurrentMainComponent, 
                        dispatch, 
                        setIsCurrentMainComponent 
                       })
                 }
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

export default SubmitRythm
