import React from 'react'

const InputField = ({id,name,value,handleChange,index,currIndex}) => {
  return (
    <div>
        <input 
        type='number'
        name={name}
        id={id}
        value={value}
        onChange={(e) => handleChange(e)}
        disabled={currIndex !== index}
        className='border'
        />
    </div>
  )
}

export default InputField