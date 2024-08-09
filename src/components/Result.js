import React from "react";
import { ResultContainer } from "../container/ResultContainer";
import Button from "../shared/Button";

const Result = () => {
  const { result, handleBack } = ResultContainer();

  return (
    <div className="flex justify-center items-center flex-col text-2xl">
      <p className="">
        Winner:{result?.winnerUser} Bid:{result?.value} Amount:{" "}
        {result?.winAmount === "0" ? "Free" : result?.winAmount}
      </p>

      <Button
        onClick={() => handleBack()}
        style={
          "bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
        }
      >
        Restart
      </Button>

      {/* <button
        className={
          "bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
        }
        onClick={() => handleBack()}
      >
        Restart
      </button> */}
    </div>
  );
};

export default Result;
