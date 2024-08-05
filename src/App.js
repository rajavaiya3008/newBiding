import { useState } from "react";
import SingleBid from "./components/SingleBid";
import { bidData } from "./utils/bidData";

function App() {
  const [data, setdata] = useState(bidData)
  const [currIndex,setCurrIndex] = useState(0);
  const handleChange = (e) => {
    const {id,name,value} = e.target;
    const newBid = data.map((curr) => 
      curr.amount === id ? { ...curr, [name]: value } : curr
    );
    console.log('newBid', newBid)
    setdata(newBid)
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {
        data.map((bid,i) => (
          <SingleBid bid={bid} key={i} handleChange={handleChange} index={i} currIndex={currIndex} setCurrIndex={setCurrIndex}/>
        ))
      }
    </div>
  );
}

export default App;
