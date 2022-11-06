import React, {useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {Box, Center, HStack, Pressable, Text} from 'native-base';

import Button from '~/components/common/button';
import {VerificationResult} from '~/../types/verification';
import VerificationForm from '~/components/common/VerificationForm';

import CheckIcon from '../../../assets/icons/check.svg';

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; // 한글, 영어, 숫자만 받을 수 있는 정규식
const helperTextList = ['공백 미포함', '기호 미포함', '2~10자 이내']; // 닉네임 인풋 도움말 리스트

/**
 * 닉네임 중복 체크 컴포넌트
 */
function NickNameCheck() {
  const [nickName, setNickName] = useState('');
  const [isAgree, setIsAgree] = useState(false); // 이용약관 및 개인정보 처리 방침동의 여부
  const [result, setResult] = useState<VerificationResult>(); // 인증 결과

  const hadleNickName = (text: string) => {
    setNickName(prev =>
      text.length === 0 ? text : regex.test(text) ? text : prev,
    );
  };

  // 닉네임 중복 검사
  const checkDuplication = () => {
    Keyboard.dismiss();
    // API 연동 시 수정 필요
    if (nickName.length < 2 || nickName.length > 11) {
      // 입력한 닉네임이 2 ~ 10자 사이가 아닐경우
      setResult('WARNING');
    } else {
      setResult('SUCCESS');
    }
  };

  // 회원가입
  const onPressSignup = () => {};

  return (
    <>
      {/* 닉네임 인증 폼 View */}
      <VerificationForm
        placeholder={'닉네임'}
        certificationResult={result}
        successMessage={'사용 가능한 닉네임입니다'}
        errorMessage={'사용할 수 없는 닉네임입니다'}
        warningMessage={'2~10자 이내로 입력해 주세요'}
        helperTextList={helperTextList}
        value={nickName}
        marginBottom={'20px'}
        onChangeText={hadleNickName}
        inputRightElement={
          <Button
            width={'77px'}
            fontColors={{active: '#1A1E27', disabled: '#C6C8CD'}}
            buttonColors={{active: '#FFD53F', disabled: '#FFF6D8'}}
            borderColors={{active: '#1A1E27', disabled: '#C6C8CD'}}
            text={'중복확인'}
            active={nickName.length !== 0 ? true : false}
            handlePress={checkDuplication}
          />
        }
      />

      {/* 하단 버튼 및 이용약관, 개인정보 처리방침 View */}
      <Box
        w={'100%'}
        position={'absolute'}
        bottom={Platform.OS === 'android' ? '10px' : 0}>
        {/* 이용약관 및 개인정보 처리 방침 */}
        <HStack space={3}>
          <Center>
            <Pressable onPress={() => setIsAgree(prev => !prev)}>
              <CheckIcon fill={isAgree ? '#FF6B00' : '#E1E2E4'} />
            </Pressable>
          </Center>
          <HStack space={0.5}>
            <Text
              fontSize={Platform.OS === 'android' ? 13 : 15}
              fontWeight={'400'}
              color={'#7F838C'}>
              (필수)
            </Text>
            {/* onPress 추가 예정 */}
            <Pressable>
              <Text
                fontSize={Platform.OS === 'android' ? 13 : 15}
                fontWeight={'400'}
                color={'#7F838C'}
                textDecoration={'solid'}
                textDecorationLine={'underline'}
                textDecorationColor={'#7F838C'}>
                이용약관
              </Text>
            </Pressable>
            <Text
              fontSize={Platform.OS === 'android' ? 13 : 15}
              fontWeight={'400'}
              color={'#7F838C'}>
              및
            </Text>
            {/* onPress 추가 예정 */}
            <Pressable>
              <Text
                fontSize={Platform.OS === 'android' ? 13 : 15}
                fontWeight={'400'}
                color={'#7F838C'}
                textDecoration={'solid'}
                textDecorationLine={'underline'}
                textDecorationColor={'#7F838C'}>
                개인정보 처리 방침
              </Text>
            </Pressable>
            <Text
              fontSize={Platform.OS === 'android' ? 13 : 15}
              fontWeight={'400'}
              color={'#7F838C'}>
              에 동의합니다
            </Text>
          </HStack>
        </HStack>

        {/* 가입완료 버튼 */}
        <Box h={'104px'} pt={'18px'} backgroundColor={'#FFF'}>
          <Button
            large
            shadow
            text={'가입완료'}
            fontColors={{active: '#1A1E27', disabled: '#9EA1A8'}}
            buttonColors={{active: '#FF6B00', disabled: '#FFEADC'}}
            borderColors={{active: '#1A1E27', disabled: '#9EA1A8'}}
            handlePress={onPressSignup}
            active={isAgree && result === 'SUCCESS'}
          />
        </Box>
      </Box>
    </>
  );
}

export default NickNameCheck;
