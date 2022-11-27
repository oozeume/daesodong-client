import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _ from 'lodash';
import {Box, Center, HStack, Pressable} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icon/back_icon.svg';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import NickNameRegister from '~/components/common/NickNameRegister';
import PhoneVerification from '~/components/signup/social/PhoneVerification';
import {colors} from '~/theme/theme';
import EmailRegister from '~/components/signup/email/emailRegister';
import PasswordRegister from '~/components/common/PasswordRegister';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import {initSignupForm} from '~/constants/signup';

type Props = NativeStackScreenProps<ParamListBase, 'SignUpEmail'>;

const STAGE_TEXT_LIST = [
  ['회원여부 확인 및 가입을 진행합니다'],
  ['아이디를 입력해주세요'],
  ['비밀번호를 입력해주세요'],
  ['닉네임을 입력해주세요'],
];

/**
 *@description 이메일 회원가입 페이지
 */

function SignUpEmail({navigation}: Props) {
  const [currentStage, setCurrentStage] = useState(1);

  const [signupForm, setSignupForm] = useState(initSignupForm);

  const onPressBack = () => {
    if (currentStage === 1) {
      navigation.goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  console.log(signupForm);

  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
        <HStack
          space={3}
          h={Platform.OS === 'android' ? '10%' : '8%'}
          justifyContent={'space-between'}
          paddingX={'18px'}
          backgroundColor={colors.grayScale[0]}>
          <Center h="60" w="30">
            <Pressable onPress={onPressBack}>
              <BackIcon />
            </Pressable>
          </Center>
        </HStack>
        <StageBar totalStage={4} currentStage={currentStage} />

        <Box
          h={Platform.OS === 'android' ? '90%' : '92%'}
          position={'relative'}
          marginX={'18px'}
          backgroundColor={colors.grayScale[0]}>
          <Center marginY={'60px'}>
            <StageTextBox
              totalStage={4}
              currentStage={currentStage}
              stageTextList={STAGE_TEXT_LIST[currentStage - 1]}
            />
          </Center>

          <CurrentComponentOfArray index={currentStage}>
            <PhoneVerification
              handlePage={moveToNextPage}
              signupForm={signupForm}
              setSignupForm={setSignupForm}
            />
            <EmailRegister
              handlePage={moveToNextPage}
              signupForm={signupForm}
              setSignupForm={setSignupForm}
            />
            <PasswordRegister
              handlePage={moveToNextPage}
              signupForm={signupForm}
              setSignupForm={setSignupForm}
            />
            <NickNameRegister
              signupForm={signupForm}
              setSignupForm={setSignupForm}
            />
          </CurrentComponentOfArray>
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default SignUpEmail;
