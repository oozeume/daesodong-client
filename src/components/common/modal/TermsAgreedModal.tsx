import React, {useState} from 'react';
import {Box, Center, Flex, Modal, Pressable, Text, VStack} from 'native-base';

import {colors} from '~/theme/theme';
import Button from '../button';

import CheckIcon from '../../../assets/icons/check.svg';
import RightIcon from '../../../assets/icons/right.svg';
import BackIcon from '../../../assets/icon/back_icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigationHookProp, RouteList} from '~/../types/navigator';

interface Props {
  visible: boolean;
  handleModal: () => void;
}

function TermsAgreedModal({visible, handleModal}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const [isAgreePrivacyPolicy, setIsAgreePrivacyPolicy] = useState(false);
  const [isAgreeTermsOfService, setIsAgreeTermsOfService] = useState(false);

  const handleSignUp = () => handleModal();
  const moveToTermsDetail = (
    route: 'TermsOfServicePolicy' | 'PrivacyPolicy',
  ) => {
    navigate(route);
  };

  return (
    <Modal w={'100%'} isOpen={visible} size={'full'}>
      <Modal.Content
        w={'100%'}
        h={'284px'}
        borderTopRadius={'28px'}
        borderBottomRadius={'none'}
        mb={0}
        mt={'auto'}>
        <VStack h={'100%'} px={'18px'}>
          {/* 모달 헤더 */}
          <Box h={'180px'}>
            <Center py={'28px'}>
              <Pressable position={'absolute'} left={0} onPress={handleModal}>
                <BackIcon />
              </Pressable>
              {/* 인증 모달 타이틀 */}
              <Text
                fontSize={18}
                fontWeight={'500'}
                color={colors.grayScale[80]}>
                약관 동의
              </Text>
            </Center>

            {/* 이용약관, 개인정보 처리방침 동의 버튼 View*/}
            <VStack space={2} h={'90px'} mt={'24px'} mb={'12px'}>
              {/* 이용약관 */}
              <Flex flexDirection={'row'} justifyContent={'space-between'}>
                <Pressable
                  w={'5%'}
                  justifyContent={'center'}
                  onPress={() => setIsAgreeTermsOfService(prev => !prev)}>
                  <CheckIcon
                    fill={
                      isAgreeTermsOfService
                        ? colors.fussOrange[0]
                        : colors.grayScale[30]
                    }
                  />
                </Pressable>
                <Text
                  w={'85%'}
                  fontSize={16}
                  fontWeight={'400'}
                  color={colors.grayScale[80]}>
                  (필수) 이용약관 동의
                </Text>
                <Pressable
                  w={'5%'}
                  onPress={() => moveToTermsDetail('TermsOfServicePolicy')}>
                  <RightIcon stroke={colors.grayScale[50]} />
                </Pressable>
              </Flex>

              {/* 개인정보 처리방침 */}
              <Flex flexDirection={'row'} justifyContent={'space-between'}>
                <Pressable
                  w={'5%'}
                  justifyContent={'center'}
                  onPress={() => setIsAgreePrivacyPolicy(prev => !prev)}>
                  <CheckIcon
                    fill={
                      isAgreePrivacyPolicy
                        ? colors.fussOrange[0]
                        : colors.grayScale[30]
                    }
                  />
                </Pressable>
                <Text
                  w={'85%'}
                  fontSize={16}
                  fontWeight={'400'}
                  color={colors.grayScale[80]}>
                  (필수) 개인정보 처리방침 동의
                </Text>
                <Pressable
                  w={'5%'}
                  onPress={() => moveToTermsDetail('PrivacyPolicy')}>
                  <RightIcon stroke={colors.grayScale[50]} />
                </Pressable>
              </Flex>
            </VStack>
          </Box>

          {/* 인증번호 확인 버튼 */}
          <Box h={'104px'}>
            <Button
              large
              shadow
              text={'확인'}
              fontColors={{
                active: colors.grayScale[90],
                disabled: colors.grayScale[50],
              }}
              buttonColors={{
                active: colors.fussOrange[0],
                disabled: colors.fussOrange['-30'],
              }}
              borderColors={{
                active: colors.grayScale[90],
                disabled: colors.grayScale[50],
              }}
              handlePress={handleSignUp}
              active={isAgreeTermsOfService && isAgreePrivacyPolicy}
            />
          </Box>
        </VStack>
      </Modal.Content>
    </Modal>
  );
}

export default TermsAgreedModal;
