import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Center, Flex, HStack, Pressable, Stack, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteList} from '~/../types/navigator';
import BackIcon from '~/assets/icon/back_icon.svg';
import CheckIcon from '~/assets/icons/check.svg';
import RegisterProgress from '~/components/common/RegisterProgress';
import {TextInput} from 'react-native';

/**
 *@description 이메일 회원가입 - 닉네임 입력 페이지
 */

function NicknameRegister() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const [isAgreePolicy, setAgreePolicy] = useState(false);
  const [nickname, setNickname] = useState<string>();

  const onNicknameChange = (text: string) => {
    setNickname(text);
  };

  const onAgreePolicyPress = () => {
    if (isAgreePolicy) {
      setAgreePolicy(false);
    } else {
      setAgreePolicy(true);
    }
  };

  return (
    <SafeAreaView>
      <Stack h={'100%'}>
        <HStack
          p="18px"
          height={'60px'}
          alignItems={'center'}
          bgColor={'white'}>
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon />
          </Pressable>
        </HStack>

        <RegisterProgress value={100} />

        <Flex
          h={'100%'}
          p="18px"
          bgColor={'white'}
          justifyContent={'space-between'}>
          <Stack>
            <Center my={'60px'}>
              <Text fontSize={'13px'} color={'grayScale.50'} mb={'6px'}>
                4/4
              </Text>
              <Text fontSize={'20px'} color={'grayScale.80'} fontWeight={'500'}>
                닉네임을 입력해주세요
              </Text>
            </Center>
            <HStack
              borderBottomColor={'grayScale.30'}
              justifyContent={'space-between'}
              borderBottomWidth={'1px'}
              py={'15px'}
              borderWidth={0}
              borderRadius={0}
              fontSize={'15px'}
              backgroundColor={'white'}>
              <TextInput
                value={nickname}
                placeholder="닉네임"
                onChangeText={onNicknameChange}
              />
              <Pressable
                w={'77px'}
                h={'36px'}
                bgColor={'fussYellow.-30'}
                justifyContent={'center'}
                alignItems={'center'}
                borderColor={'grayScale.50'}
                borderWidth={'1px'}
                borderRadius={'4px'}>
                <Text fontSize={'14px'} color={'grayScale.50'}>
                  중복확인
                </Text>
              </Pressable>
            </HStack>
            <HStack space={'16px'} mt={'8px'}>
              <Text fontSize={'13px'} color={'grayScale.50'}>
                공백 미포함
              </Text>
              <Text fontSize={'13px'} color={'grayScale.50'}>
                기호 미포함
              </Text>
              <Text fontSize={'13px'} color={'grayScale.50'}>
                2~10자 이내
              </Text>
            </HStack>
            <Stack mt={'4px'}>
              <Text color={'negative.0'}>이미 사용 중인 닉네임입니다</Text>
            </Stack>
          </Stack>

          <Stack space={'6px'}>
            <HStack height={'22px'} alignItems={'center'} space={'10px'}>
              <CheckIcon
                fill={isAgreePolicy ? '#FF6B00' : '#E1E2E4'}
                onPress={onAgreePolicyPress}
              />
              <Text color={'grayScale.60'} fontSize={'15px'}>
                (필수){' '}
                <Text
                  onPress={() => {
                    navigation.navigate('TermsOfServicePolicy');
                  }}
                  textDecorationLine={'underline'}>
                  이용약관
                </Text>
                및{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('PrivacyPolicy');
                  }}
                  textDecorationLine={'underline'}>
                  개인정보 처리 방침
                </Text>
                에 동의합니다
              </Text>
            </HStack>
            <Box h={'104px'} pt={'12px'}>
              <Pressable
                onPress={() => {}}
                w={'100%'}
                h={'52px'}
                borderWidth={'1px'}
                borderColor={'grayScale.90'}
                bgColor={'fussOrange.0'}
                justifyContent="center"
                alignItems={'center'}
                borderRadius={'8px'}>
                <Text
                  fontSize={'16px'}
                  fontWeight={'500'}
                  color={'grayScale.90'}>
                  가입완료
                </Text>
              </Pressable>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </SafeAreaView>
  );
}

export default NicknameRegister;
