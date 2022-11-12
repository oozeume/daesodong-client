import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    positive: {
      '-40': '#E5F5FF',
      0: '#0094FF',
    },
    grayScale: {
      0: '#FFFFFF',
      10: '#F6F7F7',
      20: '#ECECEE',
      30: '#E1E2E4',
      40: '#C6C8CD',
      50: '#9EA1A8',
      60: '#7F838C',
      70: '#5D626D',
      80: '#383E4A',
      90: '#1A1E27',
    },
    fussOrange: {
      '-40': '#FFF5EF',
      '-30': '#FFEADC',
      0: '#FF6B00',
    },
    fussYellow: {
      '-30': '#FFF6D8',
      0: '#FFD53F',
      10: '#FFCC16',
    },
    negative: {
      '-10': '##F8676A',
      0: '#F6363A',
    },
    scrim: {
      60: 'rgba(26, 30, 39, 0.6)',
    },
  },
} as const);

const {colors} = theme;

export {colors, theme};
