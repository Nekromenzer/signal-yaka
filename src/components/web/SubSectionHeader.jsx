import React from 'react'

const SubSectionHeader = ({ children, icon }) => {
  return <div className='text-2xl flex items-center gap-3 mb-8 text-black'>{children} {icon}</div>
}

export default SubSectionHeader
