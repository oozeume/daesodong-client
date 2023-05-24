import {Button} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '~/theme/theme';
import FloatingButtonIcon from '~/assets/icons/edit_fill.svg';

export const FLOAT_BUTTON_HEIGHT = 20;

interface Props {
  onPress: () => void;
}

function FloatingButton({onPress}: Props) {
  return (
    <Button
      onPress={onPress}
      backgroundColor={colors.fussOrange[0]}
      style={styles.floatingButtonImage}
      width={'52px'}
      height={'52px'}
      borderRadius={'100px'}>
      <FloatingButtonIcon />
    </Button>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButtonImage: {
    position: 'absolute',
    bottom: 20,
    right: 18,
    zIndex: 99,
  },
});
