import React from 'react';
import {Text} from 'native-base';
import {colors} from '~/theme/theme';

interface Props {
  text: string;
  isNecessary?: boolean;
}

export default function InputTopLabel({text, isNecessary}: Props) {
  return (
    <Text fontSize={'13px'} fontWeight={400} color={colors.grayScale[70]}>
      {text} {isNecessary && <Text color={colors.negative['-10']}>(필수)</Text>}
    </Text>
  );
}
