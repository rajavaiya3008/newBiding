import React from 'react'

const Button = ({children,onClick,disabled,style}) => {
  return (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${style}`}
      >
        {children}
      </button>
  )
}

export default Button