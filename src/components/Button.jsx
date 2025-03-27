import React from 'react'

const Button = ({className,type,text ,onClick}) => {
  return (
    <>
    <button className={`w-fit text-lg px-4 py-1 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 " ${className}`}
    onClick={onClick}
    type={type}>{text}</button>  
    </>
  )
}

export default Button
