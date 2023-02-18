import React, {useMemo, useState} from 'react';
import {Box, Divider, Flex, HStack, Stack, Text} from 'native-base';

import PartialRate from './PartialRate';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import Review from '~/model/review';
import _ from 'lodash';
import {colors} from '~/theme/theme';

interface Props {
  reviews: Review[];
}

/**
 *@description 병원 리뷰 평점 통계
 */

function HospitalReviewAllRate({reviews}: Props) {
  const RATE_NUMBER = useMemo(() => {
    return _.range(1, 6);
  }, []);

  const [totalAverageScore, setTotalAverageScore] = useState('');
  const reviewsCount = useMemo(() => {
    return reviews.length;
  }, [reviews.length]);

  const revisitRatio = useMemo(() => {
    const revisitCount = reviews.filter(i => i.isRevisit).length;
    return (revisitCount / reviewsCount) * 100;
  }, [reviews]);

  const scoreAverage = useMemo(() => {
    const facilityAverage =
      _.sum(reviews.map(i => i.starScore.facility)) / reviewsCount;
    const kindness =
      _.sum(reviews.map(i => i.starScore.kindness)) / reviewsCount;
    const price = _.sum(reviews.map(i => i.starScore.price)) / reviewsCount;
    const treatment =
      _.sum(reviews.map(i => i.starScore.treatment)) / reviewsCount;

    const totalScore = (facilityAverage + kindness + treatment + price) / 4;
    setTotalAverageScore(totalScore.toFixed(1));

    return {
      facility: facilityAverage,
      kindness: kindness,
      treatment: treatment,
      price: price,
      total: totalScore.toFixed(1),
    };
  }, [reviews]);

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
              {scoreAverage.total}
            </Text>
            <HStack mt={'1.5px'}>
              {RATE_NUMBER.map(i => (
                <StarFillIcon
                  fill={
                    i <= Number(totalAverageScore)
                      ? '#FF6B00'
                      : colors.grayScale[40]
                  }
                />
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
                재방문률 {revisitRatio}%
              </Text>
            </Flex>
          </Stack>
          <Divider orientation="vertical" bg={'grayScale.10'} />
          <Stack space={'3px'} alignItems={'flex-start'}>
            <PartialRate title={'진료'} rate={scoreAverage.treatment ?? 0} />
            <PartialRate title={'비용'} rate={scoreAverage.price ?? 0} />
            <PartialRate title={'시설'} rate={scoreAverage.facility ?? 0} />
            <PartialRate title={'친절'} rate={scoreAverage.kindness ?? 0} />
          </Stack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default HospitalReviewAllRate;
