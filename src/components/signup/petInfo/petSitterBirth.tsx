import {Stack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {colors} from '~/theme/theme';
import DateSelector from '~/components/hospital/review/register/selector';
import dayjs from 'dayjs';
import LayoutContainer from './layoutContainer';
import Button from '~/components/common/button';
import _ from 'lodash';

interface Props {
  handlePage: () => void;
}

interface DateList {
  value: number;
  txt: string;
}

function PetSitterBirth({handlePage}: Props) {
  const [visitedDate, setVisitedDate] = useState<{year: number | undefined}>({
    year: undefined,
  });

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 1950;

    let _yearList = [];

    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});
    }

    setYearList(_yearList);
  }, []);

  const [yearList, setYearList] = useState<DateList[]>([]);
  return (
    <LayoutContainer>
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

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          shadow
          active={!_.isNil(visitedDate.year)}
          text={'다음'}
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
        />
      </Stack>
    </LayoutContainer>
  );
}

export default PetSitterBirth;
