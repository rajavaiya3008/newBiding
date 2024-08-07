import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { setLocalStorageItem } from "../utils/localStorageFunction";
import { useNavigate } from "react-router-dom";
import { generateRandomIndex } from "../utils/commonFunction";

const min = 2000;
const max = 6000;

const NavBar = () => {
  const {
    coin,
    setCoin,
    currUser,
    setCurrIndex,
    submit,
    setSubmit,
    users,
    handleRestart,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const generateCoin = () => {
    const generatedCoin = generateRandomIndex(min,max);
    setCoin((prev) => {
      setLocalStorageItem("coin", {
        coin: generatedCoin,
        coinCount: prev.coinCount + 1,
      });
      return {
        coin: generatedCoin,
        coinCount: prev.coinCount + 1,
      };
    });
    // if (submit) {
    //   setLocalStorageItem("submit", false);
    //   setSubmit(false);
    //   setCurrIndex((prev) => {
    //     setLocalStorageItem("currIndex", prev + 1);
    //     return prev + 1;
    //   });
    // }
  };

  const handleResult = () => {
    navigate("/results");
  };

  const navBtn = [
    {
      name: "Coin",
      disable: coin.coinCount > 1,
      onClick: generateCoin,
    },
    {
      name: "Restart",
      disable: false,
      onClick: handleRestart,
    },
    {
      name: "Result",
      disable: Object.keys(users).length < 2,
      onClick: handleResult,
    },
  ];

  return (
    <div className="h-[50px] bg-gray-900 text-white flex justify-around">
      <p className="my-auto text-lg">
        User: {currUser?.[0]?.toUpperCase() + currUser?.substring(1)}
      </p>
      <div className="flex gap-[10px] my-auto">
        <p className="my-auto">{coin.coin}</p>
        {navBtn.map((btn, i) => (
          <button
            onClick={() => btn?.onClick()}
            disabled={btn?.disable}
            className={`ml-[20px] border border-gray-300 rounded-[5px] p-[5px] hover:bg-gray-600 hover:text-white ${
              btn?.disable && "cursor-not-allowed opacity-50"
            }`}
            key={i}
          >
            {btn?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
