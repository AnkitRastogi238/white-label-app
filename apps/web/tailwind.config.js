// external dependencies
const defaultTheme = require('tailwindcss/defaultTheme');
const { colors, screens, typography } = require('@white-label/ui/design.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  safelist: [
    'hidden',
    'static',
    'sticky',
    'top-0',
    'fixed',
    'top-se120',
    'md:top-28',
    'md:px-se60',
    'py-2',
    'px-3',
  ],
  theme: {
    screens: {
      ...screens,
    },
    minHeight: {
      ...typography.minHeight,
    },
    fontFamily: {
      ...typography.fontFamily,
      sans: ['Arial Rounded MT for SE', ...defaultTheme.fontFamily.sans],
    },
    backgroundPosition: {
      ...defaultTheme.backgroundPosition,
      ...typography.backgroundPosition,
    },
    minWidth: {
      ...typography.minWidth,
    },
    extend: {
      backgroundImage: {
        ...colors.backgroundImage,
      },
      colors: {
        ...colors,
      },
      letterSpacing: {
        ...typography.letterSpacing,
      },
      fontFamily: {
        ...typography.fontFamily,
      },
      fontSize: {
        ...typography.fontSize,
      },
      lineHeight: {
        ...typography.lineHeight,
      },
      spacing: {
        ...typography.spacing,
      },
      gap: {
        ...typography.gap,
      },
      maxWidth: {
        ...typography.maxWidth,
      },
      maxHeight: {
        ...typography.maxHeight,
      },
      height: {
        ...typography.height,
      },
      inset: {
        ...typography.inset,
      },
      margin: {
        ...typography.margin,
      },
      padding: {
        ...typography.padding,
      },
      width: {
        ...typography.width,
      },
      boxShadow: {
        ...typography.boxShadow,
      },
      borderRadius: {
        ...typography.borderRadius,
      },
      dropShadow: {
        ...typography.dropShadow,
      },
      opacity: {
        ...typography.opacity,
      },
      zIndex: {
        ...typography.zIndex,
      },
      content: {
        ...typography.content,
      },
      scale: {
        ...typography.scale,
      },
      blur: {
        ...typography.blur,
      },
      aspectRatio: {
        ...typography.aspectRatio,
      },
      lineClamp: {
        ...typography.lineClamp,
      },
      rotate: {
        ...typography.rotate,
      },
    },
  },
  plugins: [],
};
