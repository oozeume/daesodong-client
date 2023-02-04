import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  useDisclose,
} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import useRegExPhone from '~/hooks/useRegExPhone';
import {PetInfoForm, SetPetInfoForm, SignupForm} from '~/../types/signup';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import ChoiceButton from '~/components/signup/petInfo/ChoiceButton';
import _ from 'lodash';
import {DateList} from '~/components/signup/petInfo/PetOwnerBirth';
import dayjs from 'dayjs';
import DateSelector from '~/components/hospital/review/register/selector';
import Tag from '~/components/common/Tag';
import DownIcon from '~/assets/icons/down.svg';
import {SpeciesData} from '~/../types/api/species';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */
function PetTypeRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const {isOpen, onOpen, onClose} = useDisclose();

  const [petType, setPetType] = useState<SpeciesData>();

  const onMovePage = () => {
    if (!petType) return;

    setForm(prev => ({
      ...prev,
      speciesName: petType.name,
    }));

    onChangeStage();
    navigate('PetBirthRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={4}
      possibleButtonPress={!_.isNil(petType)}>
      <Pressable
        borderColor={colors.grayScale[30]}
        borderBottomWidth={1}
        flexDirection="row"
        backgroundColor={colors.grayScale[0]}
        onPress={onOpen}>
        <HStack
          width="100%"
          paddingBottom="15px"
          justifyContent="space-between"
          alignItems="center">
          <HStack alignItems={'center'} space={'8px'}>
            {!_.isEmpty(petType?.name) && (
              <Tag
                bgColor={colors.fussOrange['-30']}
                color={colors.fussOrange[0]}
                name={petType?.specie.name || ''}
              />
            )}
            <Text
              fontSize={15}
              color={
                _.isEmpty(petType?.name)
                  ? colors.grayScale[40]
                  : colors.grayScale[80]
              }>
              {_.isEmpty(petType?.name) ? '종을 선택해주세요' : petType?.name}
            </Text>
          </HStack>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>

      {isOpen && (
        <PetTypeSelectModal
          isOpen={isOpen}
          onClose={onClose}
          setPetType={petType => {
            setPetType(petType);
          }}
          isEnrollPet
          onPress={() => {}}
        />
      )}
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});

export default PetTypeRegister;
