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
                        <option value="">choisissez une option</option>
                        <option value="biography">biographie</option>
                        <option value="song">chanson</option>
                        <option value="rythm">Rythmes</option>
                        <option value="lexicon">Lexique</option>
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