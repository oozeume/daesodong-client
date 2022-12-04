import {extendTheme} from 'native-base';

const theme = extendTheme({
  components: {
    Pressable: {
      variants: {
        solidFussOrange: () => {
          return {
            backgroundColor: '#FF6B00',
            height: '52px',
            borderWidth: '1px',
            borderRadius: '8px',
            borderColor: '#1A1E27',
            shadowOffset: {
              width: 0,
              heigth: 3,
            },
            shadowOpacity: 0.15,
          };
        },
        opacityFussOrange: () => {
          return {
            backgroundColor: '#FFEADC',
            height: '52px',
            borderWidth: '1px',
            borderRadius: '8px',
            borderColor: '#9EA1A8',
            shadowOffset: {
              width: 0,
              heigth: 3,
            },
            shadowOpacity: 0.15,
          };
        },
      },
    },
    Text: {
      variants: {
        solidFussOrange: () => {
          return {
            textAlign: 'center',
            lineHeight: '52px',
            color: '#1A1E27',
          };
        },
        opacityFussOrange: () => {
          return {
            textAlign: 'center',
            lineHeight: '52px',
            color: '#9EA1A8',
          };
        },
      },
    },
  },
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
      '-20': '#FFD0AE',
      0: '#FF6B00',
    },
    fussYellow: {
      '-30': '#FFF6D8',
      0: '#FFD53F',
      10: '#FFCC16',
      30: '#A77800',
    },
    negative: {
      '-10': '#F8676A',
      0: '#F6363A',
    },
    scrim: {
      60: 'rgba(26, 30, 39, 0.6)',
    },
  },
});

const {colors} = theme;

export {colors, theme};
