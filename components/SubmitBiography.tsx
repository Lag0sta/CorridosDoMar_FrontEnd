import * as React from 'react';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useAppSelector } from '../store/hooks';

import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
// import HandleSubmitImgLinks from "./HanldeSubmitImgLinks";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";

interface Props {
  type : string;
  setCurrentMainComponent : (value: string) => void
}

const SubmitBiography = ({ type, setCurrentMainComponent } : Props) => {

  const [title, setTitle] = useState<string>("")
  const [secondaryTitle, setSecondaryTitle] = useState<string>("")
  const [selectedSubType, setSelectedSubType] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [imgLink, setImgLink] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const linksData = useAppSelector((state) => state.submitLinks.value);
  const userToken = useAppSelector((state) => state.user.value.token);
  const mainText = useAppSelector((state) => state.submitMainText.value);
console.log("mainText SubmitBio", mainText)

  return (
    <div className="">
      <div className="my-2 p-1 bg-gray-200 rounded-md">
        <input className="border-none"
          placeholder="Nom/Apelido/titre"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          {/* <input className="border-none"
            placeholder="profession"
            type="text"
            onChange={(e) => setSecondaryTitle(e.target.value)}
          /> */}
        </div>

      </div >
      {/* <HandleSubmitImgLinks imgLink={imgLink}
        setImgLink={setImgLink}
      /> */}

      <div>

        <HandleSubmitMainText
                    type={type}
                />

        <HandleSubmitMediaLinks/>
      </div>
      <div className="flex justify-center pb-2">
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

export default SubmitBiography
