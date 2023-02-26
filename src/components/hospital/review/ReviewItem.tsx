import React, {useState} from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  View,
} from 'native-base';
import StarRate from './StarRate';
import ImageModal from './ImageModal';
import AvatarIcon from '~/assets/icons/avartar.svg';
import HeartFillIcon from '~/assets/icons/heart_fill.svg';
import ImageContainer from './imageContainer.tsx';
import {colors} from '~/theme/theme';
import Review from '~/model/review';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {Platform} from 'react-native';
import _ from 'lodash';

interface Props {
  isInvisibleBorderTop?: boolean;
  visitDate?: JSX.Element;
  isInvisibleTag?: boolean;
  isInvisibleKebabMenu?: boolean;
  isMyReview?: boolean;
  isInvisiblePetInfo?: boolean;
  address?: JSX.Element;
  name?: string;
  review: Review;
}

/**
 *@description 병원 리뷰
 */

function ReviewItem({
  review,
  isInvisibleBorderTop,
  visitDate,
  isInvisibleTag,
  isInvisibleKebabMenu,
  isInvisiblePetInfo,
  address,
  name,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: 리뷰 수정/삭제 후속 PR에서 진행 예정
  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Box
      backgroundColor={'white'}
      px={'18px'}
      pt={'20px'}
      borderTopColor={'grayScale.20'}
      borderBottomColor={'grayScale.20'}
      borderBottomWidth={1}
      borderTopWidth={isInvisibleBorderTop ? 0 : 1}
      position={'relative'}>
      <HStack
        space={'12px'}
        mb={'16px'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <HStack space={'12px'}>
          {_.isEmpty(review.petImage) ? (
            <AvatarIcon fill={colors.grayScale['30']} />
          ) : (
            <Image
              w={'44px'}
              h={'44px'}
              borderRadius={50}
              alt={'image'}
              src={review.petImage}
            />
          )}
          <Stack>
            <HStack alignItems={'center'} space={'4px'}>
              <Text>{review.nickname ?? '닉네임'}</Text>
              {!isInvisibleTag && review.isRevisit && (
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
              )}
            </HStack>
            {!isInvisiblePetInfo && (
              <HStack space={'6px'}>
                <Text color={'grayScale.60'} fontSize={'13px'}>
                  {review.petInfo.species}
                </Text>
                <Text color={'grayScale.60'} fontSize={'13px'}>
                  |
                </Text>
                <Text color={'grayScale.60'} fontSize={'13px'}>
                  {review.petInfo.age}개월
                </Text>
                <Text color={'grayScale.60'} fontSize={'13px'}>
                  |
                </Text>
                <Text color={'grayScale.60'} fontSize={'13px'}>
                  {review.petInfo.sex}
                </Text>
              </HStack>
            )}
            {address}
          </Stack>
        </HStack>
        {!isInvisibleKebabMenu && (
          <KekabMenu
            handleFirstButton={onEdit}
            handleSecondButton={onDelete}
            firstButtonName={'수정'}
            secondButtonName={'삭제'}
            top={Platform.OS === 'android' ? '36px' : '12px'}
            left={Platform.OS === 'android' ? '-22px' : '-12px'}
          />
        )}
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
              {review.tags[0].slice(1)}
            </Text>
          </HStack>

          <HStack space={'9px'} w={'143px'}>
            <Text color={'grayScale.60'} fontSize={'13px'}>
              진료비
            </Text>
            <Text color={'grayScale.60'} fontWeight={'500'} fontSize={'13px'}>
              {review.cost}만원
            </Text>
          </HStack>
        </HStack>

        <Divider bg={'grayScale.20'} />

        <HStack bg={'red'} space={'13px'} pt={'18px'}>
          <Stack space={'8px'} w={'143px'}>
            <StarRate title={'진료'} rate={review.starScore.treatment} />
            <StarRate title={'시설'} rate={review.starScore.facility} />
          </Stack>

          <Stack space={'8px'} w={'143px'}>
            <StarRate title={'비용'} rate={review.starScore.price} />
            <StarRate title={'친절'} rate={review.starScore.kindness} />
          </Stack>
        </HStack>
      </Box>

      <HStack space={'8px'} pb={'4px'}>
        {review.hasExpectRevisit && (
          <HStack alignItems={'center'} space={'6px'}>
            <HeartFillIcon fill={'#FF6B00'} />
            <Text>재방문 의사 있어요</Text>
          </HStack>
        )}
        <HStack alignItems={'center'} space={'6px'}>
          {review.hasExpectRevisit && (
            <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />
          )}
          <Text color={colors.grayScale[50]} fontSize={'13px'}>
            {review.visitDate} 방문
          </Text>
        </HStack>
      </HStack>

      <Text fontSize={'15px'} color={colors.grayScale[80]}>
        {review.reviewContent}
      </Text>

      {/* TODO: API 수정 요청 필요 (API 이미지 없음) */}
      {/* <HStack w={'100%'} pt={'16px'} justifyContent={'space-between'}>
        <ImageContainer onPress={() => setModalOpen(true)} />
        <ImageContainer onPress={() => setModalOpen(true)} />
        <ImageContainer onPress={() => setModalOpen(true)} visibleMoreImage />
      </HStack> */}

      <HStack space={'4px'} pt={'20px'} py={'20px'}>
        {review.tags.map(tag => (
          <Flex
            key={tag}
            px={'6px'}
            py={'1px'}
            borderRadius={'4px'}
            backgroundColor={'grayScale.20'}
            alignItems={'center'}>
            <Text color={'grayScale.70'} fontSize={'12px'}>
              {tag}
            </Text>
          </Flex>
        ))}
      </HStack>

      {/* TODO: 리뷰 고마워요 api 요청 필요 */}
      <HStack
        alignItems={'center'}
        space={'10px'}
        py={'20px'}
        borderTopWidth={'1'}
        borderTopColor={'#F6F7F7'}>
        <HeartFillIcon fill={'#E1E2E4'} stroke={'#E1E2E4'} />
        <Text color={'grayScale.60'}>23마리의 친구가 고마워했어요!</Text>
      </HStack>

      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}

export default ReviewItem;
