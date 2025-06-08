import React from 'react'

const StatsCard = ({position}) => {
  return (
    <>
    {position == 'inside' &&
     (<div className="hidden lg:flex gap-5 items-center justify-evenly px-[0.5rem] py-[0.25rem] bg-[#edf2f7cc] rounded-[40px] shadow-[0px_4px_12px_rgba(136,136,136,1)] cursor-pointer">
          {/* Karma Insights Header */}
          <div className="flex flex-row items-center gap-3 relative">
            <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4">
              <div className="flex items-center space-x-3">
                <img src="/assets/img_shines.png" alt="Shine icon" className="h-4 lg:h-5" />
                <span className="text-[0.75rem] lg:text-lg font-semibold font-inter text-black">Karma Insights</span>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-0">
            <div className="w-fit">
              <p className="w-fit text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] ">
                800K
              </p>
              <p className="w-fit text-base font-semibold text-[#2c2c2cbb]">
                Meals Served
              </p>
            </div>
            <div>
              <div className="text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] ">
                50K
              </div>
              <div className="text-base font-semibold text-[#2c2c2cbb]">
                {' '}
                Children's Educated{' '}
              </div>
            </div>
          </div>

          {/* Donors Info */}
          <div className="flex items-center space-x-4">
            <img src="/assets/img_frame_12.png" alt="Donor avatars" className="h-12" />
            <p className="text-sm font-bold text-[#505051] leading-4">
              300+ Donors around the world
            </p>
          </div>
    </div>)}

    {position == 'outside' &&
     (<div className="flex lg:hidden flex-col items-center bg-[#edf2f7cc] rounded-[40px] p-6 mb-[2rem] w-[80%] sm:w-[60%] h-[14rem] cursor-pointer">
          {/* Karma Insights Header */}
          <div className="flex flex-row items-center mb-6 gap-3 relative">
            <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-custom-numKeys">
              <div className="flex items-center space-x-3">
                <img src="/assets/img_shines.png" alt="Shine icon" className="w-5 h-5" />
                <span className="text-lg font-semibold font-inter text-black">Karma Insights</span>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-0 mb-6">
            <div className="w-fit text-center">
              <p className="w-fit text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] leading-10">
                800K
              </p>
              <p className="w-fit text-base font-semibold text-[#2c2c2cbb] leading-6">
                Meals Served
              </p>
            </div>
            <div>
              <div className="text-[1.5rem] font-urbanist font-bold text-[#2c2c2cbb] leading-10">
                50K
              </div>
              <div className="text-base font-semibold text-[#2c2c2cbb] leading-6">
                {' '}
                Children's Educated{' '}
              </div>
            </div>
          </div>

          {/* Donors Info */}
          <div className="flex items-center space-x-4">
            <img src="/assets/img_frame_12.png" alt="Donor avatars" className="h-12" />
            <p className="text-sm font-bold text-[#505051] leading-4">
              300+ Donors around the world
            </p>
          </div>
    </div>)}
    </>
  )
}

export default StatsCard