import React, { useLayoutEffect, useRef, useState } from 'react';

const PointItem = ({ point, fadeIn, status, index }) => {
  const spanRef = useRef(null);
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    if (spanRef.current && wrapperRef.current) {
      // Temporarily disable transition to measure current width
      wrapperRef.current.style.transition = 'none';
      const currentWidth = wrapperRef.current.offsetWidth;

      // Measure new width
      const textWidth = spanRef.current.offsetWidth;
      const iconWidth = 16; // 1rem
      const spacing = 12;   // space-x-3
      const padding = 32;   // px-4 total
      const targetWidth = textWidth + iconWidth + spacing + padding;

      // Set current width first
      setWidth(currentWidth);

      // Trigger reflow and then apply new width with transition
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
      className="bg-white rounded-[24px] px-4 py-3 shadow-custom-mission-vision inline-flex items-center space-x-3 overflow-hidden"
      style={{ width: width ? `${width}px` : 'auto' }}
    >
      <img src="/assets/img_shines.png" alt="Shine icon" className="w-[1rem]" />
      <span
        ref={spanRef}
        className={`text-[0.9rem] font-inter font-semibold text-black transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-50'
        }`}
      >
        {point}
      </span>
    </div>
  );
};


export default PointItem;