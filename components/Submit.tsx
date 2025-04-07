import * as React from "react";

import { useState } from "react"
import SubmitBiography from "./SubmitBiography"
import SubmitSong from "./SubmitSong"
import SubmitRythm from "./SubmitRythm"
import SubmitLexicon from "./SubmitLexicon"


interface Props {
    setCurrentMainComponent: (value: string) => void
}
const Submit = ({ setCurrentMainComponent } : Props) => {
    const [type, setType] = useState("");

    const handleOptionChange = (event : React.ChangeEvent<HTMLSelectElement>) : void => {
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

                {type === "biography" && <SubmitBiography type={type} setCurrentMainComponent={(value : string) => setCurrentMainComponent(value)} />}
                {type === "song" && <SubmitSong type={type} setCurrentMainComponent={(value : string) => setCurrentMainComponent(value)} />}
                {type === "rythm" && <SubmitRythm type={type} setCurrentMainComponent={(value : string) => setCurrentMainComponent(value)} />}
                {type === "lexicon" && <SubmitLexicon type={type} setCurrentMainComponent={(value: string) => setCurrentMainComponent(value)} />}
            </div>
        </div>
    )
}

export default Submit