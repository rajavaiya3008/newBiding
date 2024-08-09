import { createContext, useState } from "react";
import { bidData } from "../utils/bidData";
import { allUsers } from "../utils/user";
import { validation } from "../utils/validation";
import {
  clearLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorageFunction";
import { generateRandomIndex } from "../utils/commonFunction";

const min = 0;
const max = allUsers.length - 1;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(getLocalStorageItem("bidData") || bidData);
  setLocalStorageItem("bidData", data);
  const [currIndex, setCurrIndex] = useState(
    getLocalStorageItem("currIndex") || 0
  );
  setLocalStorageItem("currIndex", currIndex);
  const [coin, setCoin] = useState(
    getLocalStorageItem("coin") || { coin: 0, coinCount: 0 }
  );
  setLocalStorageItem("coin", coin);
  const [users, setUsers] = useState(getLocalStorageItem("users") || {});
  setLocalStorageItem("users", users);
  const [currUser, setCurrUser] = useState(
    getLocalStorageItem("currUser") || allUsers[generateRandomIndex(min, max)]
  );
  setLocalStorageItem("currUser", currUser);
  const [remainUser, setRemainUser] = useState(
    getLocalStorageItem("remainUser") || allUsers
  );
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const newBid = data.map((curr) =>
      curr.amount === id ? { ...curr, [name]: value } : curr
    );
    const error = validation(newBid[currIndex]);
    setError(Object.keys(error).length ? error : {});
    setLocalStorageItem("bidData", newBid);
    setData(newBid);
  };

  const handleRestart = () => {
    const isConfirm = window.confirm("Are You Sure to Restart?");
    if (!isConfirm) {
      return isConfirm;
    }
    clearLocalStorageItem();
    setData(bidData);
    setCurrIndex(0);
    setCoin({ coin: 0, coinCount: 0 });
    setUsers({});
    const ranIndx = generateRandomIndex(0, allUsers.length - 1);
    setCurrUser(allUsers[ranIndx]);
    setError({});
    return isConfirm;
  };

  const handleSkip = (navigate) => {
    const playedUser = allUsers.filter(
      (user) =>
        !Object.keys(getLocalStorageItem("users"))?.includes(user) &&
        getLocalStorageItem("currUser") !== user
    );
    if (playedUser.length === 0) {
      navigate("/results", { replace: true });
      return;
    }
    setRemainUser((prev) => {
      setLocalStorageItem("remainUser", playedUser);
      return playedUser;
    });
    const min = 0;
    const max = playedUser.length - 1;
    const randomUser = generateRandomIndex(min, max);
    setLocalStorageItem(
      "currUser",
      playedUser.length === 1 ? playedUser[0] : playedUser[randomUser]
    );
    setCurrUser(
      playedUser.length === 1 ? playedUser[0] : playedUser[randomUser]
    );
    setLocalStorageItem("bidData", bidData);
    setData(bidData);
    setLocalStorageItem("coin", {
      coin: 0,
      coinCount: 0,
    });
    setCoin((prev) => ({
      coin: 0,
      coinCount: 0,
    }));
    setLocalStorageItem("currIndex", 0);
    setCurrIndex(0);
  };

  const value = {
    data,
    setData,
    currIndex,
    setCurrIndex,
    coin,
    setCoin,
    users,
    setUsers,
    currUser,
    setCurrUser,
    remainUser,
    setRemainUser,
    error,
    setError,
    handleChange,
    handleRestart,
    handleSkip,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
