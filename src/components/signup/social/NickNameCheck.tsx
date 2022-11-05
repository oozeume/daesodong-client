import React, {useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';

import CertificationForm from '~/components/common/CertificationForm';

import CheckIcon from '../../../assets/icons/check.svg';

// 닉네임 인풋 도움말 리스트
const helperTextList = ['공백 미포함', '기호 미포함', '2~10자 이내'];

/**
 * 닉네임 중복 체크 컴포넌트
 */
function NickNameCheck() {
  const [nickName, setNickName] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  const hadleNickName = (text: string) => setNickName(text);

  return (
    <>
      {/* 닉네임 인증 폼 View */}
      <CertificationForm
        placeholder={'닉네임'}
        certificationResult={'SUCCESS'}
        successMessage={'인증번호가 전송되었습니다'}
        errorMessage={'인증번호 전송에 실패했습니다'}
        helperTextList={helperTextList}
        inputValue={nickName}
        onChangeHandle={hadleNickName}
        inputRightElement={
          <Pressable
            w={'77px'}
            h={'36px'}
            backgroundColor={'#FFD53F'}
            borderRadius={'4px'}
            borderWidth={'1px'}
            borderColor={'#1A1E27'}>
            <Text color={'#1A1E27'} textAlign={'center'} lineHeight={'36px'}>
              중복확인
            </Text>
          </Pressable>
        }
      />

      {/* 하단 이용약관 및 개인정보 처리 방침 View */}
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
            {/* onPress 추가 예정 */}
            <Pressable>
              <Text
                fontSize={15}
                fontWeight={'400'}
                color={'#7F838C'}
                textDecoration={'solid'}
                textDecorationLine={'underline'}
                textDecorationColor={'#7F838C'}>
                이용약관
              </Text>
            </Pressable>
            <Text fontSize={15} fontWeight={'400'} color={'#7F838C'}>
              및
            </Text>
            {/* onPress 추가 예정 */}
            <Pressable>
              <Text
                fontSize={15}
                fontWeight={'400'}
                color={'#7F838C'}
                textDecoration={'solid'}
                textDecorationLine={'underline'}
                textDecorationColor={'#7F838C'}>
                개인정보 처리 방침
              </Text>
            </Pressable>
            <Text fontSize={15} fontWeight={'400'} color={'#7F838C'}>
              에 동의합니다
            </Text>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}

export default NickNameCheck;
