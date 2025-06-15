import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

const Loader = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <ThreeDot color="#fa7000" size="medium" text="" textColor="" />      
    </div>
  )
}

export default Loader