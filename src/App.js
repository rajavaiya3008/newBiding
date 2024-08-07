import { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { AppContext } from "./context/AppContextProvider";
import { getLocalStorageItem } from "./utils/localStorageFunction";

function App() {
  const {
    setData,
    setCurrIndex,
    setCoin,
    setSubmit,
    setUsers,
    setCurrUser
  } = useContext(AppContext)

  // useEffect(() => {
  //   if(getLocalStorageItem('bidData')){
  //     setData(getLocalStorageItem('bidData'))
  //     setCurrIndex(getLocalStorageItem('currIndex'))
  //     setCoin(getLocalStorageItem('coin') || { coin: 0, coinCount: 0 })
  //     setSubmit(getLocalStorageItem('submit'))
  //     setUsers(getLocalStorageItem('users'))
  //     setCurrUser(getLocalStorageItem('currUser'))
  //   }
  // },[])

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
