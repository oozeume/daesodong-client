import {Box, FormControl, HStack, ScrollView, VStack} from 'native-base';

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import FormInput from '~/components/hospital/review/register/formInput';
import StarReviewLine from '~/components/hospital/review/register/starReviewLine';
import ImageUploader from '~/components/hospital/review/register/imageUploader';
import Label from '~/components/hospital/review/register/label';
import {
  BackButton,
  MoreVisitCheckButton,
  ReviewPrecautionButton,
  ReviewRegisterButton,
  RevisitCheckButton,
} from '~/components/hospital/review/register/button';
import HospitalName from '~/components/hospital/review/register/hospitalName';
import DateSelector from '~/components/hospital/review/register/selector';
import dayjs from 'dayjs';
import Header from '~/components/hospital/review/register/header';
import {StackProps} from '~/../types/navigator';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  const [isRevisit, setIsRevisit] = useState(0);
  const [isMoreVisit, setIsMoreVisit] = useState(false);

  const [visitedDate, setVisitedDate] = useState({
    year: 0,
    month: dayjs().month(),
    date: dayjs().date() - 1,
  });

  // 후기 작성 시, 주의사항 페이지 이동 함수
  const onMovePrecaution = () => {
    navigation.navigate('HospitalReviewRegisterPrecaution');
  };

  const [yearList, setYearList] = useState<DateList[]>([]);
  const [monthList, setMonthList] = useState<DateList[]>([]);
  const [dateList, setDateList] = useState<DateList[]>([]);

  const visiteReviewTxt =
    '작성하신 내용은 시설 관계자를 포함한 다른 집사님들과 함께 공유한 정보입니다. 솔직하지만 서로를 배려하는 따듯한 마음을 담아 작성해주세요:-)';

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 2015;

    let _yearList = [];
    let _monthList = [];
    let _dateList = [];

    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});
    }

    for (let i = 1; i < 13; i++) {
      _monthList.push({value: i, txt: `${i}월`});
    }

    for (let i = 1; i <= 31; i++) {
      _dateList.push({value: i, txt: `${i}일`});
    }

    setYearList(_yearList);
    setMonthList(_monthList);
    setDateList(_dateList);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.containerScrollView}>
        <Header title="후기 작성" leftButton={<BackButton />} />

        <HospitalName text={'어울림동물병원'} />

        <VStack style={styles.formView}>
          <FormControl>
            <HStack style={styles.visitDateView}>
              <Label text="방문 날짜" />
            </HStack>

            <HStack style={styles.dateSelectorList}>
              <Box style={styles.dateSelectorBox}>
                <DateSelector
                  selectedIndex={visitedDate.year}
                  onSelect={(index: number) =>
                    setVisitedDate(pre => ({...pre, year: index}))
                  }
                  itemList={yearList}
                />
              </Box>

              <Box style={styles.dateSelectorBox}>
                <DateSelector
                  selectedIndex={visitedDate.month}
                  onSelect={(index: number) =>
                    setVisitedDate(pre => ({...pre, month: index}))
                  }
                  itemList={monthList}
                />
              </Box>

              <Box style={styles.dateSelectorBox}>
                <DateSelector
                  selectedIndex={visitedDate.date}
                  onSelect={(index: number) =>
                    setVisitedDate(pre => ({...pre, date: index}))
                  }
                  itemList={dateList}
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
              placeholder="ex) 눈병, 건강검진, 털빠짐"
              bottomLabel="진단받은 내용을 짧은 단어로 적어주세요."
            />

            <FormInput
              topLabel="태그"
              placeholder="#피부병 #각질 #건강검진"
              bottomLabel="후기 필터검색시 사용되는 키워드입니다."
            />

            <FormInput
              topLabel="방문 후기"
              placeholder={visiteReviewTxt}
              inputBoxStyle={{marginBottom: 6}}
              isTextarea
            />

            <ReviewPrecautionButton onPress={onMovePrecaution} />

            <HStack style={styles.photoAddLabelView}>
              <Label text="사진 첨부(최대 5개)" />
            </HStack>

            <ImageUploader />

            <HStack style={styles.starReviewLabelView}>
              <Label text="별점 남기기" />
            </HStack>

            <VStack style={styles.starReviewList}>
              <StarReviewLine txt="진료" />
              <StarReviewLine txt="비용" />
              <StarReviewLine txt="시설" />
              <StarReviewLine txt="친절" lineStyle={{marginBottom: 0}} />
            </VStack>

            <HStack style={styles.revisitCheckLabelView}>
              <Label text="이 병원을 다시 방문하시겠어요?" />
            </HStack>

            <HStack style={styles.revisitCheckButtonView}>
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

const styles = StyleSheet.create({
  containerScrollView: {
    backgroundColor: '#FFF',
  },
  formView: {
    padding: 18,
  },
  visitDateView: {
    marginBottom: 15,
  },
  dateSelectorList: {
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  dateSelectorBox: {
    width: '31%',
  },

  photoAddLabelView: {
    marginBottom: 8,
  },

  starReviewLabelView: {
    marginBottom: 8,
  },

  starReviewList: {
    backgroundColor: '#f6f7f7',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 36,
  },

  revisitCheckLabelView: {
    marginBottom: 12,
  },

  revisitCheckButtonView: {
    marginBottom: 52,
    justifyContent: 'space-between',
  },
});

export default HospitalReviewRegister;
