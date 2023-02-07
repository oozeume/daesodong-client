import {
  Box,
  FormControl,
  HStack,
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
import {FacilityReviewForm} from '~/../types/api/facility';
import {useMutationReviewRegister} from '~/api/facility/mutations';
import _ from 'lodash';

// 셀렉터 state 타입
interface DateList {
  value: number;
  txt: string;
}

type Props = NativeStackScreenProps<
  RootStackParamList,
  'FacilityReviewRegister'
>;

/**
 *@description 병원 리뷰 등록 페이지
 */
function FacilityReviewRegister({route}: Props) {
  const {id, facilityName} = route.params;

  const navigation = useNavigation<NavigationHookProp>();
  // 방문 날짜 state
  const [visitedDate, setVisitedDate] = useState({
    year: 0,
    month: dayjs().month(),
  });

  const [yearList, setYearList] = useState<DateList[]>([]); // 방문 날짜 연 리스트
  const [monthList, setMonthList] = useState<DateList[]>([]); // 방문 날짜 월 리스트

  const [diagnostic, setDiagnostic] = useState(''); // 진단 내용

  // 후기 작성 시, 주의사항 페이지 이동 함수
  const onMovePrecaution = () => {
    navigation.navigate('HospitalReviewRegisterPrecaution');
  };

  const onMoveBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 2015;

    let _yearList = [];
    let _monthList = [];

    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});
    }

    for (let i = 1; i < 13; i++) {
      _monthList.push({value: i, txt: `${i}월`});
    }

    setYearList(_yearList);
    setMonthList(_monthList);
  }, []);

  const [reviewForm, setReviewForm] = useState<FacilityReviewForm>({
    visit_date: '',
    cost: 0,
    thoughts: '',
    score_treatment: 0,
    score_price: 0,
    score_facilities: 0,
    score_kindness: 0,
    expect_revisit: false,
    already_reviesit: false,
    hospital_review_picture: [''],
    tags: [''],
  });

  const {mutateAsync} = useMutationReviewRegister(id);

  const onSubmit = async () => {
    // TODO: API 변경되면 다시 진행
    mutateAsync(reviewForm).then().catch();
  };

  return (
    <SafeAreaView>
      <ScrollView backgroundColor={colors.grayScale['0']}>
        <HospitalName
          text={facilityName ?? '어울림 동물병원'}
          onPress={onMoveBack}
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

            <VerificationForm
              placeholder={'#피부병 #각질 #건강검진'}
              marginBottom={'8px'}
              onChangeText={setDiagnostic}
              value={diagnostic}
              onBlur={() => {
                const arr = diagnostic.split(' ').map(i => `#${i}`);
                setDiagnostic(arr.join(' '));
                setReviewForm({...reviewForm, tags: diagnostic.split(' ')});
              }}
            />

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
            <ReviewRegisterButton handlePress={onSubmit} active={true} />
          </FormControl>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FacilityReviewRegister;
