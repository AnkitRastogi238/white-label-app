/**
 * Response screen object with breakpoints
 */
const screens = {
    sm: '640px',
    // => @media (min-width: 640px) { ... }
  
    md: '768px',
    // => @media (min-width: 768px) { ... }
  
    'uni-tablet': '769px',
    // => @media (min-width: 769px) { ... }
  
    lg: '1024px',
    // => @media (min-width: 1024px) { ... }
  
    'uni-desktop': '1025px',
    // => @media (min-width: 1024px) { ... }
  
    xl: '1280px',
    // => @media (min-width: 1280px) { ... }
  
    desktop1440: '1440px',
    // => @media (min-width: 1440px) { ... }
  
    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  
    tablet768: { min: '768px', max: '768px' },
    // => @media (min-width: 768px and max-width: 768px) { ... }
  
    tablet1024To1136: { min: '1024px', max: '1136px' },
    // => @media (min-width: 768px and max-width: 768px) { ... }
  };
  
  // export screen
  module.exports = screens;
  