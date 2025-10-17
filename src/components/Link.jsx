import React from 'react';

/**
 * Link Component - OPERA Manufacture Design System
 *
 * CTA Link with arrow and circle
 * Variants:
 * - white: White circle with green arrow (for dark backgrounds)
 * - white-black: White circle with black arrow
 * - black: Black circle with green arrow
 * - black-white: Black circle with white arrow
 * - green: Green circle with black arrow
 * - green-white: Green circle with white arrow
 * - simple-green: Text only with green arrow
 * - simple-white: Text only with white arrow
 * - simple-black: Text only with black arrow
 */
const Link = ({
  children = 'Label',
  variant = 'white',
  href = '#',
  onClick,
  className = ''
}) => {
  const isSimple = variant.startsWith('simple-');

  const circleColors = {
    white: 'fill-white',
    'white-black': 'fill-white',
    black: 'fill-[#191A23]',
    'black-white': 'fill-[#191A23]',
    green: 'fill-[#B9FF66]',
    'green-white': 'fill-[#B9FF66]'
  };

  const arrowColors = {
    white: '#B9FF66',
    'white-black': 'black',
    black: '#B9FF66',
    'black-white': 'white',
    green: 'black',
    'green-white': 'white',
    'simple-green': '#B9FF66',
    'simple-white': 'white',
    'simple-black': 'black'
  };

  const textColors = {
    white: 'text-white',
    'white-black': 'text-white',
    black: 'text-black',
    'black-white': 'text-black',
    green: 'text-black',
    'green-white': 'text-white',
    'simple-green': 'text-lime-300',
    'simple-white': 'text-white',
    'simple-black': 'text-black'
  };

  const ArrowSVG = ({ fill }) => (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.25005 13.7009C0.532613 14.1151 0.2868 15.0325 0.701013 15.75C1.11523 16.4674 2.03261 16.7132 2.75005 16.299L1.25005 13.7009ZM20.7694 5.38818C20.9839 4.58798 20.509 3.76548 19.7088 3.55107L6.66879 0.0570084C5.86859 -0.157404 5.04608 0.317469 4.83167 1.11767C4.61726 1.91787 5.09213 2.74037 5.89233 2.95479L17.4834 6.06061L14.3776 17.6517C14.1632 18.4519 14.6381 19.2744 15.4383 19.4888C16.2385 19.7033 17.061 19.2284 17.2754 18.4282L20.7694 5.38818ZM2.75005 16.299L20.0706 6.29899L18.5706 3.70092L1.25005 13.7009L2.75005 16.299Z"
        fill={fill}
      />
    </svg>
  );

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex justify-start items-center gap-3.5 group cursor-pointer ${className}`}
    >
      {!isSimple && (
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
          <circle cx="20.5" cy="20.5" r="20.5" className={circleColors[variant]} />
        </svg>
      )}

      <ArrowSVG fill={arrowColors[variant]} />

      <span className={`text-xl font-normal font-['Space_Grotesk'] leading-7 ${textColors[variant]} group-hover:underline`}>
        {children}
      </span>
    </a>
  );
};

export default Link;
