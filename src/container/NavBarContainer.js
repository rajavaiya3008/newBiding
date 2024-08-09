import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { generateRandomIndex } from "../utils/commonFunction";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageFunction";

const min = 3000;
const max = 6000;

export const NavBarContainer = () => {
  const {
    coin,
    setCoin,
    currUser,
    currIndex,
    users,
    handleRestart,
    handleSkip,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const generateCoin = () => {
    const generatedCoin = generateRandomIndex(min, max);
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
  };

  const handleResult = () => {
    navigate("/results");
  };

  const visible = pathname !== "/results";

  const navBtn = [
    {
      name: "Coin",
      disable: coin.coinCount > 1 || currIndex < 1,
      onClick: generateCoin,
      visible: visible,
    },
    {
      name: "Restart",
      disable: false,
      onClick: handleRestart,
      visible: visible,
    },
    {
      name: "Skip",
      disable: !Object.keys(getLocalStorageItem("users")).includes(currUser),
      onClick: handleSkip,
      visible: visible,
    },
    {
      name: "Result",
      disable: Object.keys(users).length < 2,
      onClick: handleResult,
      visible: visible,
    },
  ];

  return {
    visible,
    currUser,
    coin,
    navBtn,
    navigate
  };
};
