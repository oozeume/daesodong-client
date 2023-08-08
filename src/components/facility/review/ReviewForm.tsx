import React, {useMemo, useState} from 'react';
import {
  Box,
  FormControl,
  HStack,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import StarReviewLine from '~/components/hospital/review/register/starReviewLine';
import ImageUploader from '~/components/hospital/review/register/imageUploader';
import {
  MoreVisitCheckButton,
  ReviewPrecautionButton,
  ReviewRegisterButton,
  RevisitCheckButton,
} from '~/components/hospital/review/register/button';
import HospitalName from '~/components/hospital/review/register/HospitalName';
import DateSelector from '~/components/hospital/review/register/selector';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VISIT_REVIEW_TEXT} from '~/constants/hospital/review/register';
import Label from '~/components/hospital/review/register/label';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';
import _ from 'lodash';
import dayjs from 'dayjs';
import {setMonths, setYears} from '~/utils/dateList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RegisterImageData} from '~/../types/community';

interface Props {
  facilityName: string;
  onClose: () => void;
  reviewForm: PostFacilityReviewData;
  setReviewForm: React.Dispatch<React.SetStateAction<PostFacilityReviewData>>;
  tagList: string[];
  onSubmit: () => void;
  active: boolean;
  images: RegisterImageData[];
  setImages: React.Dispatch<React.SetStateAction<RegisterImageData[]>>;
}

/**
 *@description 시설 리뷰 form
 */

function ReviewForm({
  facilityName,
  onClose,
  reviewForm,
  setReviewForm,
  tagList,
  onSubmit,
  active,
  images,
  setImages,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [visitedDate, setVisitedDate] = useState({
    year: 0,
    month: dayjs().month(),
  });

  const yearList = useMemo(() => {
    return setYears(2015);
  }, []);

  const monthList = useMemo(() => {
    return setMonths();
  }, []);

  const onMovePrecaution = () => {
    navigation.navigate('HospitalReviewRegisterPrecaution');
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView bounces={false}>
        <ScrollView backgroundColor={colors.grayScale['0']}>
          <HospitalName text={facilityName ?? ''} onPress={onClose} />

          <VStack p={'18px'} pb="40px">
            <FormControl>
              <VStack
                bgColor={colors.grayScale['10']}
                py="20px"
                px="24px"
                borderRadius={8}
                mb="36px">
                <StarReviewLine
                  text="진료"
                  rateName={'score_treatment'}
                  reviewForm={reviewForm}
                  setReviewForm={setReviewForm}
                />
                <StarReviewLine
                  text="비용"
                  rateName={'score_price'}
                  reviewForm={reviewForm}
                  setReviewForm={setReviewForm}
                />
                <StarReviewLine
                  text="시설"
                  rateName={'score_facilities'}
                  reviewForm={reviewForm}
                  setReviewForm={setReviewForm}
                />
                <StarReviewLine
                  text="친절"
                  rateName={'score_kindness'}
                  reviewForm={reviewForm}
                  setReviewForm={setReviewForm}
                  lineStyle={{marginBottom: 0}}
                />
              </VStack>

              <HStack mb={'15px'}>
                <Label text="방문 날짜" />
                <Label text=" (필수)" color={colors.negative['-10']} />
              </HStack>

              <HStack justifyContent={'space-between'} mb={36}>
                <Box w="47.5%">
                  <DateSelector
                    headerText="년도"
                    selectedIndex={visitedDate.year}
                    onSelect={(index: number) => {
                      setVisitedDate(pre => ({
                        ...pre,
                        year: index,
                      }));
                      setReviewForm({
                        ...reviewForm,
                        visit_date: `${yearList[index].value}-${
                          monthList[visitedDate.month].value
                        }`,
                      });
                    }}
                    itemList={yearList}
                  />
                </Box>

                <Box w="47.5%">
                  <DateSelector
                    headerText="월"
                    selectedIndex={visitedDate.month}
                    onSelect={(index: number) => {
                      setVisitedDate(pre => ({
                        ...pre,
                        month: index,
                      }));
                      setReviewForm({
                        ...reviewForm,
                        visit_date: `${yearList[visitedDate.year].value}-${
                          monthList[index].value
                        }`,
                      });
                    }}
                    itemList={monthList}
                  />
                </Box>
              </HStack>

              <HStack>
                <Label text="진료비" />
                <Label text=" (필수)" color={colors.negative['-10']} />
              </HStack>

              <VerificationForm
                placeholder={'숫자만 입력할 수 있어요'}
                marginBottom={'8px'}
                onChangeText={price =>
                  setReviewForm({
                    ...reviewForm,
                    cost: Number(price),
                  })
                }
                value={String(reviewForm.cost)}
                keyboardType="number-pad"
                inputRightElement={
                  <Text color={colors.grayScale['60']} fontSize="15px">
                    만원
                  </Text>
                }
              />

              <Text color={colors.grayScale['50']} fontSize="13px" mb={'36px'}>
                진료비는 반올림해서 만원 단위로 적어주세요
              </Text>

              <HStack>
                <Label text="진단 내용" />
                <Label text=" (필수)" color={colors.negative['-10']} />
              </HStack>

              <Pressable
                onPress={() => {
                  navigation.navigate('TagRegister');
                }}>
                <HStack
                  height={'52px'}
                  flex={1}
                  space={'10px'}
                  borderBottomWidth={1}
                  py={'15px'}
                  mb={'8px'}
                  borderBottomColor={colors.grayScale[30]}>
                  {_.isEmpty(tagList) ? (
                    <>
                      {['피부병', '각질', '건강검진'].map(tag => (
                        <Text
                          key={tag}
                          fontSize={'15px'}
                          color={colors.grayScale[40]}>
                          #{tag}
                        </Text>
                      ))}
                    </>
                  ) : (
                    <>
                      {tagList.map(tag => (
                        <Text key={tag} fontSize={'15px'}>
                          {tag}
                        </Text>
                      ))}
                    </>
                  )}
                </HStack>
              </Pressable>

              <Text color={colors.grayScale['50']} fontSize="13px" mb={'36px'}>
                진단받은 내용은 태그로 추가할 수 있습니다
              </Text>

              <HStack>
                <Label text="방문 후기" />
                <Label text=" (필수)" color={colors.negative['-10']} />
              </HStack>

              <TextArea
                my="8px"
                h="160px"
                p={'16px 14px'}
                fontSize="15px"
                lineHeight="22px"
                placeholder={VISIT_REVIEW_TEXT}
                autoCompleteType
                value={reviewForm.thoughts}
                _focus={{
                  backgroundColor: 'transparent',
                  borderColor: colors.grayScale[30],
                }}
                onChangeText={contents => {
                  setReviewForm({
                    ...reviewForm,
                    thoughts: contents,
                  });
                }}
                placeholderTextColor={'#C6C8CD'}
              />

              <ReviewPrecautionButton onPress={onMovePrecaution} />

              <HStack mb="8px">
                <Label text="사진 첨부(최대 5개)" />
              </HStack>

              <ImageUploader
                reviewForm={reviewForm}
                setReviewForm={setReviewForm}
                images={images}
                setImages={setImages}
              />

              <HStack mb="12px">
                <Label text="이 병원을 다시 방문하시겠어요?" />
              </HStack>

              <HStack mb={'52px'}>
                <RevisitCheckButton
                  setReviewForm={setReviewForm}
                  reviewForm={reviewForm}
                />
              </HStack>

              <MoreVisitCheckButton
                setReviewForm={setReviewForm}
                reviewForm={reviewForm}
              />

              <ReviewRegisterButton handlePress={onSubmit} active={active} />
            </FormControl>
          </VStack>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ReviewForm;
