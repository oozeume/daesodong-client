import {Box, HStack, Pressable, Text, View, VStack} from 'native-base';
import React from 'react';
import ViewFillIcon from '~/assets/icons/view_fill.svg';
import BookmarkIcon from '~/assets/icons/bookmark_fill.svg';
import {colors} from '~/theme/theme';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {ColorType} from 'native-base/lib/typescript/components/types';

interface Props {
  item: any;
  onPress: () => void;
  detailViewBackgroundColor?: ColorType;
  style?: StyleProp<ViewStyle>;
}

/**
 *@description  컨텐츠 리스트 아이템
 */
const ContentItem = ({
  item,
  onPress,
  detailViewBackgroundColor,
  style,
}: Props) => {
  return (
    <Pressable onPress={onPress} px="18px">
      <Box style={style}>
        <HStack>
          {/* 다른 컨텐츠 이미지 */}
          <View w="92px" h="92px" bgColor={colors.grayScale['20']}></View>

          {/* detail view */}
          <VStack
            flex={1}
            p="12px"
            bgColor={detailViewBackgroundColor || colors.grayScale['10']}
            justifyContent="space-between">
            <VStack>
              <Text mb="2px" fontSize={'12px'} color={colors.grayScale['70']}>
                카테고리
              </Text>

              <Text fontSize={'15px'} color={colors.grayScale['70']}>
                제목 텍스트를 입력하세요
              </Text>
            </VStack>

            <HStack alignItems={'center'}>
              <ViewFillIcon
                width={'14px'}
                height={'14px'}
                fill={colors.grayScale['40']}
                style={styles.icon}
              />
              <Text mr="16px" fontSize={'12px'} color={colors.grayScale['50']}>
                100
              </Text>

              <BookmarkIcon
                width={'14px'}
                height={'14px'}
                fill={colors.grayScale['40']}
                style={styles.icon}
              />
              <Text fontSize={'12px'} color={colors.grayScale['50']}>
                100
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 4,
  },
});

export default ContentItem;
