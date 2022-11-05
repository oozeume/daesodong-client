import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Center, HStack, Pressable, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteList} from '~/../types/navigator';

import BackIcon from '~/assets/icon/back_icon.svg';
import RegisterProgress from '~/components/common/RegisterProgress';

/**
 *@description 이메일 회원가입 - 아이디 입력 페이지
 */

function EmailRegister() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const [email, setEmail] = useState<string>();
  const onEmailChange = (text: string) => {
    setEmail(text);
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

        <RegisterProgress value={50} />

        <Stack
          h={'100%'}
          p="18px"
          bgColor={'white'}
          flexDir={'column'}
          justifyContent={'space-between'}>
          <Stack>
            <Center my={'60px'}>
              <Text fontSize={'13px'} color={'grayScale.50'} mb={'6px'}>
                2/4
              </Text>
              <Text fontSize={'20px'} color={'grayScale.80'} fontWeight={'500'}>
                아이디를 입력해주세요
              </Text>
            </Center>

            <Stack
              borderBottomColor={'grayScale.30'}
              borderBottomWidth={'1px'}
              fontSize={'15px'}
              borderWidth={0}
              borderRadius={0}
              p={0}
              backgroundColor={'white'}>
              <TextInput
                placeholder="아이디 (이메일)"
                value={email}
                onChangeText={onEmailChange}
              />
            </Stack>
          </Stack>
          <Box h={'104px'} pt={'12px'}>
            <Pressable
              onPress={() => {
                navigation.navigate('SignupPasswordRegister');
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

export default EmailRegister;
