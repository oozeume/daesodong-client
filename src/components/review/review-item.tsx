import _ from 'lodash';
import {Avatar, Box, Divider, Flex, HStack, Stack, Text} from 'native-base';
import React from 'react';
import HeartFillICon from '../../assets/icons/heart_fill';
import StarFillIcon from '../../assets/icons/star_fill';

function ReviewItem(props) {
  return (
    <Box
      backgroundColor={'white'}
      px={'18px'}
      pt={'20px'}
      borderTopColor={'grayScale.20'}
      borderBottomColor={'grayScale.20'}
      borderBottomWidth={1}
      borderTopWidth={1}>
      <HStack space={'12px'} mb={'16px'}>
        <Avatar w={'44px'} h={'44px'} />
        <Stack>
          <HStack alignItems={'center'} space={'4px'}>
            <Text>닉네임</Text>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              w={'41px'}
              h={'18px'}
              backgroundColor={'positive.-40'}
              borderRadius={'4px'}>
              <Text color={'positive.0'} fontSize={'11px'}>
                재방문
              </Text>
            </Flex>
          </HStack>
          <HStack space={'6px'}>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              동물
            </Text>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              |
            </Text>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              나이
            </Text>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              |
            </Text>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              성별
            </Text>
          </HStack>
        </Stack>
      </HStack>

      <Box
        w={'100%'}
        px={'18px'}
        py={'12px'}
        mb={'20px'}
        borderColor={'black'}
        backgroundColor={'grayScale.10'}
        borderRadius={'8px'}>
        <HStack pb={'14px'} space={'13px'}>
          <HStack space={'9px'} w={'143px'}>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              진단
            </Text>
            <Text color={'grayScale.60'} fontWeight={'500'} fontSize={'13px'}>
              건강검진
            </Text>
          </HStack>

          <HStack space={'9px'} w={'143px'}>
            <Text color={'grayScale.60'} w={'34px'} fontSize={'13px'}>
              진료비
            </Text>
            <Text color={'grayScale.60'} fontWeight={'500'} fontSize={'13px'}>
              3만원
            </Text>
          </HStack>
        </HStack>

        <Divider bg={'grayScale.20'} />

        <HStack bg={'red'} space={'13px'} pt={'18px'}>
          <Stack space={'8px'} w={'143px'}>
            <HStack alignItems={'center'}>
              <Text w={'34px'} color={'grayScale.60'} fontSize={'13px'}>
                진료
              </Text>
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
            </HStack>
            <HStack alignItems={'center'}>
              <Text w={'34px'} color={'grayScale.60'} fontSize={'13px'}>
                시설
              </Text>
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
            </HStack>
          </Stack>

          <Stack space={'8px'} w={'143px'}>
            <HStack alignItems={'center'}>
              <Text w={'34px'} fontSize={'13px'} color={'grayScale.60'}>
                비용
              </Text>
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
            </HStack>
            <HStack alignItems={'center'}>
              <Text w={'34px'} fontSize={'13px'} color={'grayScale.60'}>
                친절
              </Text>
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
              <StarFillIcon color={'#FFCC16'} />
            </HStack>
          </Stack>
        </HStack>
      </Box>

      <HStack space={'8px'} pb={'4px'}>
        <HeartFillICon />
        <Text>재방문 의사 있어요</Text>
      </HStack>
      <Text>
        지나고 그러나 그리워 다 같이 봅니다. 잔디가 나는 위에 무엇인지 아무
        듯합니다. 피어나듯이 불러 당신은 내 말 위에도 부끄러운 했던 계십니다.
      </Text>
      <HStack space={'4px'} pt={'20px'} py={'20px'}>
        {_.range(0, 5).map(i => (
          <Flex
            key={i.toString()}
            w={'44px'}
            h={'20px'}
            borderRadius={'4px'}
            backgroundColor={'grayScale.20'}
            alignItems={'center'}>
            <Text color={'grayScale.70'} fontSize={'12px'}>
              테스트
            </Text>
          </Flex>
        ))}
      </HStack>
      <HStack
        alignItems={'center'}
        space={'10px'}
        py={'20px'}
        borderTopWidth={'1'}
        borderTopColor={'#F6F7F7'}>
        <HeartFillICon color={'#E1E2E4'} />
        <Text color={'grayScale.60'}>23마리의 친구가 고마워했어요!</Text>
      </HStack>
    </Box>
  );
}

export default ReviewItem;
