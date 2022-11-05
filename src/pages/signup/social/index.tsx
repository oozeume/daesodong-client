import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Center, HStack, Pressable, Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Button from '~/components/common/button';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';
import NickNameCheck from '~/components/signup/social/NickNameCheck';
import PhoneCertification from '~/components/signup/social/PhoneCertification';

import BackIcon from '../../../assets/icon/back_icon.svg';

type Props = NativeStackScreenProps<ParamListBase, 'Hospital'>;

const stageOneTextList = ['회원 확인을 위해', '휴대폰 번호를 인증해주세요'];
const stageTwoTextList = ['닉네임을 입력해주세요'];

/**
 *@description 소셜 회원가입 페이지
 */
function SignupSocial({navigation}: Props) {
  const [currentStage, setCurrentStage] = useState(1);

  const onPressSignup = () => {};

  const onPressBack = () => {
    if (currentStage === 1) {
      navigation.goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: '#FFF'}}>
        {/* 상단 버튼 View */}
        <HStack
          space={3}
          h={'8%'}
          justifyContent={'space-between'}
          paddingX={'18px'}
          backgroundColor={'#fff'}>
          <Center h="60" w="30">
            <Pressable onPress={onPressBack}>
              <BackIcon />
            </Pressable>
          </Center>
        </HStack>
        <StageBar totalStage={2} currentStage={currentStage} />

        {/* 스테이지별 콘텐츠 */}
        <Box
          h={'79%'}
          position={'relative'}
          marginX={'18px'}
          backgroundColor={'#fff'}>
          {/* 소셜 회원가입 스테이지 및 스테이지별 텍스트 */}
          <Center marginY={'60px'}>
            <StageTextBox
              totalStage={2}
              currentStage={currentStage}
              stageTextList={
                currentStage === 1 ? stageOneTextList : stageTwoTextList
              }
            />
          </Center>

          {/* Stage 1: 휴대폰 번호 인증 | Stage 2: 닉네임 중복 체크 */}
          {currentStage === 1 ? <PhoneCertification /> : <NickNameCheck />}
        </Box>

        {/* 하단 버튼 View */}
        <Center h={'12%'} paddingX={'18px'} backgroundColor={'#FFF'}>
          {currentStage === 2 && (
            <Button
              large
              shadow
              text={'가입완료'}
              btnColor={'#FF6B00'}
              disabledColor={'#FFEADC'}
              handlePress={onPressSignup}
              active={true}
            />
          )}
        </Center>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SignupSocial;
