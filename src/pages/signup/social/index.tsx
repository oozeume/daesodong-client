import React, {useState} from 'react';
import {Center, HStack, Pressable, Box, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import DButton from '~/components/common/button';
import StageBar from '~/components/common/stage/StageBar';
import StageTextBox from '~/components/common/stage/StageTextBox';

import BackIcon from '../../../assets/icon/back_icon.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import CertificationForm from '~/components/common/CertificationForm';

type Props = NativeStackScreenProps<ParamListBase, 'Hospital'>;

const stageOneTextList = ['회원 확인을 위해', '휴대폰 번호를 인증해주세요'];
const stageTwoTextList = ['닉네임을 입력해주세요'];

/**
 *@description 소셜 회원가입 페이지
 */
function SignupSocial({navigation}: Props) {
  const [isAgree, setIsAgree] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const onPressNext = () => setCurrentStage(prev => prev + 1);

  const onPressBack = () => {
    if (currentStage === 1) {
      navigation.goBack();
    } else {
      setCurrentStage(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
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
        <CertificationForm
          placeholder={'휴대폰 번호'}
          certificationResult={'SUCCESS'}
          successMessage={'인증번호가 전송되었습니다'}
          errorMessage={'인증번호 전송에 실패했습니다'}
          inputRightElement={
            <Pressable
              w={'77px'}
              h={'36px'}
              backgroundColor={'#FFD53F'}
              borderRadius={'4px'}
              borderWidth={'1px'}
              borderColor={'#1A1E27'}>
              <Text color={'#1A1E27'} textAlign={'center'} lineHeight={'36px'}>
                인증하기
              </Text>
            </Pressable>
          }
        />
        <CertificationForm
          placeholder={'인증번호 4자리'}
          certificationResult={'FAIL'}
          successMessage={'인증번호가 일치합니다'}
          errorMessage={'인증번호를 확인해주세요'}
          inputRightElement={
            <Text fontSize={15} fontWeight={'400'} color={'#F6363A'}>
              03:00
            </Text>
          }
        />

        {/* 이용약관 및 개인정보 처리 방침 */}
        {currentStage === 2 && (
          <Box w={'100%'} position={'absolute'} bottom={0}>
            <HStack space={3}>
              <Center>
                <Pressable onPress={() => setIsAgree(prev => !prev)}>
                  <CheckIcon fill={isAgree ? '#FF6B00' : '#E1E2E4'} />
                </Pressable>
              </Center>
              <HStack space={0.5}>
                <Text fontSize={15} fontWeight={'400'} color={'#7F838C'}>
                  (필수)
                </Text>
                <Text
                  fontSize={15}
                  fontWeight={'400'}
                  color={'#7F838C'}
                  textDecoration={'solid'}
                  textDecorationLine={'underline'}
                  textDecorationColor={'#7F838C'}>
                  이용약관
                </Text>
                <Text fontSize={15} fontWeight={'400'} color={'#7F838C'}>
                  및
                </Text>
                <Text
                  fontSize={15}
                  fontWeight={'400'}
                  color={'#7F838C'}
                  textDecoration={'solid'}
                  textDecorationLine={'underline'}
                  textDecorationColor={'#7F838C'}>
                  개인정보 처리 방침
                </Text>
                <Text fontSize={15} fontWeight={'400'} color={'#7F838C'}>
                  에 동의합니다
                </Text>
              </HStack>
            </HStack>
          </Box>
        )}
      </Box>

      {/* 하단 버튼 View */}
      <Center h={'12%'} paddingX={'18px'} backgroundColor={'#FFF'}>
        <DButton
          text={'다음'}
          textColor={'#1A1E27'}
          btnColor={'#FF6B00'}
          btnHeight={'52px'}
          btnBorderWidth={'1px'}
          btnBorderColor={'#1A1E27'}
          btnRadius={'8px'}
          handlePress={onPressNext}
        />
      </Center>
    </SafeAreaView>
  );
}

export default SignupSocial;
