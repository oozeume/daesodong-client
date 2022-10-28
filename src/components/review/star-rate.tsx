import {Box, Divider, Flex, HStack, Stack, Text} from 'native-base';
import React from 'react';
import {theme} from '../../../App';
import StarFillIcon from '../../assets/icons/star_fill.svg';
import StarHalfIcon from '../../assets/icons/star_half.svg';
import SectionRate from './section-rate';

function StarRate() {
  return (
    <Box>
      <Flex
        rounded="8px"
        borderColor={'#ECECEE'}
        backgroundColor={'white'}
        borderWidth="1">
        <HStack p="4" space={'20px'} w={'100%'}>
          <Stack alignItems="center">
            <Text
              fontSize="30px"
              color={'#FF6B00'}
              fontWeight="700"
              lineHeight={'36px'}>
              4.8
            </Text>
            <HStack mt={'1.5px'}>
              <StarFillIcon />
              <StarFillIcon />
              <StarFillIcon />
              <StarFillIcon />
              <StarHalfIcon />
            </HStack>
            <Flex
              mt={'8.5px'}
              backgroundColor={theme.colors.grayScale[20]}
              w={'75'}
              h={'18'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text color={'#FF6B00'} fontSize={'11px'} fontWeight={'500'}>
                재방문률 92%
              </Text>
            </Flex>
          </Stack>
          <Divider orientation="vertical" bg={'#F6F7F7'} />
          <Stack>
            <SectionRate title={'진료'} rate={4.7} />
            <SectionRate title={'비용'} rate={4.7} />
            <SectionRate title={'시설'} rate={4.7} />
            <SectionRate title={'친절'} rate={4.7} />
          </Stack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default StarRate;
