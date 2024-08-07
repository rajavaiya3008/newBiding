import { createContext, useState } from "react";
import { bidData } from "../utils/bidData";
import { allUsers } from "../utils/user";
import { validation } from "../utils/validation";
import { clearLocalStorageItem, getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageFunction";
import { generateRandomIndex } from "../utils/commonFunction";

const min = 0
const max = allUsers.length-1

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(getLocalStorageItem('bidData')||bidData);
  setLocalStorageItem('bidData',data)
  const [currIndex, setCurrIndex] = useState(getLocalStorageItem('currIndex') || 0);
  setLocalStorageItem('currIndex',currIndex)
  const [coin, setCoin] = useState(getLocalStorageItem('coin')||{ coin: 0, coinCount: 0 });
  setLocalStorageItem('coin',coin)
  const [submit, setSubmit] = useState(getLocalStorageItem('submit')||false);
  setLocalStorageItem('submit',submit)
  const [users, setUsers] = useState(getLocalStorageItem('users')||{});
  setLocalStorageItem('users',users)
  const [currUser, setCurrUser] = useState(getLocalStorageItem('currUser') || allUsers[generateRandomIndex(min,max)]);
  setLocalStorageItem('currUser',currUser)
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const newBid = data.map((curr) =>
      curr.amount === id ? { ...curr, [name]: value } : curr
    );
    const error = validation(newBid[currIndex]);
    setError(Object.keys(error).length ? error : {})
    setLocalStorageItem('bidData',newBid)
    setData(newBid);
  };

  const handleRestart = () => {
    const isConfirm = window.confirm("Are You Sure to Restart?");
    if (!isConfirm) {
      return;
    }
    clearLocalStorageItem()
    setData(bidData);
    setCurrIndex(0);
    setCoin({ coin: 0, coinCount: 0 });
    setSubmit(false);
    setUsers({});
    setCurrUser(allUsers[0]);
    setError({});
  };

  const value = {
    data,
    setData,
    currIndex,
    setCurrIndex,
    coin,
    setCoin,
    submit,
    setSubmit,
    users,
    setUsers,
    currUser,
    setCurrUser,
    error,
    setError,
    handleChange,
    handleRestart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
