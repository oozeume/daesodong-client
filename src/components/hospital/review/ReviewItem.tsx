import React, {useMemo, useState} from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  TextArea,
  View,
} from 'native-base';
import StarRate from './StarRate';
import ImageModal from './ImageModal';
import AvatarIcon from '~/assets/icons/avartar.svg';
import HeartFillIcon from '~/assets/icons/heart_fill.svg';
import ImageContainer from './imageContainer.tsx';
import {colors} from '~/theme/theme';
import Review from '~/model/facilityReview';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {Platform} from 'react-native';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Popup from '~/components/common/popup/Popup';
import {
  useMutationReviewDelete,
  usePostReportUser,
} from '~/api/facility/mutations';
import {useGetFacilityReviews, useGetMyReports} from '~/api/facility/queries';
import {REVIEWS_PER_PAGE} from '~/constants/facility/detail';
import ThanksReview from './ThanksReview';
import {useGetUser} from '~/api/user/queries';

const IMAGE_PER_ROW = 3;
const IMAGE_SPACE = 2;

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
  facilityName: string;
  facilityId: string;
}

/**
 *@description 시설 상세 > 시설 리뷰
 */

function ReviewItem({
  review,
  isInvisibleBorderTop,
  facilityName,
  visitDate,
  isInvisibleTag,
  isInvisibleKebabMenu,
  isInvisiblePetInfo,
  address,
  facilityId,
  name,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {refetch} = useGetFacilityReviews({
    facilityId,
    limit: REVIEWS_PER_PAGE,
    same: false,
  });

  const {data: userData} = useGetUser();
  const {data: myReportData} = useGetMyReports();

  const isReportedUser = useMemo(() => {
    if (myReportData) {
      const reportedReview = myReportData?.data.whoIRepoert.filter(
        r => r.suspectUserId === review.userId,
      );
      return reportedReview.length > 0;
    } else {
      return false;
    }
  }, [myReportData, review.userId]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isBlockPopupOpen, setBlockPopupOpen] = useState(false);
  const [isAccusePopupOpen, setAccusePopupOpen] = useState(false);
  const [reportContents, setReportContents] = useState('');
  const [imageSize, setImageSize] = useState(0);

  const onDeleteButtonPress = () => setDeletePopupOpen(true);
  const onAccuseButtonPress = () => setAccusePopupOpen(true);
  const onBlockButtonPress = () => setBlockPopupOpen(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const isMyReview = useMemo(() => {
    return review.userId === userData?.id;
  }, [review, userData]);

  const {mutateAsync} = useMutationReviewDelete(
    review.facilityId,
    review.reviewId,
  );

  const onEdit = () => {
    navigation.navigate('FacilityReviewEdit', {
      reviewId: review.id,
      facilityId: review.facilityId,
      review: review,
      facilityName: facilityName,
    });
  };

  const onDelete = () => {
    mutateAsync()
      .then(() => refetch())
      .catch(e => console.log('error->', e));
  };

  const {mutateAsync: reportUser} = usePostReportUser();

  const onAccuse = () => {
    if (!_.isEmpty(reportContents)) {
      reportUser({suspectUserId: review.userId, reason: reportContents}).catch(
        e => console.log('error', e),
      );
    }
  };

  // TODO: 리뷰 차단 API 적용
  const onBlock = () => {};

  const onAccuseClose = () => {
    setAccusePopupOpen(false);
    setReportContents('');
  };

  return (
    <>
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
                <Text>{review.nickname}</Text>
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
                    {review.petInfo.age}살
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

          {!isInvisibleKebabMenu && !isReportedUser && (
            <KekabMenu
              handleFirstButton={isMyReview ? onEdit : onAccuseButtonPress}
              handleSecondButton={
                isMyReview ? onDeleteButtonPress : onBlockButtonPress
              }
              firstButtonName={isMyReview ? '수정' : '신고'}
              secondButtonName={isMyReview ? '삭제' : '차단'}
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
              <Text>재방문의사 있어요</Text>
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
        {!_.isEmpty(review.images) && (
          <HStack
            overflow={'hidden'}
            flex={1}
            mt={'16px'}
            justifyContent={
              review.images.length >= IMAGE_PER_ROW
                ? 'space-between'
                : 'flex-start'
            }
            space={review.images.length >= IMAGE_PER_ROW ? 0 : 1.5}
            onLayout={e =>
              setImageSize(
                e.nativeEvent.layout.width / IMAGE_PER_ROW - IMAGE_SPACE * 2,
              )
            }>
            {review.images.map((image: string, index: number) => (
              <React.Fragment key={index.toString()}>
                {index <= 2 && (
                  <ImageContainer
                    onPress={() => {
                      setSelectedImageIndex(index);
                      setModalOpen(true);
                    }}
                    imageUrl={image}
                    imageSize={imageSize}
                    visibleMoreImage={index === IMAGE_PER_ROW - 1}
                    imagesCount={index > 1 ? review.images.length : 0}
                  />
                )}
              </React.Fragment>
            ))}
          </HStack>
        )}

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

        <ThanksReview review={review} />

        {!_.isEmpty(review.images) && modalOpen && (
          <ImageModal
            images={review.images}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            currentIndex={selectedImageIndex}
          />
        )}
      </Box>

      {isDeletePopupOpen && (
        <Popup
          title={'정말 후기를 삭제할까요?'}
          subText={
            '이 후기에 담긴 친구들의 마음을 잃게 되어요. 삭제한 내용과 잃어버린 고마움은 복구할 수 없어요.'
          }
          isVisible={isDeletePopupOpen}
          setIsVisible={setDeletePopupOpen}
          cancelButtonName={'취소'}
          successButtonName={'삭제'}
          successButtonStyle={{
            backgroundColor: colors.negative[0],
          }}
          onCancel={() => setDeletePopupOpen(false)}
          onSuccess={onDelete}
        />
      )}

      {isBlockPopupOpen && (
        <Popup
          title={'[닉네임]님을 차단하시겠어요?'}
          subText={'이 회원의 모든 게시글과 댓글이 노출되지 않아요.'}
          isVisible={isBlockPopupOpen}
          setIsVisible={setBlockPopupOpen}
          cancelButtonName={'취소'}
          successButtonName={'차단'}
          successButtonStyle={{
            backgroundColor: colors.negative[0],
          }}
          onCancel={() => setBlockPopupOpen(false)}
          onSuccess={onBlock}
        />
      )}

      {isAccusePopupOpen && (
        <Popup
          title={`${review.nickname}님을 신고하시겠어요?`}
          subText={'이유를 알려주시면 더 적합한 조취를 취할 수 있어요.'}
          isVisible={isAccusePopupOpen}
          setIsVisible={setAccusePopupOpen}
          cancelButtonName={'취소'}
          successButtonName={'신고'}
          successButtonStyle={{
            backgroundColor: colors.negative[0],
          }}
          bodyElement={
            <Box height={'160px'}>
              <TextArea
                flex={1}
                value={reportContents}
                onChangeText={setReportContents}
                autoCompleteType={false}
                placeholder={'입력'}
                backgroundColor={'white'}
                borderColor={colors.grayScale[30]}
                focusOutlineColor={colors.grayScale[30]}
              />
            </Box>
          }
          onCancel={onAccuseClose}
          onSuccess={onAccuse}
        />
      )}
    </>
  );
}

export default ReviewItem;
