import React from 'react'
import InputField from '../shared/InputField'

const SingleBid = ({bid,handleChange,index,currIndex,setCurrIndex}) => {

    const handleSubmit = (index) => {
        setCurrIndex(index+1);
    }

    
  return (
    <div className={`p-4 ${currIndex !== index ? 'bg-gray-200 opacity-50 cursor-not-allowed' : 'bg-white'}`}>
        <p>{bid.amount}</p>
        {
            Object.keys(bid).map((key,i) => (
               key !== 'amount' && <InputField id={bid.amount} name={key} value={bid[key]} handleChange={handleChange} index={index} currIndex={currIndex} key={i}/>
            ))
        }
        <button
        onClick={() => handleSubmit(index)}
        >Submit</button>
    </div>
  )
}

export default SingleBid