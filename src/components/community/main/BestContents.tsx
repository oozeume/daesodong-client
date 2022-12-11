import {HStack, Stack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import CommunityBest from '~/assets/icons/community_best.svg';
import Tag from '~/components/common/Tag';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StyleSheet} from 'react-native';
import HeartFill from '~/assets/icons/heart_fill.svg';
import MessageFill from '~/assets/icons/message_fill.svg';
import {APP_WIDTH} from '~/utils/dimension';

const BEST_CONTENTS_PADDING_X = 18;

/**
 *@description 커뮤니티 메인 - 베스트 컨텐츠
 */

function BestContents() {
  const statusbarHeight = getStatusBarHeight();
  return (
    <Stack
      height={`${312 - statusbarHeight}px`}
      background={colors.fussYellow[0]}>
      <Stack alignItems={'center'}>
        <HStack
          w={APP_WIDTH - BEST_CONTENTS_PADDING_X * 2}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Stack>
            <Text
              fontWeight={'700'}
              color={colors.grayScale[80]}
              fontSize={'20px'}>
              집사들의
            </Text>
            <Text
              fontWeight={'700'}
              color={colors.grayScale[80]}
              fontSize={'20px'}>
              관심폭발 이야기🔥
            </Text>
          </Stack>

          <CommunityBest style={styles.image} />
        </HStack>

        <Stack
          w={APP_WIDTH - BEST_CONTENTS_PADDING_X * 2}
          px={'20px'}
          py={'16px'}
          height={'134px'}
          backgroundColor={colors.grayScale[0]}
          borderWidth={1}
          borderColor={colors.grayScale[90]}
          borderRadius={'8px'}
          justifyContent={'space-between'}>
          <HStack space={'4px'}>
            <Tag
              name={'태그'}
              bgColor={colors.fussYellow[10]}
              color={colors.grayScale[80]}
            />
            <Tag
              name={'태그'}
              bgColor={colors.fussYellow[10]}
              color={colors.grayScale[80]}
            />
            <Tag
              name={'태그'}
              bgColor={colors.fussYellow[10]}
              color={colors.grayScale[80]}
            />
          </HStack>

          <Text pt={'8px'} noOfLines={2}>
            게시글 타이틀이 노출됩니다
          </Text>

          <HStack space={'16px'} pt={'16px'}>
            <HStack alignItems={'center'} space={'4px'}>
              <HeartFill width={14} height={14} fill={colors.grayScale['30']} />
              <Text>100</Text>
            </HStack>
            <HStack alignItems={'center'} space={'4px'}>
              <MessageFill fill={colors.grayScale['30']} />
              <Text>100</Text>
            </HStack>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default BestContents;

const styles = StyleSheet.create({
  image: {
    bottom: -16,
  },
});
