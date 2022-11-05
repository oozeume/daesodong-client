import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, Center, HStack, Pressable, Stack, Text} from 'native-base';
import BackIcon from '~/assets/icon/back_icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';
import AvoidKeyboardView from '~/components/common/AvoidKeyboardView';
import RegisterProgress from '~/components/common/RegisterProgress';
import {TextInput} from 'react-native';

/**
 *@description 이메일 회원가입 - 비밀번호 입력 페이지

 *@param password 비밀번호
 *@param passwordConfrim 비밀번호 확인
 */

function PasswordRegister() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const [password, setPassword] = useState<string>();
  const [passwordConfrim, setPasswordConfirm] = useState<string>();

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handlePasswordConfirmChange = (number: any) => {
    setPasswordConfirm(number);
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

        <RegisterProgress value={75} />

        <Stack
          h={'100%'}
          p="18px"
          bgColor={'white'}
          flexDir={'column'}
          justifyContent={'space-between'}>
          <AvoidKeyboardView>
            <Stack>
              <Center my={'60px'}>
                <Text fontSize={'13px'} color={'grayScale.50'} mb={'6px'}>
                  3/4
                </Text>
                <Text
                  fontSize={'20px'}
                  color={'grayScale.80'}
                  fontWeight={'500'}>
                  비밀번호를 입력해주세요
                </Text>
              </Center>

              <Stack
                borderBottomColor={'grayScale.30'}
                borderBottomWidth={'1px'}
                py={'15px'}
                borderWidth={0}
                borderRadius={0}
                fontSize={'15px'}
                backgroundColor={'white'}>
                <TextInput
                  placeholder="비밀번호 입력"
                  value={password}
                  onChangeText={handlePasswordChange}
                />
              </Stack>
              <HStack space={'16px'} mt={'8px'}>
                <Text fontSize={'13px'} color={'grayScale.50'}>
                  영문 포함
                </Text>
                <Text fontSize={'13px'} color={'grayScale.50'}>
                  숫자 포함
                </Text>
                <Text fontSize={'13px'} color={'grayScale.50'}>
                  8-20자 이내
                </Text>
              </HStack>
              <Stack
                borderBottomColor={'grayScale.30'}
                borderBottomWidth={'1px'}
                py={'15px'}
                borderWidth={0}
                borderRadius={0}
                fontSize={'15px'}
                backgroundColor={'white'}
                mt={'20px'}>
                <TextInput
                  placeholder="비밀번호 확인"
                  value={passwordConfrim}
                  onChangeText={handlePasswordConfirmChange}
                />
              </Stack>
              <HStack space={'16px'} mt={'8px'}>
                <Text fontSize={'13px'} color={'negative.0'}>
                  비밀번호를 확인해주세요
                </Text>
              </HStack>
            </Stack>
          </AvoidKeyboardView>

          <Box h={'104px'} pt={'12px'}>
            <Pressable
              onPress={() => {
                navigation.navigate('SignupNicknameRegister');
              }}
              w={'100%'}
              h={'52px'}
              borderWidth={'1px'}
              borderColor={'grayScale.90'}
              bgColor={'fussOrange.0'}
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

export default PasswordRegister;
