import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Button, HStack, Text} from 'native-base';

import {theme} from '~/theme/theme';

import BookMarkFillIcon from '../../../assets/icon/bookmark_icon.svg';

/**
 * 병원 시설 정보 탭 하단 푸터 컴포넌트
 * @TODO 백엔드 연동 후 북마크 및 전화하기 기능 수정
 */

function HospitalInfoFooter() {
  const [isBookMark, setIsBookMark] = useState(false);
  const [bookMarkNumber, setBookMarkNumber] = useState(99);

  const handleBookMark = () => {
    setBookMarkNumber(prev => (!isBookMark ? prev + 1 : prev - 1));
    setIsBookMark(prev => !prev);
  };

  return (
    <HStack space={2} height={'12%'} justifyContent="center" paddingX={18}>
      <Button
        width={52}
        height={52}
        backgroundColor={theme.colors.grayScale[0]}
        borderWidth={1}
        borderColor={theme.colors.grayScale[90]}
        borderRadius={8}
        style={{marginTop: 12}}
        onPress={handleBookMark}>
        <BookMarkFillIcon
          fill={
            isBookMark ? theme.colors.fussOrange[0] : theme.colors.grayScale[20]
          }
        />

        <Text fontSize={10} textAlign={'center'}>
          {bookMarkNumber}
        </Text>
      </Button>
      <Button
        width={277}
        height={52}
        backgroundColor={theme.colors.fussOrange[0]}
        borderWidth={1}
        borderColor={theme.colors.grayScale[90]}
        borderRadius={8}
        style={{marginTop: 12}}
        onPress={() => {
          Linking.openURL('tel:023054242');
        }}>
        <Text>전화하기</Text>
      </Button>
    </HStack>
  );
}

export default HospitalInfoFooter;
