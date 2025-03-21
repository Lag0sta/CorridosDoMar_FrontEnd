import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import ModalSubmitMessage from "./ModalSubmitMessage";
import { handleSubmitNewContent } from "../utils/handleSubmitNewContent";
import HandleSubmitImgLinks from "./HanldeSubmitImgLinks";
import HandleSubmitMediaLinks from "./HandleSubmitMediaLinks";


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

  return (
    <div className="">
      <div className="my-2 p-1 bg-gray-200 rounded-md">
        <input className="border-none"
          placeholder="Name/Appelido/title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <input className="border-none"
            placeholder="profession"
            type="text"
            onChange={(e) => setSecondaryTitle(e.target.value)}
          />
        </div>

      </div >
      <HandleSubmitImgLinks imgLink={imgLink} 
                            setImgLink={setImgLink}
                            />   
                              
      <div>
        <div className="my-2 p-1 bg-gray-200 rounded-md">
          <textarea className="h-[22rem] w-full rounded-md"
            placeholder="Biography"
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <HandleSubmitMediaLinks link={link}
                                setLink={setLink}
        />
      </div>
      <div className="flex justify-center">
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

export default SubmitBiography
