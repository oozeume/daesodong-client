import React, {useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {Center, HStack, Pressable, Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {theme} from '~/theme/theme';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';
import NickNameCheck from '~/components/signup/social/NickNameCheck';
import PhoneVerification from '~/components/signup/social/PhoneVerification';

import BackIcon from '../../../assets/icon/back_icon.svg';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';

type Props = NativeStackScreenProps<ParamListBase, 'SignupSocial'>;

// 스테이지별 보여질 텍스트 리스트
const stageOneTextList = ['회원 확인을 위해', '휴대폰 번호를 인증해주세요'];
const stageTwoTextList = ['닉네임을 입력해주세요'];

/**
 *@description 소셜 회원가입 페이지
 */
function SignupSocial({navigation}: Props) {
  const [currentStage, setCurrentStage] = useState(1);

  const onPressBack = () => {
    if (currentStage === 1) {
      navigation.goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: theme.colors.grayScale[0]}}>
        {/* 상단 버튼 View */}
        <HStack
          space={3}
          h={Platform.OS === 'android' ? '10%' : '8%'}
          justifyContent={'space-between'}
          paddingX={'18px'}
          backgroundColor={theme.colors.grayScale[0]}>
          <Center h="60" w="30">
            <Pressable onPress={onPressBack}>
              <BackIcon />
            </Pressable>
          </Center>
        </HStack>
        <StageBar totalStage={2} currentStage={currentStage} />

        {/* 스테이지별 콘텐츠 */}
        <Box
          h={Platform.OS === 'android' ? '90%' : '92%'}
          position={'relative'}
          marginX={'18px'}
          backgroundColor={theme.colors.grayScale[0]}>
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
          {currentStage === 1 ? (
            <PhoneVerification handlePage={moveToNextPage} />
          ) : (
            <NickNameCheck />
          )}
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default SignupSocial;
