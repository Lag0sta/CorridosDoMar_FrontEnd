import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";


const SubmitSong = ({ type, setIsCurrentMainComponent }) => {
  const [title, setTitle] = useState("");
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.submitLinks.value);
  const userToken = useSelector((state) => state.user.value.token);
console.log("linksData", linksData)
  console.log("song type", type);

  return (
    <div className="">
      <div className="my-2 p-1 bg-gray-200 rounded-md">
        <input
          id="title"
          className="border-none"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="secondaryTitle"
          className="border-none"
          placeholder="Created by"
          type="text"
          value={secondaryTitle}
          onChange={(e) => setSecondaryTitle(e.target.value)}
        />
      </div>
      <div>
        <div className="my-2 p-1 bg-gray-200 rounded-md">
          <HandleSubmitMainText/>
        </div>

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
            setIsSubmitModalOpen = {setIsSubmitModalOpen}
            setIsCurrentMainComponent = {setIsCurrentMainComponent}
          />
        }
      </div>
    </div>
  );
};

export default SubmitSong;