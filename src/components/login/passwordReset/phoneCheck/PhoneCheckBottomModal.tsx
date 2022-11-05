import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React from 'react';
import {RouteList} from '~/../types/navigator';
import ActiveButton from '~/components/common/ActiveButton';
import FormInput from '~/components/common/FormInput';
import {colors} from '~/theme/theme';

interface Props {
  setCertificationNumber: (certificationNumber: string) => void;
  certificationNumber: string;
  isModalOpen: boolean;
}

function PhoneCheckBottomModal({
  setCertificationNumber,
  certificationNumber,
  isModalOpen,
}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  return (
    <Center>
      <Actionsheet isOpen={isModalOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content px="18px" pt="28px" pb="40px">
          <Center alignItems="center" width="100%" height="26px" mb="24px">
            <Text fontSize="18px" color={colors.grayScale['80']}>
              인증번호를 입력해주세요
            </Text>
          </Center>

          <VStack w={'100%'}>
            <FormInput
              placeholder={'인증번호 4자리'}
              inputContainerStyle={{marginBottom: 12, width: '100%'}}
              isValidate="ERROR"
              errorText="인증번호를 확인해주세요"
              errorStyle={{marginBottom: 24}}
              onChangeText={setCertificationNumber}
              text={certificationNumber}
              keyboardType={'phone-pad'}
              //   keyboardType={'phone-pad'}
              rightElement={
                <Text color={colors.negative['0']} fontSize="15px">
                  03:00
                </Text>
              }
            />

            <ActiveButton
              name="다음"
              onPress={() => onMove('PasswordResetChange')}
              isActive={certificationNumber.length === 4}
            />
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default PhoneCheckBottomModal;
