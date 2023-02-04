import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {Box, Center, Stack, VStack} from 'native-base';
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
function PetOwnerBirthRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const [index, setIndex] = useState<number>();
  const [yearList, setYearList] = useState<DateList[]>([]);
  console.log(index);

  const onMovePage = () => {
    if (!index) return;

    setForm(pre => ({...pre, age: yearList[index].value}));
    onChangeStage();
    navigate('PetNameRegister');
  };

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 1950;

    let _yearList = [];

    let _index = 0;
    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});

      if (form?.age === i) {
        setIndex(_index);
      }
      _index++;
    }

    setYearList(_yearList);
  }, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={2}
      possibleButtonPress={!_.isNil(index)}>
      <DateSelector
        headerText="년도"
        selectedIndex={index}
        onSelect={(index: number) => {
          setIndex(index);
        }}
        itemList={yearList}
        iconType={'underline'}
        showConfirmButton
      />
    </LayoutContainer>
  );
}

export default PetOwnerBirthRegister;
