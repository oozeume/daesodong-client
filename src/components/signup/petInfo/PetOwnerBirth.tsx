import React, {useEffect, useState} from 'react';
import DateSelector from '~/components/hospital/review/register/selector';
import dayjs from 'dayjs';
import LayoutContainer from './LayoutContainer';
import _ from 'lodash';

interface Props {
  handlePage: () => void;
}

export interface DateList {
  value: number;
  txt: string;
}

/**
 *@description 집사정보등록 - 집사 태어난 년도
 */

function PetOwnerBirth({handlePage}: Props) {
  const [visitedDate, setVisitedDate] = useState<{year: number | undefined}>({
    year: undefined,
  });

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
      possibleButtonPress={!_.isNil(visitedDate.year)}>
      <DateSelector
        headerText="년도"
        selectedIndex={visitedDate.year}
        onSelect={(index: number) =>
          setVisitedDate(pre => ({...pre, year: index}))
        }
        itemList={yearList}
        iconType={'underline'}
        showConfirmButton
      />
    </LayoutContainer>
  );
}

export default PetOwnerBirth;
