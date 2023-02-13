import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Button, HStack, Text} from 'native-base';
import {colors} from '~/theme/theme';
import BookMarkFillIcon from '~/assets/icon/bookmark_icon.svg';

interface Props {
  thanksCount: number;
  phoneNumber: number;
}

/**
 * 병원 시설 정보 탭 하단 푸터 컴포넌트
 */

function HospitalInfoFooter({thanksCount, phoneNumber}: Props) {
  const [isBookMark, setIsBookMark] = useState(false);
  const [bookMarkNumber, setBookMarkNumber] = useState(thanksCount);

  const handleBookMark = () => {};

  return (
    <HStack space={2} justifyContent="center" paddingX={18} backgroundColor={"white"}>
      <Button
        width={52}
        height={52}
        backgroundColor={colors.grayScale[0]}
        borderWidth={1}
        borderColor={colors.grayScale[90]}
        borderRadius={8}
        style={{ marginTop: 12 }}
        onPress={handleBookMark}>
        <BookMarkFillIcon
          fill={isBookMark ? colors.fussOrange[0] : colors.grayScale[20]}
        />

        <Text fontSize={10} textAlign={'center'}>
          {thanksCount}
        </Text>
      </Button>
      <Button
        flex={1}
        height={52}
        backgroundColor={colors.fussOrange[0]}
        borderWidth={1}
        borderColor={colors.grayScale[90]}
        borderRadius={8}
        style={{ marginTop: 12 }}
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber}`);
        }}>
        <Text>전화하기</Text>
      </Button>
    </HStack>
  );
}

export default HospitalInfoFooter;
