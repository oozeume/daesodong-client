import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {RouteList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '~/components/hospital/review/register/Header';
import BackIcon from '~/assets/icons/back.svg';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import {YellowActiveSmallButton} from '~/components/login/button';
import VerificationModal from '~/components/common/modal/VerificationModal';
import useRegExPhone from '~/hooks/useRegExPhone';

/**
 *@description 비밀번호 재설정 휴대폰 인증
 */
function PasswordResetPhoneCheck() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useRegExPhone();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SafeAreaView>
      <VStack bg={colors.grayScale['0']} w="100%" h="100%" pb="40px">
        <Header
          title="비밀번호 재설정"
          leftButton={<BackIcon style={{position: 'absolute', left: 18}} />}
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

            <VerificationForm
              placeholder={'아이디(이메일)'}
              marginBottom={'12px'}
              onChangeText={setEmail}
              value={email}
              inputType="EMAIL"
              autoFocus
            />

            <VerificationForm
              placeholder={'휴대폰 번호'}
              marginBottom={'20px'}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              inputType="NUMBER"
              autoFocus
              inputRightElement={
                <YellowActiveSmallButton
                  active={email.length > 4 && phoneNumber.length > 4}
                  text={'인증하기'}
                  handlePress={() => setIsModalOpen(true)}
                />
              }
            />
          </VStack>
        </VStack>

        <VerificationModal
          handlePage={() => onMove('PasswordResetChange')}
          handleModal={() => setIsModalOpen(prevState => !prevState)}
          visible={isModalOpen}
        />
      </VStack>
    </SafeAreaView>
  );
}

export default PasswordResetPhoneCheck;
