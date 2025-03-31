import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchData } from "../reducers/search";

const Research = ({ currentMainComponent, setIsCurrentMainComponent, setSelectedTitle }) => {

    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");
    const [infoContent, setInfoContent] = useState("");
    const [type, setType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);
    console.log("selectedMediaTypes :", selectedMediaTypes)

    const dispatch = useDispatch();
    const dataFetched = useSelector((state) => state.search.value)
    console.log("dataSearch", dataFetched)
    const [content, setContent] = useState([]);
    console.log("content", content)
    const researchRef = useRef(null);

    // console.log("songs", songs)

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (event) => {
        setType(event.target.value);
    };

    const handleFilterChange = (e) => {
        //valeur du type de media
        const filterValue = e.target.value;

        //vérifie la présence du filterValue dans selectedMediaTypes
        const isSelected = selectedMediaTypes.includes(filterValue);

        //si true, supprime la valeur du filterValue du selectedMediaTypes
        if (isSelected) {
            setSelectedMediaTypes(selectedMediaTypes.filter((type) => type !== filterValue));

            //si false, ajoute la valeur du filterValue au selectedMediaTypes
        } else {
            setSelectedMediaTypes([...selectedMediaTypes, filterValue]);
        }

    }
  

    useEffect(() => {
        console.log("useEffect triggered");

        if (!dataFetched.length) {
            fetch("http://localhost:3000/submits")
                .then((response) => response.json())
                .then((data) => {
                    dispatch(fetchData(data));
                    console.log("fetch triggered");
                })
                .catch((error) => console.error(error));
        }

            const filteredData = selectedMediaTypes.length === 0 ? dataFetched : dataFetched.filter((item) => {
                return selectedMediaTypes.includes(item.type);
            });

            console.log("dataFetched", dataFetched)
            setContent([filteredData]);
            setIsLoading(false);


    }, [dataFetched])

    const handleTitleClick = (title) => {
        setSelectedTitle(title);
        setIsCurrentMainComponent("showElement");
    };

    return (
        <div className="h-screen w-full mt-6 flex flex-col justify-start align-center">
                <div className="h-fit min-h-[2rem] w-[98%] my-1 bg-gray-200 rounded-md "
                >
                    <div className="m-1">
                        <select className="mb-1 outline-none border-none rounded-md" onChange={(e) => handleOptionChange(e)}>
                            <option value="">Select a category</option>
                            <option value="byTitle">Title</option>
                            <option value="mainText">Text</option>
                            <option value="all">All</option>
                        </select>

                        {type === "byTitle" &&
                            <div className=" flex justify-evenly">
                                <input className="w-[98%] min-h-[2rem] bg-white ronded-md border-none"
                                    type="text"
                                    placeholder="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                                <button
                                    className="px-5 py-1 ml-1 rounded-md bg-black text-white        hover:bg-white hover:text-black hover:border hover:border-black"
                                    onClick={handleTitleSearch}>Submit</button>
                            </div>
                        }

                        {type === "mainText" &&
                            <textarea
                                className="w-[99%] min-h-[2rem] bg-white ronded-md"
                                placeholder="enter search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />}
                    </div>
                </div>
            <div className="">
                {!isOpen && (
                    <div className="">
                        <button className="filter-button px-2 py-1 mt-2 rounded-md"
                            onClick={handleToggle}>
                            <span style={{ fontFamily: "captureIt" }} className="text-yellow-500">Filter</span>
                            <i className={`fas fa-caret-down ${isOpen ? 'rotate' : ''}`}></i>
                        </button>
                    </div>
                )}

                {isOpen && (
                    <div className="">
                        <button className="filter-button px-2 py-1 mt-2 rounded-t-md rounded-b-none"
                            onClick={handleToggle}>
                            <span style={{ fontFamily: "captureIt" }}
                                className="text-yellow-500">Filter</span>
                            <i className={`fas fa-caret-down ${isOpen ? 'rotate' : ''}`}></i>
                        </button>
                        <div className="px-2 py-2 flex justify-between bg-black text-yellow-500 rounded-b-md rounded-tr-md">
                            <div className="flex justify-between">
                                <div>
                                    <input type="checkbox" name="mediaType" value="song" onChange={handleFilterChange} />
                                    <label for="song">Song</label>
                                </div>
                            </div>
                            <div className="flex justify-between" >
                                <div>
                                    <input type="checkbox" name="mediaType" value="rythm" onChange={handleFilterChange} />
                                    <label for="rythm">Rythm</label>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input type="checkbox" name="mediaType" value="biography" onChange={handleFilterChange} />
                                    <label for="biography">Biography</label>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input type="checkbox" name="mediaType" value="lexicon" onChange={handleFilterChange} />
                                    <label for="lexicon">Lexicon</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          
                <div className="w-[98%] h-fit my-1 bg-black rounded-md border-2 border-black flex flex-col">
                    {/* .flat() permet d'enlever les sous tableaux et de les mettre dans un seul tableau */}
                    {content.flat().map((item, index) => (
                        <div className={item.type} key={index}>
                            <div className="m-2 text-yellow-500 flex flex-row justify-between items-center">
                                <span className="text-lg cursor-pointer hover:text-white" onClick={() => handleTitleClick(item.title)}>
                                    {item.title}
                                </span>
                                <span className="text-xs text-white">{item.type}</span>
                            </div>
                            <div className="border-b-2 border-gray-500 mb-2" />
                        </div>
                    ))}
                </div>
            

            {
                isModalOpen && (
                    <div className="min-h-fit w-full my-6">
                        {/* {infoContent} */}
                    </div>)
            }
        </div >
    );
}

export default Research