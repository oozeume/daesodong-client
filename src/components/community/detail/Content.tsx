import {Box, HStack, Pressable, Stack, Text, View, VStack} from 'native-base';
import React from 'react';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import HeartFillIcon from '~/assets/icons/heart_fill.svg';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import ViewFillIcon from '~/assets/icons/view_fill.svg';
import {Dimensions} from 'react-native';
import dayjs from 'dayjs';
import {getProgressTime} from '~/utils/time';
import Post from '~/model/post';

interface Props {
  isVisibleUserInfo?: boolean;
  isVisibleLike?: boolean;
  userInfo?: JSX.Element;
  isVisibleTag?: boolean;
  viewAllButton?: JSX.Element;
  viewMode?: 'default' | 'simple';
  isVisibleTime?: boolean;
  contentData?: Post;
}

/**
 *@description 커뮤니티 게시글 내용
 */
const CommunityContent = ({
  isVisibleUserInfo = false,
  isVisibleLike = false,
  isVisibleTag = false,
  viewAllButton,
  userInfo,
  viewMode = 'default',
  isVisibleTime,
  contentData,
}: Props) => {
  const imageWidth = Dimensions.get('screen').width - 36;

  return (
    <Box
      px="18px"
      mb="8px"
      bgColor={
        viewMode === 'simple' ? colors.grayScale[10] : colors.grayScale[0]
      }
      borderRadius={viewMode === 'simple' ? '16px' : undefined}>
      {/* 글쓴이 정보 */}
      {isVisibleUserInfo && (
        <HStack
          pt="8px"
          pb="20px"
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale['10']}>
          {/* 유저 이미지 */}

          <HStack w="100%">
            <AvatarIcon
              width={44}
              height={44}
              fill={colors.grayScale['30']}
              style={{marginRight: 12}}
            />

            <VStack>
              <HStack mr="12px" alignItems={'center'} fontWeight={700}>
                <Text color={colors.grayScale['80']} fontSize={'14px'} mr="4px">
                  닉네임
                </Text>

                <View
                  borderWidth={1}
                  borderStyle="dotted"
                  borderColor={colors.grayScale['20']}
                  px="6px">
                  <Text color={colors.grayScale['80']} fontSize={'10px'}>
                    Blank
                  </Text>
                </View>
              </HStack>

              <HStack alignItems={'center'}>
                <Text color={colors.grayScale['60']} fontSize={'13px'}>
                  골든햄스터
                </Text>

                <View
                  backgroundColor={colors.grayScale['30']}
                  h="8px"
                  w="1px"
                  mx="6px"
                />

                <Text color={colors.grayScale['60']} fontSize={'13px'}>
                  남아
                </Text>

                <View
                  backgroundColor={colors.grayScale['30']}
                  h="8px"
                  w="1px"
                  mx="6px"
                />

                <Text color={colors.grayScale['60']} fontSize={'13px'}>
                  2개월
                </Text>
              </HStack>
            </VStack>

            <Text
              position={'absolute'}
              right={0}
              bottom={0}
              color={colors.grayScale['50']}
              fontSize={'12px'}>
              {dayjs(contentData?.createdAt).format('YY.MM.DD')}
            </Text>
          </HStack>
        </HStack>
      )}

      <Box py="20px">
        <Stack space={'2px'} mb={'8px'}>
          {/* 제목 */}
          <Text
            noOfLines={viewMode === 'simple' ? 1 : undefined}
            fontSize={'16px'}
            color={colors.grayScale['80']}
            fontWeight={800}>
            {contentData?.title}
          </Text>

          {isVisibleTime && (
            <Text fontSize={'12px'} color={colors.grayScale['60']}>
              {getProgressTime(contentData?.createdAt)}
            </Text>
          )}
        </Stack>

        {/* 내용 */}
        <Text
          noOfLines={viewMode === 'simple' ? 2 : undefined}
          fontSize={'14px'}
          color={colors.grayScale['80']}
          mb={'16px'}>
          {contentData?.content}
        </Text>

        {viewAllButton}

        {viewMode !== 'simple' && (
          <Box bgColor={colors.grayScale['20']} w={imageWidth} h={imageWidth} />
        )}

        {isVisibleTag && (
          <HStack mt={'20px'}>
            {contentData?.tags.map((item, i) => (
              <View
                key={i.toString()}
                py="1px"
                px="6px"
                mr="6px"
                bgColor={colors.fussYellow['-30']}>
                <Text color={colors.fussYellow['30']}>
                  {item.post_tag?.name || ''}
                </Text>
              </View>
            ))}
          </HStack>
        )}
      </Box>

      {/* 컨텐츠 헬퍼 */}
      <HStack
        justifyContent={'space-between'}
        pt="16px"
        pb="15px"
        px="3px"
        borderTopWidth={1}
        borderTopColor={
          viewMode === 'simple'
            ? colors.grayScale['20']
            : colors.grayScale['10']
        }>
        {userInfo}
        {isVisibleLike && (
          <HStack alignItems={'center'}>
            <HeartFillIcon fill={colors.grayScale['30']} />

            <Text mx="4px" fontSize="12px" color={colors.grayScale['60']}>
              고마워요
            </Text>

            <Text fontSize="12px" color={colors.grayScale['60']}>
              {contentData?.thanks}
            </Text>
          </HStack>
        )}

        <HStack>
          {viewMode !== 'simple' && (
            <Pressable mr="16px">
              <HStack alignItems={'center'}>
                <ViewFillIcon fill={colors.grayScale['30']} />
                <Text fontSize="12px" color={colors.grayScale['60']} ml="4px">
                  {contentData?.views}
                </Text>
              </HStack>
            </Pressable>
          )}

          <Pressable>
            <HStack alignItems={'center'}>
              <MessageFillIcon fill={colors.grayScale['30']} />
              <Text fontSize="12px" color={colors.grayScale['60']} ml="4px">
                100
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};

export default CommunityContent;
