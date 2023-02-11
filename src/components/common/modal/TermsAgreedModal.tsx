import React from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Modal,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import {colors} from '~/theme/theme';
import Button from '../button';
import CheckIcon from '../../../assets/icons/check.svg';
import RightIcon from '../../../assets/icons/right.svg';
import BackIcon from '../../../assets/icon/back_icon.svg';
import {SignupTerm} from '~/../types/signup';

interface Props {
  visible: boolean;
  handleModal: () => void;
  onSignup: () => Promise<void>;
  term: SignupTerm;
  setTerm: React.Dispatch<React.SetStateAction<SignupTerm>>;
  onPolicyModalOpen: (
    modalName: 'ServicePolicy' | 'PrivacyPolicy',
    isOpen: boolean,
  ) => void;
}

function TermsAgreedModal({
  visible,
  handleModal,
  onSignup,
  setTerm,
  term,
  onPolicyModalOpen,
}: Props) {
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
                  w={'90%'}
                  justifyContent={'center'}
                  onPress={() =>
                    setTerm(prev => ({
                      ...prev,
                      isServicePolicyCheck: !prev.isServicePolicyCheck,
                    }))
                  }>
                  <HStack alignItems={'center'}>
                    <CheckIcon
                      fill={
                        term.isServicePolicyCheck
                          ? colors.fussOrange[0]
                          : colors.grayScale[30]
                      }
                    />

                    <Text
                      ml="8px"
                      w={'85%'}
                      fontSize={16}
                      fontWeight={'400'}
                      color={colors.grayScale[80]}>
                      (필수) 이용약관 동의
                    </Text>
                  </HStack>
                </Pressable>

                <Pressable
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  w={'10%'}
                  onPress={() => onPolicyModalOpen('ServicePolicy', true)}>
                  <RightIcon stroke={colors.grayScale[50]} />
                </Pressable>
              </Flex>

              {/* 개인정보 처리방침 */}
              <Flex flexDirection={'row'} justifyContent={'space-between'}>
                <Pressable
                  w={'90%'}
                  justifyContent={'center'}
                  onPress={() =>
                    setTerm(prev => ({
                      ...prev,
                      isPersonalInformationPolicyCheck:
                        !prev.isPersonalInformationPolicyCheck,
                    }))
                  }>
                  <HStack alignItems={'center'}>
                    <CheckIcon
                      fill={
                        term.isPersonalInformationPolicyCheck
                          ? colors.fussOrange[0]
                          : colors.grayScale[30]
                      }
                    />

                    <Text
                      ml="8px"
                      w={'85%'}
                      fontSize={16}
                      fontWeight={'400'}
                      color={colors.grayScale[80]}>
                      (필수) 개인정보 처리방침 동의
                    </Text>
                  </HStack>
                </Pressable>

                <Pressable
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  w={'10%'}
                  onPress={() => onPolicyModalOpen('PrivacyPolicy', true)}>
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
              handlePress={onSignup}
              active={
                term.isServicePolicyCheck &&
                term.isPersonalInformationPolicyCheck
              }
            />
          </Box>
        </VStack>
      </Modal.Content>
    </Modal>
  );
}

export default TermsAgreedModal;
