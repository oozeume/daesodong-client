import {HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import FormInput from '~/components/common/FormInput';
import ActiveButton from '~/components/common/ActiveButton';
import {colors} from '~/theme/theme';

/**
 *@description 패스워드 리셋 페이지
 */
function PasswordResetChange() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <SafeAreaView>
      <VStack bg="#fff" w="100%" h="100%">
        <Header
          title="비밀번호 재설정"
          leftButton={
            <BackIcon
              style={{left: 22}}
              onPress={() => onMove('InitialLogin')}
            />
          }
        />

        <VStack flex={1} justifyContent={'space-between'} px="18px" pb="40px">
          <VStack>
            <Text
              py="60px"
              fontSize="20px"
              color={colors.grayScale['80']}
              textAlign="center">
              변경하실 비밀번호를 입력해주세요
            </Text>

            <FormInput
              placeholder={'비밀번호 입력'}
              inputContainerStyle={{marginBottom: 12}}
              errorText="입력하신 계정 정보를 찾을 수 없습니다"
              onChangeText={setPassword}
              text={password}
              bottomElement={
                <HStack mt="8px">
                  <Text color={colors.positive['0']} fontSize="13px">
                    영문 포함
                  </Text>

                  <Text color={colors.positive['0']} fontSize="13px" mx="16px">
                    숫자포함
                  </Text>

                  <Text color={colors.positive['0']} fontSize="13px">
                    8-20자 이내
                  </Text>
                </HStack>
              }
            />

            <FormInput
              placeholder={'비밀번호 확인'}
              inputContainerStyle={{marginBottom: 12}}
              isValidate="SUCCESS"
              successText="비밀번호가 일치합니다"
              errorText="비밀번호를 확인해주세요"
              onChangeText={setPasswordConfirm}
              text={passwordConfirm}
            />
          </VStack>

          <ActiveButton
            name="확인"
            onPress={() => onMove('PasswordResetSuccess')}
            isActive={password.length !== 0 && passwordConfirm.length !== 0}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetChange;
