import { useState } from "react"
import Biography from "./Biography"
import Song from "./Song"
import Rythm from "./Rythm"
import Lexicon from "./Lexicon"

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

                {type === "biography" && <Biography type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "song" && <Song type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "rythm" && <Rythm type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
                {type === "lexicon" && <Lexicon type={type} setIsCurrentMainComponent={setIsCurrentMainComponent} />}
            </div>
        </div>
    )
}

export default Submit