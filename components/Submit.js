import { useState } from "react"
import SubmitBiography from "./SubmitBiography"
import SubmitSong from "./SubmitSong"
import SubmitRythm from "./SubmitRythm"
import SubmitLexicon from "./SubmitLexicon"

const Submit = ({ setIsCurrentMainComponent }) => {
    const [type, setType] = useState("");

    const handleOptionChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div className=" h-screen mt-6">
            <div className="flex flex-col">
                <div className="mb-1 p-1 bg-gray-200 rounded-md" >
                    <span className="">type: </span>
                    <select className="outline-none border-none" onChange={(e) => handleOptionChange(e)}>
                        <option value="">Select an option</option>
                        <option value="biography">Biography</option>
                        <option value="song">Song</option>
                        <option value="rythm">Rythm</option>
                        <option value="lexicon">Lexicon</option>
                    </select>
                </div>

                {type === "biography" && <SubmitBiography type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "song" && <SubmitSong type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "rythm" && <SubmitRythm type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "lexicon" && <SubmitLexicon type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
            </div>
        </div>
    )
}

export default Submit