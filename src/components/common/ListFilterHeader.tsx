import React, {useState} from 'react';
import {HStack, Text, View} from 'native-base';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {colors} from '~/theme/theme';
import {Platform} from 'react-native';
import DownIcon from '~/assets/icons/down.svg';

/**
 *@description 컨텐츠, 커뮤니티 리스트의 필터 헤더
 */

function ListFilterHeader() {
  const [filter, setFilter] = useState<
    '최신순' | '고마움 많은 순' | '정렬 방법'
  >('정렬 방법');

  return (
    <>
      <HStack
        backgroundColor={'white'}
        justifyContent={'space-between'}
        px="18px"
        py="16px">
        <Text color={colors.grayScale['70']} fontSize={'13px'}>
          총 <Text fontWeight={700}>100</Text>개의 리뷰
        </Text>

        <KekabMenu
          kekabMenuViewStyle={{borderRadius: 8}}
          top={Platform.OS === 'android' ? '40px' : '14px'}
          left={'-18px'}
          handleFirstButton={() => setFilter('최신순')}
          handleSecondButton={() => setFilter('고마움 많은 순')}
          firstButtonName="최신순"
          secondButtonName="고마움 많은 순"
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

      <View
        height={'8px'}
        backgroundColor={colors.grayScale[10]}
        borderTopWidth={1}
        borderBottomWidth={1}
        borderTopColor={colors.grayScale[20]}
        borderBottomColor={colors.grayScale[20]}
      />
    </>
  );
}

export default ListFilterHeader;
