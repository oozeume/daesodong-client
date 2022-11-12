import _ from 'lodash';
import {Box} from 'native-base';
import React, {useState} from 'react';
import {Platform} from 'react-native';

import Button from '~/components/common/button';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';

interface Props {
  handlePage: () => void;
}

/**
 *@description 아이디(이메일) 입력
 */

function EmailRegister({handlePage}: Props) {
  const [email, setEmail] = useState('');
  const onEmailChange = (text: string) => setEmail(text);

  return (
    <>
      <VerificationForm
        placeholder={'아이디 (이메일)'}
        value={email}
        onChangeText={onEmailChange}
      />
      <Box
        w={'100%'}
        position={'absolute'}
        bottom={Platform.OS === 'android' ? '10px' : 0}>
        <Box pt={'18px'} backgroundColor={colors.grayScale[0]}>
          <Button
            large
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
            handlePress={() => {
              handlePage();
            }}
            active={!_.isEmpty(email)}
          />
        </Box>
      </Box>
    </>
  );
}

export default EmailRegister;
