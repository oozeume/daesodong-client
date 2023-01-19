import React, {useEffect, useState} from 'react';
import DateSelector from '~/components/hospital/review/register/selector';
import dayjs from 'dayjs';
import LayoutContainer from './LayoutContainer';
import _ from 'lodash';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';

interface Props {
  handlePage: () => void;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

export interface DateList {
  value: number;
  txt: string;
}

/**
 *@description 집사정보등록 - 집사 태어난 년도
 */

function PetOwnerBirth({handlePage, form, setForm}: Props) {
  const [index, setIndex] = useState<number>();
  const [yearList, setYearList] = useState<DateList[]>([]);

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 1950;

    let _yearList = [];

    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});
    }

    setYearList(_yearList);
  }, []);

  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(form.birthDate)}>
      <DateSelector
        headerText="년도"
        selectedIndex={index}
        onSelect={(index: number) => {
          setForm(pre => ({...pre, birthDate: yearList[index].value}));
          setIndex(index);
        }}
        itemList={yearList}
        iconType={'underline'}
        showConfirmButton
      />
    </LayoutContainer>
  );
}

export default PetOwnerBirth;
