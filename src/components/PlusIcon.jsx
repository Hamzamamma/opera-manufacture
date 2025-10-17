import React from 'react';

/**
 * PlusIcon Component - OPERA Manufacture Design System
 *
 * Expandable icon for accordions/toggles
 * Variants:
 * - plus: Plus icon
 * - minus: Minus icon
 */
const PlusIcon = ({ variant = 'plus', onClick, className = '' }) => {
  const isPlusIcon = variant === 'plus';

  return (
    <button
      onClick={onClick}
      className={`transition-transform hover:scale-105 ${className}`}
      aria-label={isPlusIcon ? 'Expand' : 'Collapse'}
    >
      {isPlusIcon ? (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="29" cy="29" r="28.5" fill="#F3F3F3" stroke="#191A23"/>
          <path d="M25.6 41.08V31.36H16V25.72H25.6V16H31.48V25.72H41.08V31.36H31.48V41.08H25.6Z" fill="#191A23"/>
        </svg>
      ) : (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="29" cy="29" r="28.5" fill="#F3F3F3" stroke="#191A23"/>
          <path d="M20 31.64V26H37.76V31.64H20Z" fill="black"/>
        </svg>
      )}
    </button>
  );
};

export default PlusIcon;
