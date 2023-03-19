import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Button, HStack, Text} from 'native-base';
import {colors} from '~/theme/theme';
import BookMarkFillIcon from '~/assets/icon/bookmark_icon.svg';
import Facility from '~/model/facility';
import {
  useMutationFaciltiyBookmark,
  useMutationFaciltiyBookmarkCancel,
} from '~/api/facility/mutations';
import _ from 'lodash';

interface Props {
  facility: Facility;
}

/**
 * 병원 시설 정보 탭 하단 푸터 컴포넌트
 * TODO : thanksCount api 수정 필요
 * TODO: 본인이 북마크 했는지 안했는지 확인 API 추가 요청 필요
 */

function FacilityInfoFooter({facility}: Props) {
  const [isBookMark, setIsBookMark] = useState(false);
  const [bookMarkNumber, setBookMarkNumber] = useState(facility.thanksCount);

  const {mutateAsync: mutateBookmark} = useMutationFaciltiyBookmark(
    facility.id,
  );
  const {mutateAsync: mutateBookmarkCancel} = useMutationFaciltiyBookmarkCancel(
    facility.id,
  );

  const handleBookMark = () => {
    if (isBookMark) {
      mutateBookmarkCancel()
        .then(() => {
          setIsBookMark(false);
          setBookMarkNumber(prev => prev - 1);
        })
        .catch(e => console.log(e));
    } else {
      mutateBookmark()
        .then(() => {
          setIsBookMark(true);
          setBookMarkNumber(prev => prev + 1);
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <HStack
      space={2}
      justifyContent="center"
      paddingX={18}
      backgroundColor={'white'}>
      <Button
        width={52}
        height={52}
        backgroundColor={colors.grayScale[0]}
        borderWidth={1}
        borderColor={colors.grayScale[90]}
        borderRadius={8}
        style={{marginTop: 12}}
        onPress={handleBookMark}>
        <BookMarkFillIcon
          fill={isBookMark ? colors.fussOrange[0] : colors.grayScale[20]}
        />

        <Text fontSize={10} textAlign={'center'}>
          {bookMarkNumber}
        </Text>
      </Button>
      <Button
        flex={1}
        height={52}
        backgroundColor={colors.fussOrange[0]}
        borderWidth={1}
        borderColor={colors.grayScale[90]}
        borderRadius={8}
        style={{marginTop: 12}}
        onPress={() => {
          Linking.openURL(`tel:${facility.phoneNumber}`);
        }}>
        <Text>전화하기</Text>
      </Button>
    </HStack>
  );
}

export default FacilityInfoFooter;
