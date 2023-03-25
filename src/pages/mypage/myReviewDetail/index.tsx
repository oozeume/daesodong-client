import {Box, HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReviewItem from '~/components/hospital/review/ReviewItem';
import Review from '~/model/faciltiyReview';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 내가 작성한 리뷰 상세
 */

function MyReviewDetail() {
  const dummnyData = new Review({
    id: '110a46ea-697a-481c-9d45-afd67bc90dba',
    hospitalId: '52013c12-5259-4934-affa-1503762bfab9',
    userId: '0ff96524-b317-40e7-83e9-83175fb66a9e',
    petId: 'd9e8a747-9c0d-471b-b5ee-f98855ef59d0',
    visit_date: '2023-01-01T00:00:00.000Z',
    cost: 20000,
    thoughts: '좋았어요14',
    score_treatment: 5,
    score_price: 5,
    score_facilities: 5,
    score_kindness: 5,
    expect_revisit: true,
    already_reviesit: true,
    created_at: '2023-03-11T14:33:24.895Z',
    updated_at: '2023-03-11T14:33:24.895Z',
    user: {
      nickname: 'test12f4',
    },
    pet: {
      id: 'd9e8a747-9c0d-471b-b5ee-f98855ef59d0',
      userId: '0ff96524-b317-40e7-83e9-83175fb66a9e',
      name: '1234',
      age: 12,
      sex: 'Male',
      specieId: 'f47ad89d-2b92-4b9e-a278-46d1121ef460',
      concern: 'Qewr',
      pet_picture_url: 'DBC23147-D981-4933-A0CE-5DFE2B501F07.jpg',
      created_at: '2023-02-25T07:04:05.256Z',
      updated_at: '2023-02-25T07:04:05.256Z',
      specie: {
        id: 'f47ad89d-2b92-4b9e-a278-46d1121ef460',
        name: '햄스터',
        confirm: true,
        kindId: '32f67806-5ba9-46bc-be7b-83a197627e9f',
        created_at: '2023-02-25T07:03:04.843Z',
      },
    },
    tags: [
      {
        hospital_review_tags: {
          id: '46333f48-341d-4359-b885-a42f86a7cb46',
          name: '햄스터',
        },
      },
      {
        hospital_review_tags: {
          id: '1ed95755-5a81-42c0-b5dc-22abe5c3ee95',
          name: '피부병',
        },
      },
    ],
  });
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.grayScale[0],
        flex: 1,
      }}>
      <Stack>
        <ReviewItem
          isMyReview
          isInvisibleTag
          isInvisibleKebabMenu
          isInvisiblePetInfo
          isInvisibleBorderTop
          name={'시설 이름'}
          address={
            <Text fontSize={'13px'} color={colors.grayScale[60]}>
              서울 광진구 능동
            </Text>
          }
          visitDate={
            <HStack alignItems={'center'} space={'6px'}>
              <View backgroundColor={colors.grayScale['30']} h="8px" w="1px" />
              <Text fontSize={'13px'} color={colors.grayScale[50]}>
                YY.MM 방문
              </Text>
            </HStack>
          }
          review={dummnyData}
          facilityName={''}
          facilityId={''}
        />
        <Box
          height={'8px'}
          backgroundColor={colors.grayScale[10]}
          borderBottomWidth={1}
          borderBottomColor={colors.grayScale[20]}
        />
      </Stack>
    </SafeAreaView>
  );
}

export default MyReviewDetail;
