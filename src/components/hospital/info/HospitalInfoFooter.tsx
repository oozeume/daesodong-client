import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Button, HStack, Text} from 'native-base';
import {colors} from '~/theme/theme';
import BookMarkFillIcon from '~/assets/icons/bookmark_fill.svg';
import Facility from '~/model/facility';
import {
  useMutationFaciltiyBookmark,
  useMutationFaciltiyBookmarkCancel,
} from '~/api/facility/mutations';

interface Props {
  facility: Facility;
  refetch: () => void;
}

/**
 * 병원 시설 정보 탭 하단 푸터 컴포넌트
 */

function FacilityInfoFooter({facility, refetch}: Props) {
  const [isBookMark, setIsBookMark] = useState(
    facility.isMyBookmarkFacility(facility.id),
  );
  const [bookMarkNumber, setBookMarkNumber] = useState(facility.bookmarkCount);

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
          refetch();
        })
        .catch(e => console.log(e));
    } else {
      mutateBookmark()
        .then(() => {
          setIsBookMark(true);
          setBookMarkNumber(prev => prev + 1);
          refetch();
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
