import _ from 'lodash';
import {Box, KeyboardAvoidingView} from 'native-base';
import React, {useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';

import {colors} from '~/theme/theme';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import PasswordResetPhoneCheck from './phoneCheck';
import PasswordResetChange from './change';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';

/**
 *@description 비밀번호 재설정 페이지
 */
function PasswordReset() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [emailForm, setEmailForm] = useState('');
  const [currentStage, setCurrentStage] = useState(1);
  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  const onMoveSuccessPage = () => {
    navigate('PasswordResetSuccess');
  };

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss} style={{flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: colors.grayScale[0],
          flex: 1,
        }}>
        <KeyboardAvoidingView
          flex={1}
          behavior={'padding'}
          keyboardVerticalOffset={40}>
          <Box
            flex={1}
            marginX={'18px'}
            pb="40px"
            backgroundColor={colors.grayScale[0]}>
            <CurrentComponentOfArray index={currentStage}>
              <PasswordResetPhoneCheck
                handlePage={moveToNextPage}
                setEmailForm={setEmailForm}
              />
              <PasswordResetChange
                handlePage={onMoveSuccessPage}
                emailForm={emailForm}
              />
            </CurrentComponentOfArray>
          </Box>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default PasswordReset;
