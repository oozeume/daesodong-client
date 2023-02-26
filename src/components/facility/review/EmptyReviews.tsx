import React from 'react';
import {Button, Stack, Text} from 'native-base';
import {colors} from '~/theme/theme';
import EmptyReviewsImage from '~/assets/images/empty_reviews.svg';

interface Props {
  onPress: () => void;
}

/**
 *@description 시설 리뷰 Empty 컴포넌트
 */

function EmptyReviews({onPress}: Props) {
  return (
    <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
      <EmptyReviewsImage />
      <Text
        mt={'4px'}
        mb={'28px'}
        textAlign={'center'}
        color={colors.grayScale[60]}
        fontSize={'13px'}>
        {
          '아직 후기가 등록되지 않았어요.\n첫 후기를 남기고 친구들의 고마운마음을 받아보세요!'
        }
      </Text>
      <Button
        onPress={onPress}
        w={'200px'}
        h={'44px'}
        borderRadius={'8px'}
        borderWidth={'1px'}
        borderColor={'fussOrange.0'}
        backgroundColor={'fussOrange.-40'}
        shadow={'0px 3px 4px rgba(0, 0, 0, 0.08)'}>
        <Text color={'fussOrange.0'}>후기 남기기</Text>
      </Button>
    </Stack>
  );
}

export default EmptyReviews;
