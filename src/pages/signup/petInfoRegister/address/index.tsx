import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, Stack, VStack, useDisclose} from 'native-base';
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
import AddressDrawer, {
  Hangjungdong,
} from '~/components/signup/petInfo/AddressDrawer';
import {hangjungdong} from '~/utils/hangjungdong';
import SelectButtonForm from '~/components/signup/petInfo/SelectButtonForm';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 * 회원 가입 > 휴대폰 인증 페이지
 * @param {() => void} handlePage - 페이지 이동 핸들러
 */
function AddressRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const {isOpen, onOpen, onClose} = useDisclose();
  const {sido, sigugun, dong} = hangjungdong;

  const {
    isOpen: isSigugunOpen,
    onOpen: onSigugunOpen,
    onClose: onSigugunClose,
  } = useDisclose();

  const {
    isOpen: isDongOpen,
    onOpen: onDongOpen,
    onClose: onDongClose,
  } = useDisclose();

  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>();
  const [dongValue, setDongValue] = useState<Hangjungdong>();

  const [sortedSigugun, setSortedSigugun] = useState<
    Partial<Hangjungdong>[] | undefined
  >();
  const [sortedDong, setSortedDong] = useState<Hangjungdong[]>();

  const onMovePage = async () => {
    setForm(() => ({
      ...form,
      address: `${sidoValue?.name} ${sigugunValue?.name} ${dongValue?.name}`,
    }));

    onChangeStage();
    navigate('AnyQuestionRegister');
  };

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue, sigugun]);

  useEffect(() => {
    if (sigugunValue) {
      setSortedDong(
        dong.filter(
          item =>
            item.sigugun === sigugunValue.sigugun &&
            item.sido === sigugunValue.sido,
        ),
      );
    }
  }, [sigugunValue, dong]);

  console.log('@@@ form');
  console.log(form);
  console.log(!_.isNil(form.sex));

  // useEffect(() => {
  //   if (signupForm.mobile) setPhoneNumber(signupForm.mobile);
  // }, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={7}
      possibleButtonPress={!_.isNil(sidoValue && sigugunValue && dongValue)}>
      <Stack w="100%" space={'10px'}>
        <SelectButtonForm selectorName={sidoValue?.name} onPress={onOpen} />
        {sigugunValue && (
          <SelectButtonForm
            selectorName={sigugunValue?.name ?? ''}
            onPress={onSigugunOpen}
          />
        )}
        {dongValue && (
          <SelectButtonForm
            selectorName={dongValue?.name ?? ''}
            onPress={onDongOpen}
          />
        )}
      </Stack>

      <AddressDrawer
        isOpen={isOpen}
        onClose={onClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue}
        selectableList={sido}
      />

      <AddressDrawer
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => onDongOpen()}
        setValue={setSigugunValue}
        selectableList={sortedSigugun}
        sigugunValue={sigugunValue}
      />

      <AddressDrawer
        isOpen={isDongOpen}
        onClose={onDongClose}
        onPress={() => {
          onClose();
          onSigugunClose();
          onDongClose();
        }}
        setValue={setDongValue}
        selectableList={sortedDong}
        dongValue={dongValue}
      />
    </LayoutContainer>
  );
}

export default AddressRegister;
