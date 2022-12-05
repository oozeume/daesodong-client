import {
  Box,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icons/back.svg';
import DownIcon from '~/assets/icons/down.svg';

import {colors} from '~/theme/theme';
import Header from '~/components/hospital/review/register/Header';
import {Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import OtherContentsList from '~/components/contents/detail/OtherContentsList';
import ReviewPopup from '~/components/contents/detail/ReviewPopup';
import ContentItem from '~/components/contents/detail/ContentItem';
import KekabMenu from '~/components/common/kekab/KekabMenu';

/**
 *@description 이 시리즈의 다른 이야기 페이지
 */
const OtherContents = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 셀랙터 on/off 훅
  const dummyText = `무성할 하나에 비둘기, 없이 멀리 라이너 별에도 계십니다. 불러 이름과, 이국 토끼, 묻힌 프랑시스 까닭입니다. 한 새워 노루, 나는 애기 쉬이 많은 버리었습니다. 가난한 차 밤이 어머님, 흙으로 피어나듯이 이름을 봅니다. 어머님, 노새, 어머님, 써 걱정도 패, 멀리 별 있습니다.`;

  const [isBottomBarVisible, setBottomBarVisible] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState<number>();
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const scrollViewRef = useRef();

  const [filter, setFilter] = useState<'최신순' | '조회순' | '정렬 방법'>(
    '정렬 방법',
  );

  return (
    <SafeAreaView>
      <ScrollView
        bounces={false}
        ref={scrollViewRef}
        bgColor={colors.grayScale['0']}
        minHeight={'100%'}>
        <Header
          title={'시리즈 이름'}
          leftButton={
            <Pressable
              position="absolute"
              left="18px"
              zIndex={1}
              onPress={() => navigation.goBack()}>
              <BackIcon />
            </Pressable>
          }
        />

        {/* 상단 필터 뷰 */}
        <Box>
          <HStack justifyContent={'space-between'} px="18px" py="16px">
            <Text color={colors.grayScale['70']} fontWeight={400} fontSize={13}>
              총 <Text fontWeight={700}>100</Text> 개의 검색결과
            </Text>

            <KekabMenu
              top={Platform.OS === 'android' ? '18px' : '14px'}
              left={'-3px'}
              handleFirstButton={() => setFilter('최신순')}
              handleSecondButton={() => setFilter('조회순')}
              firstButtonName="최신순"
              secondButtonName="조회순"
              kekabElement={
                <HStack>
                  <Text
                    mr="2px"
                    color={colors.grayScale['80']}
                    fontWeight={400}
                    fontSize={13}>
                    {filter}
                  </Text>
                  <DownIcon />
                </HStack>
              }
            />
          </HStack>
        </Box>

        {/* 다른 컨텐츠 리스트 뷰 */}
        <Box mb="24px" px="18px">
          {['', '', '', '', '', '', '', '', ''].map((item, i) => (
            <React.Fragment key={i}>
              <ContentItem />
            </React.Fragment>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherContents;
