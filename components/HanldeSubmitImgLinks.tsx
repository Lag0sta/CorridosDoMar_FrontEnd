// import * as React from "react";
// import TextOverflow from "react-text-overflow";
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { useAppSelector } from "../store/hooks";
// import { handleSubmitImgLink, handleRemoveLinks } from "../utils/submitLinksActions";

// interface Props {
//     imgLink: string;
//     setImgLink: (value: string) => void
// }

// const HandleSubmitImgLinks = ({ imgLink, setImgLink }: Props) => {

//     const [imgLinkError, setImgLinkError] = useState("")
//     // const [imgLink, setImgLink] = useState("");

//     const dispatch = useDispatch();
//     const linksData = useAppSelector((state) => state.submitLinks.value);

//     console.log("linksData avant de cliquer sur le bouton", linksData);
//     console.log("props avant de cliquer sur le bouton", { imgLink, setImgLink, setImgLinkError, linksData, dispatch });

//     console.log("linksData", linksData)

//     const handleRemoveClick = ({ index }) => {
//         if (index < 0 || index >= linksData.length) return;
//         handleRemoveLinks({
//             index,
//             dispatch,
//             imgLinkError,
//             setImgLinkError
//         })
//     }


//     return (

//         <div>
//             <div className="my-2 p-1 bg-gray-200 rounded-md">
//                 <span>link portrait:</span>
//                 <input className="ml-2 border-none w-2/3"
//                     placeholder="https://..."
//                     type="text"
//                     value={imgLink}
//                     onChange={(e) => setImgLink(e.target.value)}
//                 />
//                 <button className="px-2 py-1 rounded-lg bg-black text-md text-white "
//                     onClick={() => handleSubmitImgLink({
//                         imgLink,
//                         setImgLink,
//                         setImgLinkError,
//                         linksData,
//                         dispatch
//                     }
//                     )}>
//                     submit
//                 </button>
//             </div>
//             {imgLinkError && <p className="text-red-500 text-sm">{imgLinkError}</p>}
//             <div className=" bg-black rounded-md">

//                 {linksData.map((link, index) => (
//                     link.type === "img" && (
//                         <div key={index} className=" px-2 flex flex-raw justify-between align-center my-2 pb-2 pt-1 border-b border-white  text-white">
//                             <span className="mr-6 text-sm text-yellow-500 inline-block">{link.type}</span>
//                             <span className="inline-block">
//                                 <TextOverflow text={link.link} />
//                             </span>
//                             <button className="ml-6 px-2 py-1 rounded-lg bg-yellow-500 text-xs text-white "
//                                 onClick={() => handleRemoveClick({ index })}>
//                                 REMOVE
//                             </button>
//                         </div>
//                     )
//                 ))}

//             </div>
//         </div>

//     )
// }

// export default HandleSubmitImgLinks
