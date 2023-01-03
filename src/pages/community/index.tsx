import {HStack, Stack, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BestContents from '~/components/community/main/BestContents';
import PetType from '~/components/community/main/PetType';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {FlatList} from 'react-native-gesture-handler';
import CommunityContents from '../../components/community/main/CommunityContents';

/**
 *@description 커뮤니티 메인페이지
 */

const CommunityMain = () => {
  const data = [
    <BestContents />,
    <PetType />,
    <HStack
      zIndex={1}
      mb={'8px'}
      height={'50px'}
      bgColor={colors.grayScale[0]}
      px={'18px'}
      py={'16px'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Text color={colors.grayScale[70]}>
        총{' '}
        <Text color={colors.grayScale[70]} fontWeight={'700'}>
          100
        </Text>
        개의 이야기
      </Text>

      <KekabMenu
        pressableIcon={
          <HStack space={'2px'} alignItems={'center'}>
            <Text>최신순</Text>
            <DownIcon />
          </HStack>
        }
        left={'-18px'}
        top={'16px'}
        firstButtonName={'최신순'}
        secondButtonName={'인기순'}
        handleFirstButton={() => {}}
        handleSecondButton={() => {}}
      />
    </HStack>,
    <CommunityContents />,
  ];
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        stickyHeaderIndices={[2]}
        renderItem={({item}) => {
          return (
            <Stack position={'relative'}>
              <Stack bgColor={colors.grayScale[10]}>{item}</Stack>
            </Stack>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CommunityMain;
