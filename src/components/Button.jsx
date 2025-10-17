import React from 'react';

/**
 * Button Component - OPERA Manufacture Design System
 *
 * Variants:
 * - primary: Dark background with white text
 * - secondary: Outlined style with dark border
 * - tertiary: Lime green background with black text
 */
const Button = ({
  children = 'Label',
  variant = 'primary',
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
    secondary: 'bg-transparent text-black border border-zinc-900 hover:bg-zinc-50',
    tertiary: 'bg-lime-300 text-black hover:bg-lime-400'
  };

  return (
    <button
      onClick={onClick}
      className={`px-9 py-5 rounded-2xl inline-flex justify-center items-center gap-2.5 text-xl font-normal font-['Space_Grotesk'] leading-7 transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
