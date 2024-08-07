import React, { useContext, useEffect, useState } from "react";
import InputField from "../shared/InputField";
import { validation } from "../utils/validation";
import { toast } from "react-toastify";
import { allUsers } from "../utils/user";
import { bidData } from "../utils/bidData";
import { lowestUniqBid } from "../utils/lowestBid";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageFunction";
import { generateRandomIndex } from "../utils/commonFunction";

// const playUser = allUsers.filter((user) => user !== allUsers[0]);

const SingleBid = ({ bid, index }) => {
  const navigate = useNavigate();
  const {
    handleChange,
    currIndex,
    setCurrIndex,
    coin,
    setCoin,
    error,
    setError,
    users,
    setUsers,
    currUser,
    setCurrUser,
    data,
    setData,
    submit,
    setSubmit,
  } = useContext(AppContext);
  const [remainUser, setRemainUser] = useState(getLocalStorageItem('remainUser') || allUsers);

  const disable = ((currIndex !== index) || (coin.coin < Number(bid.amount)));
  // const disable = ((currIndex !== index) || submit);
  const handleSubmit = (index, bid) => {
    const error = validation(bid);
    if (Object.keys(error).length) {
      setError(validation(bid));
      return;
    }
    setLocalStorageItem("submit", true);
    setSubmit(true);
    setLocalStorageItem('currIndex',currIndex+1)
    setCurrIndex(currIndex+1)
    const price = Number(bid.amount) + 500;
    if (coin.coin > price) {
      setCoin((prev) => {
        setLocalStorageItem("coin", {
          ...prev,
          coin: prev.coin - bid.amount,
        });
        return {
          ...prev,
          coin: prev.coin - bid.amount,
        };
      });
      // setLocalStorageItem('currIndex',index + 1)
      // setCurrIndex(index + 1);
      setLocalStorageItem("submit", false);
      setSubmit(false);
    }
    if (coin.coin - bid.amount < price && remainUser.length !== 1) {
      toast.info("Coin is not Enough");
    }
    if ((coin.coinCount === 2  && coin.coin-bid.amount < price) || price === 3000) {
      // console.log("enter in to if");
      setUsers((prev) => {
        setLocalStorageItem("users", {
          ...prev,
          [currUser]: data,
        });
        return {
          ...prev,
          [currUser]: data,
        };
      });
      // console.log("remainUser", remainUser);
      // const playedUser = remainUser.filter((user) => user !== getLocalStorageItem('currUser'));
      const playedUser = allUsers.filter((user) => !Object.keys(getLocalStorageItem('users'))?.includes(user) && getLocalStorageItem('currUser') !== user)
      // console.log("playedUser", playedUser);
      if (playedUser.length === 0) {
        // console.log("remainUser", remainUser);
        const { winnerUser, value, uniqValData } = lowestUniqBid({
          ...users,
          [currUser]: data,
        });
        toast.success(`${winnerUser} is Winner and Bid is ${value}`);
        navigate("/results", { state: { winnerUser, value, uniqValData } });
        return;
      }
      // setLocalStorageItem('remainUser',playedUser)
      setRemainUser((prev) => {
        setLocalStorageItem('remainUser',playedUser)
        return playedUser
      });
      const min = 0;
      const max = playedUser.length - 1;
      const randomUser = generateRandomIndex(min,max);
      setLocalStorageItem(
        "currUser",
        playedUser.length === 1 ? playedUser[0] : playedUser[randomUser]
      );
      setCurrUser(
        playedUser.length === 1 ? playedUser[0] : playedUser[randomUser]
      );
      setLocalStorageItem('bidData',bidData)
      setData(bidData);
      setLocalStorageItem('coin',{
        coin: 0,
        coinCount: 0,
      })
      setCoin((prev) => ({
        coin: 0,
        coinCount: 0,
      }));
      setLocalStorageItem('currIndex',0)
      setCurrIndex(0);
      setLocalStorageItem('submit',false)
      setSubmit(false);
      return;
    }
  };

  return (
    <div
      className={`h-[420px] border p-4 ${
        disable ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-white"
      }`}
    >
      <p className="text-center">{bid.amount === "0" ? "Free" : bid.amount}</p>
      <div className="flex flex-col gap-[10px]">
        {Object.keys(bid).map(
          (key, i) =>
            key !== "amount" && (
              <InputField
                {...{ handleChange, disable, index, currIndex, error, bid }}
                id={bid.amount}
                name={key}
                value={bid[key]||""}
                key={i}
              />
            )
        )}
      </div>
      <button
        onClick={() => handleSubmit(index, bid)}
        disabled={disable}
        className="bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center mt-[10px]"
      >
        Submit
      </button>
    </div>
  );
};

export default SingleBid;
