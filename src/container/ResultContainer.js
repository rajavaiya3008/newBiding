import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { getLocalStorageItem } from "../utils/localStorageFunction";
import { lowestUniqBid } from "../utils/lowestBid";

export const ResultContainer = () => {
    const navigate = useNavigate();
  const [result, setResult] = useState({});
  const { handleRestart } = useContext(AppContext);

  const handleBack = () => {
    const isConfirm = handleRestart();
    if (isConfirm) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const users = getLocalStorageItem("users")
    const uniqBid = lowestUniqBid(users);
    const winnerData = () => {
       const keys = Object.keys(users)
       const ansObj = keys.map((key) => {
        return users[key].filter((bid) => {
            return Object.values(bid).includes(String(uniqBid[0]))
        })
       })
       let winUser;
       const finalWinner = ansObj.find((arr,i) => {
        if(arr.length > 0){
            winUser = i
            return arr
        }
       })
       const obj = {
        winnerUser:keys[winUser],
        value:uniqBid[0],
        winAmount:finalWinner[0].amount
       }
       return obj
    }
    setResult(winnerData());

  }, []);

  return {
    result,
    handleBack
  }
}