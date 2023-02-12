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
import React, {useEffect, useState} from 'react';
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
import dayjs from 'dayjs';
import {NavigationHookProp, RootStackParamList} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VISIT_REVIEW_TEXT} from '~/constants/hospital/review/register';
import Label from '~/components/hospital/review/register/label';
import {useNavigation} from '@react-navigation/native';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {useMutationReviewRegister} from '~/api/facility/mutations';
import Popup from '~/components/common/popup/Popup';
import {useReviewRegister} from '~/store/useReviewRegisterContext';
import _ from 'lodash';
import {setMonths, setYears} from '~/utils/dateList';
import {useTagContext, useTagRegister} from '~/store/useTagContext';
import {INIT_REVIEW_FORM} from '~/constants/facility/detail';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'FacilityReviewRegister'
>;

/**
 *@description 병원 리뷰 등록 페이지
 */
function FacilityReviewRegister({route}: Props) {
  const {id, facilityName} = route.params;

  const [active, setActive] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const navigation = useNavigation<NavigationHookProp>();
  const [visitedDate, setVisitedDate] = useState({
    year: 0,
    month: dayjs().month(),
  });

  const [yearList, setYearList] = useState(setYears());
  const [monthList, setMonthList] = useState(setMonths());

  const onMovePrecaution = () => {
    navigation.navigate('HospitalReviewRegisterPrecaution');
  };

  const tags = useTagContext([]);
  const setTags = useTagRegister();
  const [tagList, setTagList] = useState<string[]>([]);

  const [reviewForm, setReviewForm] =
    useState<PostFacilityReviewData>(INIT_REVIEW_FORM);

  const {mutateAsync} = useMutationReviewRegister(id);
  const setIsReviewRegisterComplete = useReviewRegister();

  const onSubmit = () => {
    mutateAsync(reviewForm)
      .then(() => {
        setTagList([]);
        setTags([]);
        navigation.goBack();
        setIsReviewRegisterComplete(true);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    setTagList(tags);

    setReviewForm({
      ...reviewForm,
      tags: tags,
    });
  }, [tags]);

  useEffect(() => {
    if (
      // TODO : 코드 간소화
      reviewForm.score_facilities !== 0 &&
      reviewForm.score_kindness !== 0 &&
      reviewForm.score_price !== 0 &&
      reviewForm.score_treatment !== 0 &&
      reviewForm.cost !== 0 &&
      reviewForm.thoughts !== '' &&
      !_.isEmpty(reviewForm.tags)
    ) {
      setActive(true);
    }
  }, [reviewForm]);

  return (
    <SafeAreaView>
      <ScrollView backgroundColor={colors.grayScale['0']}>
        <HospitalName
          text={facilityName ?? '어울림 동물병원'}
          onPress={() => setIsOpenPopup(true)}
        />

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
              onChangeText={contents => {
                setReviewForm({
                  ...reviewForm,
                  thoughts: contents,
                });
              }}
              placeholderTextColor={'#C6C8CD'}
            />

            {/* 후기 작성시 주의사항 안내 */}
            <ReviewPrecautionButton onPress={onMovePrecaution} />

            <HStack mb="8px">
              <Label text="사진 첨부(최대 5개)" />
            </HStack>

            {/* TODO : 이미지 업로드 */}
            <ImageUploader />

            <HStack mb="12px">
              <Label text="이 병원을 다시 방문하시겠어요?" />
            </HStack>

            <HStack mb={'52px'}>
              <RevisitCheckButton
                setReviewForm={setReviewForm}
                reviewForm={reviewForm}
              />
            </HStack>

            {/* '이 병원을 여러번 방문했어요.' 버튼 */}
            <MoreVisitCheckButton
              setReviewForm={setReviewForm}
              reviewForm={reviewForm}
            />

            {/* 리뷰 등록 버튼 */}
            {/* TODO: active 조건 추가 */}
            <ReviewRegisterButton handlePress={onSubmit} active={active} />
          </FormControl>
        </VStack>
      </ScrollView>

      <Popup
        title={'정말 작성을 취소하시나요?'}
        subText={'입력하신 내용은 삭제되며 복구할 수 없습니다.'}
        isVisible={isOpenPopup}
        setIsVisible={setIsOpenPopup}
        cancelButtonName={'작성 취소'}
        successButtonName={'이어서 작성하기'}
        cancelButtonStyle={{flex: 1}}
        successButtonStyle={{
          flex: 2,
          backgroundColor: colors.fussOrange[0],
        }}
        onCancel={() => {
          setTags(['']);
          navigation.goBack();
        }}
        onSuccess={() => setIsOpenPopup(false)}
      />
    </SafeAreaView>
  );
}

export default FacilityReviewRegister;
