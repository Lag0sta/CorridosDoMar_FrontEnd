import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";

import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";

interface Props {
  type : string;
  setCurrentMainComponent : (value : string) => void;
}

const SubmitSong = ({ type, setCurrentMainComponent } : Props) => {
  const [title, setTitle] = useState<string>("");
  const [secondaryTitle, setSecondaryTitle] = useState<string>("");
  const [selectedSubType, setSelectedSubType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const linksData = useAppSelector((state) => state.submitLinks.value);
  const userToken = useAppSelector((state) => state.user.value.token);
  const mainText = useAppSelector((state) => state.submitMainText.value);

  console.log("linksData", linksData)
  console.log("titleBeforeSubmit", title)
  console.log("song type", type);

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
        {/* <input
          id="secondaryTitle"
          className="border-none"
          placeholder="Created by"
          type="text"
          value={secondaryTitle}
          onChange={(e) => setSecondaryTitle(e.target.value)}
        /> */}
      </div>
      <div className="my-2">
        <form className="flex justify-between items-center h-10 px-2 bg-black rounded-md">
          <div className="text-yellow-500">
            <label htmlFor="type">Sous-genre :</label>
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
          <HandleSubmitMainText type={type}/>
        </div>

        <HandleSubmitMediaLinks/>

      </div>
      <div className="flex flex-col justify-center items-center">
        <span
          className="px-10 py-3 mb-2 text-base bg-black text-white rounded-md hover:bg-yellow-400 hover:text-black hover:text-lg"
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
  );
};

export default SubmitSong;