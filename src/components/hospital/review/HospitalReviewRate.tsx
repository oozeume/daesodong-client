import React, {useMemo} from 'react';
import {Box, Divider, Flex, HStack, Stack, Text} from 'native-base';
import PartialRate from './PartialRate';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import _ from 'lodash';
import {colors} from '~/theme/theme';
import {useGetFacilityScore} from '~/api/facility/queries';

interface Props {
  facilityId: string;
}

/**
 *@description 시설 리뷰 평점 통계
 */

function FacilityReviewAllRate({facilityId}: Props) {
  const RATE_NUMBER = useMemo(() => {
    return _.range(1, 6);
  }, []);

  // TODO: 재방문율 데이터 추가되도록 api 수정 요청(isRevisit인 방문자수, 총 방문자수)
  const {data} = useGetFacilityScore(facilityId);

  return (
    <Box>
      <Flex
        w={'100%'}
        rounded="8px"
        borderColor={'grayScale.20'}
        backgroundColor={'white'}
        borderWidth="1">
        <HStack py={'16px'} pl={'21px'} pr={'24px'} space={'20px'} w={'100%'}>
          <Stack alignItems="center">
            <Text
              fontSize="30px"
              color={'fussOrange.0'}
              fontWeight="700"
              lineHeight={'36px'}>
              {data?.data.score_total.toFixed(1) ?? 0}
            </Text>
            <HStack mt={'1.5px'}>
              {RATE_NUMBER.map(i => (
                <React.Fragment key={i.toString()}>
                  <StarFillIcon
                    fill={
                      i <= Number(data?.data.score_total)
                        ? '#FF6B00'
                        : colors.grayScale[40]
                    }
                  />
                </React.Fragment>
              ))}
            </HStack>
            <Flex
              mt={'8.5px'}
              backgroundColor={'fussOrange.-30'}
              w={'75'}
              h={'18'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text color={'fussOrange.0'} fontSize={'11px'} fontWeight={'500'}>
                재방문률 0%
              </Text>
            </Flex>
          </Stack>
          <Divider orientation="vertical" bg={'grayScale.10'} />
          <Stack space={'3px'} alignItems={'flex-start'}>
            <PartialRate
              title={'진료'}
              rate={data?.data.score_treatment ?? 0}
            />
            <PartialRate title={'비용'} rate={data?.data.score_price ?? 0} />
            <PartialRate
              title={'시설'}
              rate={data?.data.score_facilities ?? 0}
            />
            <PartialRate title={'친절'} rate={data?.data.score_kindness ?? 0} />
          </Stack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default FacilityReviewAllRate;
