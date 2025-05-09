import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";

import { addToList } from "../store/reducers/mySubmits";

function MySubmits() {
    const [dataFetched, setdataFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const token = useAppSelector((state) => state.authToken.value);
    const mySubmits = useAppSelector((state) => state.mySubmits.value);
    const submitNumber = mySubmits.length
    console.log("mySubmits", mySubmits)

   
useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/submits/mySubmits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: token }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
  
          const data = await response.json();
          dispatch(addToList(data));
          console.log("fetch triggered");
  
          setdataFetched(true);
          setIsLoading(false);
          console.log("dataFetched set to true");
        } catch (error) {
          console.error("Fetch error:", error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }
  }, [dataFetched, token, dispatch]);

    return (
        <div className="h-full w-full flex flex-col -mt-20 ">
            <div className="w-full bg-gray-200  rounded-xl mb-2">
                <h3 className="text-xl">Nombre de publications:{submitNumber}</h3>
                {mySubmits.map((e, index) => (
                <div key={index}>
                </div>
                ))}
            </div>
        </div>
    )
}

export default MySubmits