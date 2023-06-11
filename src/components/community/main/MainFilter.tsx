import {HStack, Text} from 'native-base';
import React from 'react';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {colors} from '~/theme/theme';
import DownIcon from '~/assets/icons/down.svg';
import {SetState} from '../../../../types/common';

interface Props {
  totalPostsCount: number;
  setSort: SetState<'view' | 'latest'>;
}

/**
 *@description
 *@param totalPostsCount - 전체 게시글 수
 *@todo 베타버전에서 미사용 > 추후 적용될 것 같음
 */
function MainFilter({totalPostsCount, setSort}: Props) {
  return (
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
          {totalPostsCount}
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
        handleFirstButton={() => setSort('latest')}
        handleSecondButton={() => setSort('view')}
      />
    </HStack>
  );
}

export default MainFilter;
