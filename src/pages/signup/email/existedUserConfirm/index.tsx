import {Box, Center, HStack, Pressable, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import BackIcon from '~/assets/icon/back_icon.svg';
import AvoidKeyboardView from '~/components/common/AvoidKeyboardView';
import _ from 'lodash';
import RegisterProgress from '~/components/common/RegisterProgress';
import {TextInput} from 'react-native';
import CountdownTimer from '~/components/common/CountdownTimer';

/**
 * @description 이메일 회원가입 페이지 - 회원여부 확인
 *
 * @param {string} phoneNumber 휴대폰 번호
 * @param {string} verifiedNumber 인증 번호
 */
function ExistedUserConfirm() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const [phoneNumber, SetPhoneNumber] = useState();
  const [verifiedNumber, setVerifiedNumber] = useState();

  const [showVerifiedNumberInput, SetShowVerifiedNumberInput] = useState(false);

  const onActiveCertifyUserButtonPress = () => {
    SetShowVerifiedNumberInput(true);
  };

  const handlePhoneNumberChange = (number: any) => {
    SetPhoneNumber(number);
  };

  const handleVerifiedNumberChange = (number: any) => {
    setVerifiedNumber(number);
  };

  const activeNextButton = _.isEmpty(phoneNumber) || _.isEmpty(verifiedNumber);

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

        <RegisterProgress value={25} />

        <Stack
          h={'100%'}
          pt={'60px'}
          p="18px"
          bgColor={'#fff'}
          flexDir={'column'}
          justifyContent={'space-between'}>
          <AvoidKeyboardView>
            <Center>
              <Center mb={'60px'}>
                <Text fontSize={'13px'} color={'grayScale.50'} mb={'6px'}>
                  1/4
                </Text>
                <Text
                  fontSize={'20px'}
                  color={'grayScale.80'}
                  fontWeight={'500'}>
                  회원여부 확인 및 가입을 진행합니다
                </Text>
              </Center>

              <Stack w={'100%'} space={'20px'}>
                <Stack w={'100%'}>
                  <HStack
                    w={'100%'}
                    py={'8px'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    borderBottomColor={'grayScale.30'}
                    borderBottomWidth={'1px'}>
                    <TextInput
                      w={'250px'}
                      h={'52px'}
                      type={'text'}
                      value={phoneNumber}
                      onChangeText={handlePhoneNumberChange}
                      backgroundColor={'white'}
                      placeholder="휴대폰 번호"
                      keyboardType="numeric"
                      borderWidth={0}
                      borderRadius={0}
                      p={0}
                    />

                    <Pressable
                      w={'77px'}
                      h={'36px'}
                      bgColor={
                        _.isEmpty(phoneNumber)
                          ? 'fussYellow.-30'
                          : 'fussYellow.0'
                      }
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderColor={'grayScale.50'}
                      borderWidth={'1px'}
                      borderRadius={'4px'}
                      disabled={_.isEmpty(phoneNumber)}
                      onPress={onActiveCertifyUserButtonPress}>
                      <Text
                        fontSize={'14px'}
                        color={
                          _.isEmpty(phoneNumber)
                            ? 'grayScale.50'
                            : 'grayScale.90'
                        }>
                        인증하기
                      </Text>
                    </Pressable>
                  </HStack>
                  <Text fontSize={'13px'} color={'positive.0'} pt={'8px'}>
                    인증번호가 전송되었습니다
                  </Text>
                </Stack>

                {showVerifiedNumberInput && (
                  <Stack w={'100%'}>
                    <HStack
                      w={'100%'}
                      h={'52px'}
                      py={'8px'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      borderBottomColor={'grayScale.30'}
                      borderBottomWidth={'1px'}>
                      <TextInput
                        w={'250px'}
                        h={'52px'}
                        backgroundColor={'white'}
                        keyboardType="numeric"
                        value={verifiedNumber}
                        onChangeText={handleVerifiedNumberChange}
                        placeholder="인증번호 4자리"
                        borderWidth={0}
                        borderRadius={0}
                        p={0}
                      />
                      <CountdownTimer time={180} />
                    </HStack>

                    <Text fontSize={'13px'} color={'positive.0'} pt={'8px'}>
                      인증번호를 확인해주세요
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Center>
          </AvoidKeyboardView>

          <Box h={'104px'} pt={'12px'}>
            <Pressable
              onPress={() => {
                navigation.navigate('SignUpEmailRegister');
              }}
              w={'100%'}
              h={'52px'}
              disabled={activeNextButton}
              borderWidth={'1px'}
              borderColor={activeNextButton ? 'grayScale.50' : 'grayScale.90'}
              bgColor={activeNextButton ? 'fussOrange.-30' : 'fussOrange.0'}
              justifyContent="center"
              alignItems={'center'}
              borderRadius={'8px'}>
              <Text fontSize={'16px'} fontWeight={'500'} color={'grayScale.90'}>
                다음
              </Text>
            </Pressable>
          </Box>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
}

export default ExistedUserConfirm;
