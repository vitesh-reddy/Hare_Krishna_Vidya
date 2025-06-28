import React from 'react'

const MahadanamSection = ({id}) => {
  return (
    <div className='px-[1.25rem] sm:px-0 w-full flex justify-center'>
      {id == 1 && <img  loading="lazy" src="/assets/Mahadanam.png" alt="Mahadanam" className='block sm:hidden mt-[3rem] rounded-[1rem]'/>}
      {id == 2 && <img  loading="lazy" src="/assets/Mahadanam.png" alt="Mahadanam" className='hidden sm:block '/>}      
    </div>
  )
}

export default MahadanamSection