import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {colors} from '~/theme/theme';
import HeartFillIcon from '~/assets/icons/heart_fill.svg';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import ViewFillIcon from '~/assets/icons/view_fill.svg';
import {Dimensions} from 'react-native';
import dayjs from 'dayjs';
import {getProgressTime} from '~/utils/time';
import CommunityPost from '~/model/communityPost';
import _ from 'lodash';
import {config} from '~/utils/config';
import ImageSwiper from '~/components/common/swiper/ImageSwiper';
import ProfileImage from '~/components/common/profileImage/ProfileImage';

interface Props {
  isVisibleTopUserInfo?: boolean;
  isVisibleBottomUserInfo?: boolean;
  isVisibleLike?: boolean;
  isVisibleTag?: boolean;
  viewAllButton?: JSX.Element;
  viewMode?: 'default' | 'simple' | 'list';
  isVisibleTime?: boolean;
  contentData?: CommunityPost;
  onThank?: () => void;
  isThank?: boolean;
  thankCount?: number;
}

/**
 *@description 커뮤니티 게시글 내용
 */
const CommunityContent = ({
  isVisibleTopUserInfo = false,
  isVisibleBottomUserInfo = false,
  isVisibleLike = false,
  isVisibleTag = false,
  viewAllButton,
  viewMode = 'default',
  isVisibleTime,
  contentData,
  onThank,
  isThank,
  thankCount,
}: Props) => {
  const imageWidth = Dimensions.get('screen').width - 36;

  // 목록에서 게시글 대표 이미지로 보여질 사진 (첫번째 사진)
  const mainImageURL = _.isEmpty(contentData?.images)
    ? undefined
    : `${config.IMAGE_BASE_URL}${contentData?.images[0]?.url}`;

  return (
    <Box
      px="18px"
      mb="8px"
      bgColor={
        viewMode === 'simple' ? colors.grayScale[10] : colors.grayScale[0]
      }
      borderRadius={viewMode === 'simple' ? '16px' : undefined}>
      {/* 글쓴이 정보 */}
      {isVisibleTopUserInfo && (
        <HStack
          pt="8px"
          pb="20px"
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale['10']}>
          {/* 유저 이미지 */}

          <HStack w="100%">
            <ProfileImage
              imageName={contentData?.writerPetInfo?.pet_picture_url}
            />

            <VStack>
              <HStack mr="12px" alignItems={'center'} fontWeight={700}>
                <Text color={colors.grayScale['80']} fontSize={'14px'} mr="4px">
                  {contentData?.writerNickname}
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
                  {contentData?.writerPetInfo?.name}
                </Text>

                <View
                  backgroundColor={colors.grayScale['30']}
                  h="8px"
                  w="1px"
                  mx="6px"
                />

                <Text color={colors.grayScale['60']} fontSize={'13px'}>
                  {contentData?.writerPetInfo?.specie.name}
                </Text>

                <View
                  backgroundColor={colors.grayScale['30']}
                  h="8px"
                  w="1px"
                  mx="6px"
                />

                <Text color={colors.grayScale['60']} fontSize={'13px'}>
                  {contentData?.writerPetInfo?.age}개월
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
            fontSize={viewMode === 'simple' ? '15px' : '16px'}
            color={colors.grayScale['80']}
            fontWeight={viewMode === 'simple' ? 500 : 800}>
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

        {viewMode === 'list' && mainImageURL && (
          <Image
            w={imageWidth}
            h={imageWidth}
            fallbackElement={
              <Box
                bgColor={colors.grayScale['10']}
                w={imageWidth}
                h={imageWidth}
              />
            }
            alt="post_img"
            source={{
              uri: mainImageURL,
            }}
          />
        )}

        {viewMode === 'default' && !_.isEmpty(contentData?.images) && (
          <ImageSwiper list={contentData?.images ?? []} />
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
        {isVisibleBottomUserInfo && (
          <HStack>
            <ProfileImage
              width={20}
              height={20}
              imageStyle={{marginRight: 4}}
              imageName={contentData?.writerPetInfo?.pet_picture_url}
            />

            <HStack alignItems={'center'} space="4px" marginLeft={'8px'}>
              <Text
                fontWeight={500}
                color={colors.grayScale['80']}
                fontSize={'12px'}>
                {contentData?.writerNickname}
              </Text>

              <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />

              <Text color={colors.grayScale['60']} fontSize={'12px'}>
                {contentData?.writerPetInfo.name}
              </Text>

              {viewMode !== 'simple' && (
                <View
                  backgroundColor={colors.grayScale['30']}
                  h="8px"
                  w="1px"
                />
              )}

              {viewMode !== 'simple' && (
                <Text color={colors.grayScale['60']} fontSize={'12px'}>
                  {contentData?.writerPetInfo.specie.name}
                </Text>
              )}

              <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />

              <Text color={colors.grayScale['60']} fontSize={'12px'}>
                {contentData?.writerPetInfo.age}개월
              </Text>
            </HStack>
          </HStack>
        )}

        {isVisibleLike && (
          <Pressable onPress={onThank}>
            <HStack alignItems={'center'}>
              <HeartFillIcon
                fill={isThank ? colors.fussOrange[0] : colors.grayScale[30]}
              />

              <Text
                ml="4px"
                fontSize="12px"
                color={isThank ? colors.fussOrange[0] : colors.grayScale[60]}>
                {`고마워요 ${thankCount}`}
              </Text>
            </HStack>
          </Pressable>
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
                {contentData?.commentsCount}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};

export default CommunityContent;
