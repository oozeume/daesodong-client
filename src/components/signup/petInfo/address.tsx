import {Stack} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';

interface Props {
  handlePage: () => void;
}

function Address({handlePage}: Props) {
  return (
    <LayoutContainer>
      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default Address;
