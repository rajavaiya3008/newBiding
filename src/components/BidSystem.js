import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import SingleBid from "./SingleBid";

const BidSystem = () => {
  const { data } = useContext(AppContext);
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((bid, index) => (
        <SingleBid
          {...{
            bid,
            index,
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default BidSystem;
