import { useDispatch, useSelector } from "react-redux";

import { handleEditText } from "../utils/submitMainTextActions";

const HandleEditMainText = ({selectedType, setSelectedType, editedText, setEditedText, setIsModalOpen}) => {

    console.log("selectedType", selectedType)
    const dispatch = useDispatch();
    const textToEdit = useSelector((state) => state.submitMainText.value)
    console.log("textToEdit", textToEdit)
    console.log("editedTextHandleEditMainText", editedText)

    const handleReturnClick = () => {
        setIsModalOpen(false);
        setEditedText([""])
    };

    const HandleSubmitEditedText = () => {
        setIsModalOpen(false);
        handleEditText({ editedText, setEditedText, selectedType, setSelectedType, dispatch })
    }

    return (

        <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"
                onClick={handleReturnClick}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <div className="">
                <form>
                    <label for="type">Choisir un type :</label>
                    <select name="type" id="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="couplet">Couplet</option>
                        <option value="refrain">Refrain</option>
                        <option value="autre">Autre</option>
                    </select>
                </form>
            </div>
            <textarea className="h-[20rem] w-[90%] text-center overflow-y bg-gray-100 rounded-xl"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />

            <span className="text-white bg-black rounded-xl py-3 px-6 m-1"
                onClick={HandleSubmitEditedText}>Edit</span>

        </div>

    )
}

export default HandleEditMainText
