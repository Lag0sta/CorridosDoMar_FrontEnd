import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";


const SubmitSong = ({ type, setIsCurrentMainComponent }) => {
  const [title, setTitle] = useState("");
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.submitLinks.value);
  const userToken = useSelector((state) => state.user.value.token);
  const mainText = useSelector((state) => state.submitMainText.value);

  console.log("linksData", linksData)
  console.log("titleBeforeSubmit", title)
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
      <div className="my-2">
        <form className="flex justify-between items-center h-10 px-2 bg-black rounded-md">
          <div className="text-yellow-500">
            <label for="type">Sous-genre :</label>
          </div>
          <select name="type" id="type" value={selectedSubType} onChange={(e) => setSelectedSubType(e.target.value)}>
            <option value="">Sous-genre</option>
            <option value="corrido">Corrido</option>
            <option value="ladainha">Ladainha</option>
            <option value="samba">Samba</option>
            <option value="sambaDcoco">Samba de coco</option>
            <option value="sambaDcoco">Autre</option>

          </select>
        </form>
      </div>
      <div>
        <div className="my-2 p-1 bg-gray-200 rounded-md">
          <HandleSubmitMainText />
        </div>

        <HandleSubmitMediaLinks link={link}
          setLink={setLink}
        />

      </div>
      <div className="flex flex-col justify-center items-center">
        <span
          className="px-10 py-3 mb-2 text-base bg-black text-white rounded-md hover:bg-yellow-400 hover:text-black hover:text-lg"
          onClick={() => handleSubmitNewContent({
            userToken,
            type,
            title,
            secondaryTitle,
            selectedSubType,
            mainText,
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
  );
};

export default SubmitSong;