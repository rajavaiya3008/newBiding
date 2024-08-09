import React from "react";
import InputField from "../shared/InputField";
import { SingleBidContainer } from "../container/SingleBidContainer";
import Button from "../shared/Button";

const SingleBid = ({ bid, index }) => {
  const { handleChange, disable, currIndex, error, handleSubmit } =
    SingleBidContainer(bid, index);

  return (
    <div
      className={`h-[420px] border p-4 ${
        disable ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-white"
      }`}
    >
      <p className="text-center text-2xl">
        {bid.amount === "0" ? "Free" : bid.amount}
      </p>
      <div className="flex flex-col">
        {Object.keys(bid).map(
          (key, i) =>
            key !== "amount" && (
              <InputField
                {...{ handleChange, disable, index, currIndex, error, bid }}
                id={bid.amount}
                name={key}
                value={bid[key]}
                key={i}
              />
            )
        )}
      </div>
      <Button
        onClick={() => handleSubmit(index, bid)}
        disabled={disable}
        style={
          "bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
        }
      >
        Submit
      </Button>
      {/* <button
        onClick={() => handleSubmit(index, bid)}
        disabled={disable}
        className="bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
      >
        Submit
      </button> */}
    </div>
  );
};

export default SingleBid;
