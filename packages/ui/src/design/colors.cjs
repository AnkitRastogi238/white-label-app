/**
 * all the colors used in the design system
 */
const colors = {
    transparent: 'transparent',
    current: 'currentColor',
    backgroundImage: {
      'ng-gradient-black': 'linear-gradient( 0deg, #000000 60%, rgba(0, 0, 0, 0) 100% )',
      'ng-gradient-black-0P':
        'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%)',
      'ng-gradient-black-13P':
        'linear-gradient( 0deg, rgba(0, 0, 0, 0.50) 13%, rgba(0, 0, 0, 0.00) 100%)',
      'ng-gradient-blue': 'linear-gradient(0deg, #005b8c 50%, #3A0EDA00 100%)',
      'ng-gradient-gray':
        'linear-gradient(0deg, rgba(0, 0, 0, 0.69) 0%, rgba(173, 173, 173, 0.47) 74.5%, rgba(255, 255, 255, 0.00) 100%)',
      'ng-gradient-black-transparent': 'linear-gradient(180deg, #000 45%, rgba(0, 0, 0, 0.00) 100%)',
      'ng-gradient-white':
        'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0.79%, rgba(255, 255, 255, 0.20) 7.14%, rgba(255, 255, 255, 0.77) 17.86%, #FFF 53.17%)',
      'ng-gradient-lightgray': 'linear-gradient(270deg, #DFE4E9 0.32%, #BCC6D0 99.74%)',
    },
    ng: {
      // TODO: add the colors based on the figma which stick to the design system
      /* Primary Colors */
      DEFAULT: '#1f2937', //Blue
      primary: '#4E5258', //Grey
      secondary: '#FFD100', //yellow
  
      /* Others */
      green: {
        100: '#008A16',
        200: '#00A11A',
        300: '#009639',
        400: '#077C2F',
        500: '#E2FFED',
        600: '#CDFFE0',
      },
      gray: {
        25: '#BBB',
        50: '#E6E6E6',
        75: '#E5E5E5',
        100: '#F4F4F4',
        125: '#FAFAFA',
        150: '#FAFBFA',
        175: '#A5A5A5',
        200: '#F3F3F3',
        225: '#121619',
        250: '#F2F2F2',
        275: '#21272A',
        280: '#D1D1D1',
        285: '#D1D1D1',
        300: '#D2D2D2',
        325: '#D6D6D6',
        350: '#D9D9D9',
        375: '#DDD',
        380: '#dfe4e9',
        390: '#DEE2E6',
        400: '#EEE',
        425: '#EBEBEB',
        450: '#CDCECB',
        475: '#CBCFD2',
        500: '#4F5358',
        525: '#878585',
        550: '#F8F8F8',
        600: '#F5F5F5',
        625: '#EDEDED',
        650: '#666',
        675: '#8E979F',
        700: '#B5B5B5',
        725: '#ECEDEE',
        750: '#E8E8E8',
        775: '#E9E9E9',
        800: '#4E5258',
        825: '#333',
        850: 'rgba(255, 255, 255, 0.64)',
        875: '#4F575E',
        900: '#585858',
        915: '#525252',
        925: '#333333',
        950: '#353535',
        975: '#202020',
        980: '#F7F7F7',
      },
      skyBlue: {
        100: '#EEF9FF',
        400: '#173F73',
        500: '#C6E9FF',
      },
      blue: {
        50: '#EEF9FF',
        100: '#0087CD',
        200: '#009ECD',
        300: '#1e2937',
        400: '#1f2937',
        425: '#C6E9FF',
        500: '#B5CFE0',
        600: '#DDE1E6',
        900: '#02314E',
      },
      yellow: {
        100: '#FDFCFA',
        200: '#FFD100',
        300: '#FFF9DB',
        400: '#FFF8DA',
      },
      black: {
        100: '#2C2C2C',
        200: '#505050',
        300: '#585858',
        400: '#262626',
        500: '#393939',
      },
      white: {
        200: '#F4F3F3',
        300: '#F8F8F8',
      },
      red: {
        100: '#FFE4E4',
        200: '#F09696',
        300: '#C92929',
        400: '#D0433F',
      },
      orange: {
        100: '#CDFFE0',
        200: '#009639',
      },
    },
  };
  
  // export colors
  module.exports = colors;
  