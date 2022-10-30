import {Box, FormControl, HStack, ScrollView, VStack} from 'native-base';

import React, {useEffect, useState} from 'react';
import FormInput from '~/components/hospital/review/register/FormInput';
import StarReviewLine from '~/components/hospital/review/register/starReviewLine';
import ImageUploader from '~/components/hospital/review/register/imageUploader';
import {
  BackButton,
  MoreVisitCheckButton,
  ReviewPrecautionButton,
  ReviewRegisterButton,
  RevisitCheckButton,
} from '~/components/hospital/review/register/button';
import HospitalName from '~/components/hospital/review/register/HospitalName';
import DateSelector from '~/components/hospital/review/register/selector';
import dayjs from 'dayjs';
import Header from '~/components/hospital/review/register/Header';
import {StackProps} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VISIT_REVIEW_TEXT} from '~/constants/hospital/review/register';
import Label from '~/components/hospital/review/register/label';

// 셀렉터 state 타입
interface DateList {
  value: number;
  txt: string;
}

/**
 *@description 병원 리뷰 등록 페이지
 */
const HospitalReviewRegister = ({
  navigation,
}: StackProps<'HospitalReviewRegister'>) => {
  // 다시 방문하는지 여부 state
  const [isRevisit, setIsRevisit] = useState(0);

  // 여러번 방문 여부 state
  const [isMoreVisit, setIsMoreVisit] = useState(false);

  // 방문 날짜 state
  const [visitedDate, setVisitedDate] = useState({
    year: 0,
    month: dayjs().month(),
  });

  const [yearList, setYearList] = useState<DateList[]>([]);
  const [monthList, setMonthList] = useState<DateList[]>([]);

  // 후기 작성 시, 주의사항 페이지 이동 함수
  const onMovePrecaution = () => {
    navigation.navigate('HospitalReviewRegisterPrecaution');
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

  return (
    <SafeAreaView>
      <ScrollView backgroundColor="#fff">
        <Header title="후기 작성" leftButton={<BackButton />} />

        <HospitalName text={'어울림동물병원'} />

        <VStack padding={'18px'}>
          <FormControl>
            <HStack marginBottom={'15px'}>
              <Label text="방문 날짜" />
            </HStack>

            <HStack justifyContent={'space-between'} marginBottom={36}>
              <Box width="48%">
                <DateSelector
                  headerText="년도"
                  selectedIndex={visitedDate.year}
                  onSelect={(index: number) =>
                    setVisitedDate(pre => ({...pre, year: index}))
                  }
                  itemList={yearList}
                />
              </Box>

              <Box width="48%">
                <DateSelector
                  headerText="월"
                  selectedIndex={visitedDate.month}
                  onSelect={(index: number) =>
                    setVisitedDate(pre => ({...pre, month: index}))
                  }
                  itemList={monthList}
                />
              </Box>
            </HStack>

            <FormInput
              topLabel="진료비"
              placeholder="숫자만 입력할 수 있어요"
              keyboardType="number-pad"
              rightLabel="만원"
            />

            <FormInput
              topLabel="진단 내용"
              placeholder="#피부병 #각질 #건강검진"
              bottomLabel="진단받은 내용은 태그로 추가할 수 있습니다"
            />

            <FormInput
              topLabel="방문 후기"
              placeholder={VISIT_REVIEW_TEXT}
              inputBoxStyle={{marginBottom: 6}}
              isTextarea
            />

            <ReviewPrecautionButton onPress={onMovePrecaution} />

            <HStack marginBottom="8px">
              <Label text="사진 첨부(최대 5개)" />
            </HStack>

            <ImageUploader />

            <HStack marginBottom="8px">
              <Label text="별점 남기기" />
            </HStack>

            <VStack
              backgroundColor="#f6f7f7"
              paddingY="20px"
              paddingX="24px"
              borderRadius={8}
              marginBottom="36px">
              <StarReviewLine text="진료" />
              <StarReviewLine text="비용" />
              <StarReviewLine text="시설" />
              <StarReviewLine text="친절" lineStyle={{marginBottom: 0}} />
            </VStack>

            <HStack marginBottom="12px">
              <Label text="이 병원을 다시 방문하시겠어요?" />
            </HStack>

            <HStack marginBottom={'52px'} justifyContent={'space-between'}>
              <RevisitCheckButton
                text="네, 방문할래요"
                checkValue={1}
                isChecked={isRevisit}
                setCheck={setIsRevisit}
              />
              <RevisitCheckButton
                text="아뇨, 안갈래요"
                checkValue={2}
                isChecked={isRevisit}
                setCheck={setIsRevisit}
              />
            </HStack>

            <MoreVisitCheckButton
              isChecked={isMoreVisit}
              setCheck={setIsMoreVisit}
            />
            <ReviewRegisterButton />
          </FormControl>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalReviewRegister;
