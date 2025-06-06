import React from 'react'

const MahadanamSection = ({id}) => {
  return (
    <div className='px-[1.25rem] sm:px-0'>
      {id == 1 && <img src="/assets/Mahadanam.png" alt="Mahadanam" className='block sm:hidden mt-[3rem] rounded-[1rem]'/>}
      {id == 2 && <img src="/assets/Mahadanam.png" alt="Mahadanam" className='hidden sm:block'/>}      
    </div>
  )
}

export default MahadanamSection