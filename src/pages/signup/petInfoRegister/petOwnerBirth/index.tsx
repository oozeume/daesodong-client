import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {PetInfoRegisterProps} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {DateList} from '~/components/signup/petInfo/PetOwnerBirth';
import dayjs from 'dayjs';
import DateSelector from '~/components/hospital/review/register/selector';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';

/**
 *@description 집사정보등록 - 집사 생년월일
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetOwnerBirthRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: PetInfoRegisterProps) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [index, setIndex] = useState<number>();
  const [yearList, setYearList] = useState<DateList[]>([]);

  const onMovePage = async () => {
    if (_.isUndefined(index)) return;

    setForm(pre => ({...pre, age: yearList[index].value}));
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetOwnerBirthRegister']);

    await setData(storageKeys.petInfoRegister.form, {
      ...form,
      age: yearList[index].value,
    });
    await setData(storageKeys.petInfoRegister.state, currentStage.toString());
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
      currentStage={2}
      buttonPress={onMovePage}
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
