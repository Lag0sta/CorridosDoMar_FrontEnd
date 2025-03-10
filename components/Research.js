import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchData, resetFetch } from "../reducers/search";

const Research = () => {

    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");
    const [infoContent, setInfoContent] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);


    const dispatch = useDispatch();
    const dataFetched = useSelector((state) => state.search.dataFetched)
    const data = useSelector((state) => state.search.value);
    console.log("dataSearch", data)
    let content
    // console.log("songs", songs)

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (event) => {
        setType(event.target.value);
    };

   
    const handleTitleClick = (title) => {
        setIsModalOpen(true);
        if(data.title === title){
            content = <div className="h-full w-full">
            <div className="flex flex-col justify-center items-center">
                <h2 className="mb-2">{title}</h2>
                <h3 className="mb-2">{data.secondaryTitle}</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
                {mainText}
            </div>
            <iframe width="560" height="315" src={data.link} title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />

        </div>
        }
        
    };

    const handleTitleSearch = () => {
        console.log('click')

        if (!title) {
            setError("Please fill in the required fields");
            return;
        }

        fetch("http://localhost:3000/submits/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
            }),
        }).then((response) => response.json())
            .then((data) => {
                if (data) {
                    dispatch(data)
                    console.log("data :", data)
                    console.log("title :", title, "secondaryTitle :", data.secondaryTitle, "mainText :", data.mainText)
                    console.log("mainText", data.mainText[0])
                    const titleComponent =
                        <div className={data.type}>
                            <span className="m-1 text-xl text-white hover:text-yellow-400"
                                onClick={handleTitleClick} >
                                {title}
                            </span>
                            <span className="m-1 text-xl text-white hover:text-yellow-400">
                                {data.secondaryTitle}

                            </span>
                        </div>;
                    setContent(titleComponent);
                    const mainText = data.mainText.map((text, index) => {
                        return (
                            <div className="w-full flex flex-col justify-center items-center text-yellow-500" >
                                <p key={index}>{text}</p>
                            </div>)
                    })
                    const info =
                        <div className="h-full w-full">
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="mb-2">{title}</h2>
                                <h3 className="mb-2">{data.secondaryTitle}</h3>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {mainText}
                            </div>
                            <iframe width="560" height="315" src={data.link} title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />

                        </div>
                    setInfoContent(info)

                }
            }).catch((error) => {
                console.error("Erreur :", error);
            });
    }
    useEffect(() => {
        if (!dataFetched) {
            fetch("http://localhost:3000/submits")
                .then((response) => response.json())
                .then((data) => {
                    dispatch(fetchData(data));
                })
                .catch((error) => console.error(error));
        }
    }, [dataFetched, dispatch]);

    useEffect(() => {
        return () => {
            if (!dataFetched) {
                dispatch(resetFetch());
            }
        }
    }, [])


    const handleFilterChange = (e) => {
        const { value } = e.target;
        const isSelected = selectedMediaTypes.includes(value);
        if (isSelected) {
          setSelectedMediaTypes(selectedMediaTypes.filter((type) => type !== value));
        } else {
          setSelectedMediaTypes([...selectedMediaTypes, value]);
        }

    }

    const filteredData = selectedMediaTypes.length === 0 ? data : data.filter((item) => {
        return selectedMediaTypes.includes(item.type);
      });
      

      if (!search && !title) {
        content = filteredData.map((e, index) => <div className={e.type} key={index}>
            <div className="m-2 text-yellow-500 flex flex-raw justify-between">
                <span className="text-lg"
                      onClick={handleTitleClick(e.title)}>{e.title}</span>
                <span>{e.secondaryTitle}</span>
                <span>{e.type}</span>
            </div>
            <div className="border-b-2 border-gray-500"/>
        </div>);
    }
    return (
        <div className="h-screen w-full mt-6 flex flex-col justify-start align-center">
            <motion.div />


            {!isModalOpen && (
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
            )}
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
                        <div className="px-2 py-2 flex justify-between bg-black text-yellow-500 rounded-b-md rounded-tr-md"

                        >
                            <div className="flex justify-between"

                            >
                                <div>
                                    <input type="checkbox" name="mediaType" value="song" onChange={handleFilterChange} />
                                    <label for="song">Song</label>
                                </div>
                            </div>
                            <div className="flex justify-between"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut", stagger: 0.2 }}
                            >

                                <div>
                                    <input type="checkbox" name="mediaType" value="rythm" onChange={handleFilterChange} />
                                    <label for="rythm">Rythm</label>
                                </div>
                            </div>
                            <div className="flex justify-between"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut", stagger: 0.3 }}
                            >

                                <div>
                                    <input type="checkbox" name="mediaType" value="biography" onChange={handleFilterChange} />
                                    <label for="biography">Biography</label>
                                </div>
                            </div>
                            <div className="flex justify-between"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut", stagger: 0.4 }}
                            >
                                <div>
                                    <input type="checkbox" name="mediaType" value="lexicon" onChange={handleFilterChange} />
                                    <label for="lexicon">Lexicon</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {
                !isModalOpen && (
                    <div className=" w-[98%] my-1 bg-black rounded-md border-2 border-black flex flex-col">
                        {content}
                    </div>
                )
            }

            {
                isModalOpen && (
                    <div className="min-h-fit w-full my-6">
                        {infoContent}
                    </div>)
            }
        </div >
    );
}

export default Research