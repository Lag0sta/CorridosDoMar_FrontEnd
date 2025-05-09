import { useState } from "react";
import { useAppSelector } from "../store/hooks";

interface Props {
    setIsEditOn: (value: boolean) => void;
    content: any
}
const EditElement = ({ setIsEditOn, content }: Props) => {

    const contentToEdit = useAppSelector((state) => state.editSubmit.value);
    console.log("contentToEdit", contentToEdit)

    const [type, setType] = useState(contentToEdit.type)
    const [title, setTitle] = useState(contentToEdit.title)
    const [secondaryTitle, setSecondaryTitle] = useState(contentToEdit.secondaryTitle)
    const [secondaryType, setSecondaryType] = useState(contentToEdit.secondaryType)
    const [mainText, setMainText] = useState(contentToEdit.mainText)
    const [selectedType, setSelectedtype] = useState("")

    const [editedText, setEditedText] = useState<string[]>([])
    const [links, setLinks] = useState(contentToEdit.links)

    console.log("EditElementContent", mainText)
    function handleReturn() {
        setIsEditOn(false);
    }


//IMPORTANT!!!!!!! REPENSES TOUTE CETTE PARTIE!!!!!!!!
//OBJECTIF: faire en sorte de ne pas utiliser les useState et de passer uniquement par le reducer pour les changements de valeurs des inputs modifiées!
//CHALLENGE: le reducer a la forme de l'OBJ de la BDD avec que les éléments modifiables, donc : {type:"", title:"", secondaryTitle:"", secondaryType:"", mainText:[{text:"", type:""}], links:[{title:"", url:""}]}
//DONC il va faloire créer des actions du reducer qui soit capable de modifier en détaile ces valeurs sans impacter les autres!!!!!
//MAAAAAAAIS si ça tout est codé correctement, l'utilisateur pourra modifier les textes sans pour autant passer par des étapes supplémentaires comme on a fait jusqu'ici!!!!
//Question: Si ça marche, est ce que je devrais utiliser la même méthode lors de la modification du texte lors de la création d'un nouvel élément à submit ?????
//POUR: ça devrait réduire la quantité de code
//CONTRE: ça va prendre un peu de temps le temps de comprendre ce qu'il faut modifier sans impacter le reste


    return (
        <div>
            EditElement
            <div>
                <span onClick={() => handleReturn()}>return</span>
            </div>
            <div>

                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type='text' value={secondaryTitle} onChange={(e) => setSecondaryTitle(e.target.value)} />

                {mainText.map((mainText: any, index: number) => (

                    <div className="w-[90%] my-2 ml-4 py-2 px-2 flex flex-col rounded-md bg-gray-200"
                        key={index}>
                            <div className = "flex justify-end -mb-3">
                            <svg className="size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            </div>
                        <div className="flex justify-between my-2">
                            <div className="flex flex-col justify-center mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" className="size-4"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                                </div>
                                <div className="w-full">
                        {type === "song" && (
                            <div className="my-2">
                                <form className="flex justify-between items-center h-10 px-2 bg-black rounded-md">
                                    <div className="text-yellow-500">
                                        <label htmlFor="type">Choisir un type :</label>
                                    </div>
                                    <select name="type" id="type" value={mainText.type !== undefined ? mainText.type : selectedType} onChange={(e) => setSelectedtype(e.target.value)}>
                                        <option value="couplet">Couplet</option>
                                        <option value="refrain">Refrain</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </form>
                            </div>
                        )}
                        <input
                            className="w-full border-none "
                            type='text'
                            value={mainText.text}
                            onChange={(e) => setMainText(mainText.text)} />
                            </div>
                        </div>
                        
                    </div>))}


            </div>
        </div>
    )
};

export default EditElement