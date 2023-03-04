import {Box, HStack, Pressable, Stack, Text, View} from 'native-base';
import React from 'react';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import _ from 'lodash';

interface Props {
  contentData: {
    title: string;
    content: string;
    writerNickname: string;
    writerPetInfo: {
      name: string;
      age: number;
    };
    commentsCount: number;
  };
}

/**
 *@description 내정보 > 저장 > 커뮤니티 탭 항목 컴포넌트
 */
const SavedCommunityContent = ({contentData}: Props) => {
  return (
    <Box
      pt="16px"
      px="20px"
      mb="8px"
      bgColor={colors.grayScale[10]}
      borderRadius={'16px'}>
      {/* 글쓴이 정보 */}
      <Box mb="20px">
        <Stack mb={'8px'}>
          {/* 제목 */}
          <Text
            noOfLines={1}
            fontSize={'15px'}
            color={colors.grayScale['80']}
            fontWeight={800}>
            {contentData.title}
          </Text>
        </Stack>

        {/* 내용 */}
        <Text
          noOfLines={2}
          fontSize={'14px'}
          color={colors.grayScale['80']}
          mb={'16px'}>
          {contentData.content}
        </Text>
      </Box>

      {/* 컨텐츠 헬퍼 */}
      <HStack
        justifyContent={'space-between'}
        py="17px"
        borderTopWidth={1}
        borderTopColor={colors.grayScale['20']}>
        <HStack>
          <AvatarIcon width={20} height={20} fill={colors.grayScale['30']} />

          <HStack alignItems={'center'} space="4px" marginLeft={'8px'}>
            <Text color={colors.grayScale['80']} fontSize={'14px'}>
              {contentData?.writerNickname}
            </Text>
            <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />
            <Text color={colors.grayScale['60']} fontSize={'13px'}>
              {contentData?.writerPetInfo.name}
            </Text>
            <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />
            <Text color={colors.grayScale['60']} fontSize={'13px'}>
              {contentData?.writerPetInfo.age}개월
            </Text>
          </HStack>
        </HStack>

        <HStack>
          <Pressable>
            <HStack alignItems={'center'}>
              <MessageFillIcon fill={colors.grayScale['30']} />
              <Text fontSize="12px" color={colors.grayScale['60']} ml="4px">
                {contentData.commentsCount ?? 0}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};

export default SavedCommunityContent;
