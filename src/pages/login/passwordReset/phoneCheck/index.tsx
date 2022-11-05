import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import FormInput from '~/components/common/FormInput';
import ActiveButton from '~/components/common/ActiveButton';
import {colors} from '~/theme/theme';
import PhoneCheckBottomModal from '~/components/login/passwordReset/phoneCheck/PhoneCheckBottomModal';

/**
 *@description 비밀번호 재설정 휴대폰 인증
 */
function PasswordResetPhoneCheck() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState('');

  return (
    <SafeAreaView>
      <VStack bg="#fff" w="100%" h="100%">
        <Header
          title="비밀번호 재설정"
          leftButton={<BackIcon style={{position: 'absolute', left: 22}} />}
        />

        <VStack
          mt={'77px'}
          flex={1}
          justifyContent={'space-between'}
          px="18px"
          pb="40px">
          <VStack>
            <Text
              pb="60px"
              fontSize="20px"
              color={colors.grayScale['80']}
              textAlign="center">
              계정 정보를 확인할게요
            </Text>

            <FormInput
              placeholder={'아이디(이메일)'}
              inputContainerStyle={{marginBottom: 12}}
              errorText="입력하신 계정 정보를 찾을 수 없습니다"
              onChangeText={setEmail}
              text={email}
            />

            <FormInput
              placeholder={'휴대폰 번호'}
              inputContainerStyle={{marginBottom: 20}}
              successText="인증번호가 전송되었습니다"
              isValidate="SUCCESS"
              rightElement={
                <ActiveButton
                  name={'인증하기'}
                  buttonStyle={{
                    width: 77,
                    height: 36,
                    borderRadius: 4,
                  }}
                  activeBackgroundColor={colors.fussYellow['0']}
                  inactiveBackgroundColor={colors.fussYellow['-30']}
                  activeBorderColor={colors.grayScale['90']}
                  inactiveBorderColor={colors.grayScale['40']}
                  activeTextColor={colors.grayScale['90']}
                  inactiveTextColor={colors.grayScale['40']}
                  nameStyle={{fontSize: 14}}
                  onPress={() => setIsModalOpen(true)}
                />
              }
              onChangeText={setPassword}
              text={password}
            />
          </VStack>
        </VStack>

        <PhoneCheckBottomModal
          setCertificationNumber={setCertificationNumber}
          certificationNumber={certificationNumber}
          isModalOpen={isModalOpen}
        />
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetPhoneCheck;
