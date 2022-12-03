import {Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';

interface Props {
  onPress: () => void;
  active: boolean;
  buttonName: string;
}

function ChoiceButton({onPress, active, buttonName}: Props) {
  return (
    <Pressable
      onPress={onPress}
      borderColor={active ? colors.fussOrange[0] : colors.grayScale[30]}
      backgroundColor={active ? colors.fussOrange['-40'] : colors.grayScale[0]}
      w={'100%'}
      h={'52px'}
      borderWidth={1}
      borderRadius={8}>
      <Text
        color={active ? colors.fussOrange[0] : colors.grayScale[50]}
        textAlign={'center'}
        lineHeight={52}>
        {buttonName}
      </Text>
    </Pressable>
  );
}

export default ChoiceButton;
