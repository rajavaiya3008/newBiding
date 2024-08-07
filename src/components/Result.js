import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "../utils/localStorageFunction";
import { lowestUniqBid } from "../utils/lowestBid";

const Result = () => {
  const navigate = useNavigate();
const [result,setResult] = useState({})

  useEffect(() => {
    const resultData = lowestUniqBid(getLocalStorageItem('users'));
    setResult(resultData)
  },[])
  return (
    <div className="flex justify-center items-center flex-col text-2xl">
      <p className="">
        Winner:{result?.winnerUser} Bid:{result?.value}
      </p>
      
      {result?.uniqValData && Object.keys(result?.uniqValData).map(
        (key, i) =>
          key !== result?.winnerUser && (
            <p key={i}>
              User: {key} Lowest Bid: {result?.uniqValData?.[key]?.[0]}
            </p>
          )
      )}
      <button
        className={
          "bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
        }
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default Result;
