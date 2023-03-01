import React, {useEffect, useState} from 'react';
import {Button, HStack, Spinner, Stack, Text} from 'native-base';
import FacilityReviewAllRate from '~/components/hospital/review/HospitalReviewRate';
import CheckIcon from '~/assets/icons/check.svg';
import {NavigationHookProp} from '~/../types/navigator';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import {colors} from '~/theme/theme';
import ReviewRegisterCompleteImage from '~/assets/images/review-register-complete.svg';
import {APP_WIDTH} from '~/utils/dimension';
import {
  useReviewRegister,
  useReviewRegisterContext,
} from '~/store/useReviewRegisterContext';
import Review from '~/model/faciltiyReview';
import {useGetFacilityReviews} from '~/api/facility/queries';
import EmptyReviews from '~/components/facility/review/EmptyReviews';
import _ from 'lodash';
import {FlatList} from 'react-native';
import ReviewItem from '~/components/hospital/review/ReviewItem';
import {ReviewType} from '~/../types/facility';

const MARGIN_X = 18;

interface Props {
  id: string;
  facilityName: string;
}

/**
 *@description 병원 리뷰 페이지
 */

function FacilityReview({id, facilityName}: Props) {
  const navigation = useNavigation<NavigationHookProp>();
  const isFocused = useIsFocused();

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const {data, isLoading, hasNextPage, refetch, fetchNextPage} =
    useGetFacilityReviews({
      facilityId: id,
      limit: 10,
    });

  const onMoveReviewRegisterPage = () => {
    navigation.navigate('FacilityReviewRegister', {
      id,
      facilityName,
    });
  };

  const setIsReviewResterComplete = useReviewRegister();
  const isRevewRegisterComplete = useReviewRegisterContext({
    type: ReviewType.Register,
    isComplete: false,
  });

  const onClose = () => {
    setIsReviewResterComplete({type: ReviewType.Register, isComplete: false});
    setIsCompleteModalOpen(false);

    refetch();
  };

  useEffect(() => {
    if (isFocused && isRevewRegisterComplete.isComplete) {
      if (isRevewRegisterComplete.type === ReviewType.Register) {
        setIsCompleteModalOpen(true);
      } else {
        refetch();
      }
    }
  }, [isFocused, isRevewRegisterComplete]);

  useEffect(() => {
    if (data?.pages) {
      if (_.isEmpty(data.pages)) {
        setReviews([]);
      } else {
        let _reviews: Review[] = [];
        data?.pages.forEach(item => {
          const tmpList = item.data.map(_item => new Review(_item));

          _reviews = [..._reviews, ...tmpList];
        });

        setReviews(_reviews);
      }
    }
  }, [data]);

  const fetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack flex={1} backgroundColor={'white'}>
      {_.isEmpty(reviews) ? (
        <EmptyReviews onPress={onMoveReviewRegisterPage} />
      ) : (
        <FlatList
          data={reviews}
          disableVirtualization={false}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.8}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Stack space={'8px'} backgroundColor={colors.grayScale[10]}>
                <ReviewItem
                  review={item}
                  facilityName={facilityName}
                  facilityId={id}
                  isInvisibleBorderTop={index === 0}
                />
              </Stack>
            );
          }}
          ListHeaderComponent={
            <>
              <Stack
                space={'12px'}
                py={'20px'}
                px={'18px'}
                borderBottomColor={'grayScale.20'}
                borderBottomWidth={1}
                backgroundColor={'white'}>
                <FacilityReviewAllRate facilityId={id} />
                <Button
                  onPress={onMoveReviewRegisterPage}
                  w={'100%'}
                  h={'44px'}
                  borderRadius={'8px'}
                  borderWidth={'1px'}
                  borderColor={'fussOrange.0'}
                  backgroundColor={'fussOrange.-40'}
                  shadow={'0px 3px 4px rgba(0, 0, 0, 0.08)'}>
                  <Text color={'fussOrange.0'}>후기 남기기</Text>
                </Button>
              </Stack>

              <HStack
                backgroundColor={'white'}
                h={'44px'}
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
                pb={'4px'}
                px={'18px'}>
                <HStack space={'8px'}>
                  <CheckIcon fill={'#FF6B00'} />
                  {/* TODO: API 수정 필요 */}
                  <Text fontSize={'14px'}>우리 아이와 같은 동물 후기만</Text>
                </HStack>
              </HStack>
            </>
          }
        />
      )}

      {/* TODO: 컴포넌트 네이밍 범용적으로 변경 */}
      <InfoChangeBottomSheet
        height={'412px'}
        isOpen={isCompleteModalOpen}
        onClose={onClose}
        ElementComponent={
          <Stack space={'24px'} alignItems={'center'} mt={'28px'}>
            <ReviewRegisterCompleteImage />
            <Text
              textAlign={'center'}
              fontSize={'15px'}
              color={colors.grayScale[70]}>
              {'리뷰를 등록해주셔서 감사해요.' +
                '\n' +
                '친구들이 내 후기에 고마움을 표시하면' +
                '\n' +
                '내 마음이 점점 더 따뜻해지는 걸 볼 수 있어요.'}
            </Text>
            <Button
              onPress={onClose}
              width={APP_WIDTH - MARGIN_X * 2}
              height={'52px'}
              borderRadius={'8px'}
              borderColor={colors.grayScale[60]}
              borderWidth={1}
              backgroundColor={colors.grayScale[10]}>
              <Text
                fontSize={'16px'}
                fontWeight={'500'}
                color={colors.grayScale[90]}>
                닫기
              </Text>
            </Button>
          </Stack>
        }
      />
    </Stack>
  );
}

export default FacilityReview;
