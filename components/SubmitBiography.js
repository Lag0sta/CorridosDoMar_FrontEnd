import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitImgLinks from "./HanldeSubmitImgLinks";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";
import HandleSubmitMainText from "./HandleSubmitMainText";


const SubmitBiography = ({ type, setIsCurrentMainComponent }) => {

  const [title, setTitle] = useState("")
  const [secondaryTitle, setSecondaryTitle] = useState("")
  const [text, setText] = useState("")
  const [link, setLink] = useState("")
  const [imgLink, setImgLink] = useState("")
  const [loading, setLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.submitLinks.value);
  const userToken = useSelector((state) => state.user.value.token);
  const mainText = useSelector((state) => state.submitMainText.value);

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
                    setIsCurrentMainComponent={setIsCurrentMainComponent}
                />

        <HandleSubmitMediaLinks link={link}
          setLink={setLink}
        />
      </div>
      <div className="flex justify-center pb-2">
        <span
          className="px-10 py-3 text-base bg-black text-white rounded-md"
          onClick={() => handleSubmitNewContent({
            userToken,
            type,
            title,
            secondaryTitle,
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
  )
}

export default SubmitBiography
