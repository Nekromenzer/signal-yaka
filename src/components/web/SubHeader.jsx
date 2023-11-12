import React from 'react'

const SubHeader = ({ children, textLeft }) => {
  return (
    <h3
      className={`text-4xl lg:text-5xl ${
        textLeft ? 'text-left' : 'text-center'
      } mb-12 text-black font-bold`}
      data-aos='fade-up'
    >
      {children}
    </h3>
  )
}

export default SubHeader
