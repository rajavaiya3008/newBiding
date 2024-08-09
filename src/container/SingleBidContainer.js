import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { validation } from "../utils/validation";
import { setLocalStorageItem } from "../utils/localStorageFunction";
import { toast } from "react-toastify";

export const SingleBidContainer = (bid,index) => {
  const navigate = useNavigate();
  const {
    handleChange,
    currIndex,
    setCurrIndex,
    coin,
    setCoin,
    remainUser,
    error,
    setError,
    setUsers,
    currUser,
    data,
    handleSkip,
  } = useContext(AppContext);

  const disable = currIndex !== index || coin.coin < Number(bid.amount);
  
  const handleSubmit = (index, bid) => {
    const error = validation(bid);
    if (Object.keys(error).length) {
      setError(validation(bid));
      return;
    }
    setLocalStorageItem("currIndex", currIndex + 1);
    setCurrIndex(currIndex + 1);
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
    }
    if (coin.coin - bid.amount < price && remainUser.length !== 1) {
      toast.info("Coin is not Enough");
    }
    if (
      (coin.coinCount === 2 && coin.coin - bid.amount < price) ||
      price === 3000
    ) {
      handleSkip(navigate);
      return;
    }
  };

  return { handleChange, disable, index, currIndex, error, bid, handleSubmit };
};
