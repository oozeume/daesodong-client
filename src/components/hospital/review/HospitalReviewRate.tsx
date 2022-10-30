import React from 'react';
import {Box, Divider, Flex, HStack, Stack, Text} from 'native-base';

import PartialRate from './PartialRate';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import StarHalfIcon from '~/assets/icons/star_half.svg';

/**
 *@description 병원 리뷰 평점 통계
 */

function HospitalReviewAllRate() {
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
              4.8
            </Text>
            <HStack mt={'1.5px'}>
              <StarFillIcon fill={'#FF6B00'} />
              <StarFillIcon fill={'#FF6B00'} />
              <StarFillIcon fill={'#FF6B00'} />
              <StarFillIcon fill={'#FF6B00'} />
              <StarHalfIcon fill={'#FF6B00'} />
            </HStack>
            <Flex
              mt={'8.5px'}
              backgroundColor={'fussOrange.-30'}
              w={'75'}
              h={'18'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text color={'fussOrange.0'} fontSize={'11px'} fontWeight={'500'}>
                재방문률 92%
              </Text>
            </Flex>
          </Stack>
          <Divider orientation="vertical" bg={'grayScale.10'} />
          <Stack space={'3px'}>
            <PartialRate title={'진료'} rate={4.7} />
            <PartialRate title={'비용'} rate={4.7} />
            <PartialRate title={'시설'} rate={4.7} />
            <PartialRate title={'친절'} rate={4.7} />
          </Stack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default HospitalReviewAllRate;
