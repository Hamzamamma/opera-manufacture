import React from 'react';

/**
 * Heading Component - OPERA Manufacture Design System
 *
 * Highlighted heading with colored background spans
 * Variants:
 * - green: Lime green background
 * - white: White background
 * - black: Black background with white text
 */
const Heading = ({ children, highlights = [], variant = 'green', className = '' }) => {
  const variants = {
    green: 'bg-lime-300 text-black',
    white: 'bg-white text-black',
    black: 'bg-zinc-900 text-white'
  };

  // Se highlights è un array, evidenzia quelle parole
  const renderText = () => {
    if (!highlights || highlights.length === 0) {
      return <span className={`px-1.5 ${variants[variant]} rounded-md`}>{children}</span>;
    }

    const text = String(children);
    let lastIndex = 0;
    const parts = [];

    highlights.forEach((highlight, idx) => {
      const index = text.indexOf(highlight, lastIndex);
      if (index !== -1) {
        // Testo prima dell'highlight
        if (index > lastIndex) {
          parts.push(text.substring(lastIndex, index));
        }
        // Highlight
        parts.push(
          <span key={idx} className={`px-1.5 ${variants[variant]} rounded-md`}>
            {highlight}
          </span>
        );
        lastIndex = index + highlight.length;
      }
    });

    // Testo rimanente
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <h2 className={`text-4xl font-medium font-['Space_Grotesk'] ${className}`}>
      {renderText()}
    </h2>
  );
};

export default Heading;
