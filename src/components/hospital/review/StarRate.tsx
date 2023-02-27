import React, {useMemo} from 'react';
import {HStack, Text} from 'native-base';

import StarFillIcon from '~/assets/icons/star_fill.svg';
import _ from 'lodash';
import {colors} from '~/theme/theme';

interface Props {
  title: string;
  rate: number;
}

/**
 *@description 병원 리뷰 - 부분 평점
 */

function StarRate({title, rate}: Props) {
  const RATE_NUMBER = useMemo(() => {
    return _.range(1, 6);
  }, []);

  return (
    <HStack alignItems={'center'}>
      <Text w={'34px'} color={'grayScale.60'} fontSize={'13px'}>
        {title}
      </Text>
      {RATE_NUMBER.map(number => (
        <React.Fragment key={number}>
          <StarFillIcon
            fill={number <= rate ? '#FFCC16' : colors.grayScale[20]}
          />
        </React.Fragment>
      ))}
    </HStack>
  );
}

export default StarRate;
