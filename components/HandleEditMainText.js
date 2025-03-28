import { useDispatch, useSelector } from "react-redux";

import { handleEditText, handleDeleteText } from "../utils/submitMainTextActions";

const HandleEditMainText = ({ selectedType, setSelectedType, editedText, setEditedText, setIsModalOpen }) => {

    console.log("selectedType", selectedType)
    const dispatch = useDispatch();
    const textToEdit = useSelector((state) => state.submitMainText.value)
    console.log("textToEdit", textToEdit)
    console.log("editedTextHandleEditMainText", editedText)

    const HandleReturnClick = () => {
        setIsModalOpen(false);
        setEditedText([""])
    };

    const HandleSubmitEditedText = () => {
        setIsModalOpen(false);
        handleEditText({ editedText, setEditedText, selectedType, setSelectedType, dispatch })
    }

    const HandleDelete = () => {
        setIsModalOpen(false);
        handleDeleteText({ dispatch })
    }

    return (
        <div className="flex flex-col w-[95%]">
            <div className="flex justify-between my-2">
                <svg className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={HandleReturnClick}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                <svg className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={HandleDelete} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
            <div>
                <h3>Texte à éditer</h3>
            </div>
            <div className="my-2">
                <form className="flex justify-between items-center h-10 px-2 bg-black rounded-md">
                    <div className="text-yellow-500">
                        <label for="type">Choisir un type :</label>
                    </div>
                    <select name="type" id="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="couplet">Couplet</option>
                        <option value="refrain">Refrain</option>
                        <option value="autre">Autre</option>
                    </select>
                </form>
            </div>
            <textarea className="h-[20rem] text-center overflow-y bg-gray-100 rounded-xl"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="my-1 flex justify-center">
                <span className="mt-2 px-2 py-1 rounded-md bg-black text-base text-white hover:bg-yellow-400 hover:text-black hover:text-lg"
                    onClick={HandleSubmitEditedText}>Modifier</span>
            </div>



        </div>

    )
}

export default HandleEditMainText
