import React, { useLayoutEffect, useRef, useState } from 'react';
const PointItem = ({ point, fadeIn, status, index, align = "center" }) => {
  const spanRef = useRef(null);
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    if (spanRef.current && wrapperRef.current) {
      wrapperRef.current.style.transition = 'none';
      const currentWidth = wrapperRef.current.offsetWidth;

      const textWidth = spanRef.current.offsetWidth;
      const iconWidth = 16;
      const spacing = 12;
      const padding = 32;
      const targetWidth = textWidth + iconWidth + spacing + padding;

      setWidth(currentWidth);

      requestAnimationFrame(() => {
        wrapperRef.current.style.transition = 'width 0.5s ease-in-out';
        setWidth(targetWidth);
      });
    }
  }, [point]);

  return (
    <div
      ref={wrapperRef}
      key={status + '-point-' + index}
      style={{ width: width ? `${width}px` : 'auto' }}
      className={"bg-white rounded-[24px] px-4 py-3 shadow-custom-mission-vision inline-flex my-[0.25rem] md:mb-0 items-center space-x-3 overflow-hidden justify-" + align} 
    >
      <img  loading="lazy" src="/assets/img_shines.png" alt="Shine icon" className="w-[1rem]" />
      <span
        ref={spanRef}
        className={`text-[0.75rem] md:text-[0.8rem] lg:text-[0.9rem] font-inter font-semibold text-black transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-50'
        }`}
      >
        {point}
      </span>
    </div>
  );
};


export default PointItem;