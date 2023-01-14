import {HStack, Image, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import RightIcon from '~/assets/icons/right.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';

/**
 *@description 내 계정 - 내가 작성한 리뷰 리스트 아이템
 */

function MyReviewItem() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  return (
    <Pressable onPress={() => navigation.navigate('MyReviewDetail')}>
      <HStack
        borderBottomWidth={1}
        borderBottomColor={colors.grayScale[10]}
        p={'18px'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <HStack space={'12px'}>
          <Image
            w={'70px'}
            h={'70px'}
            backgroundColor={colors.grayScale[20]}
            alt={''}
          />
          <Stack justifyContent={'space-between'}>
            <Stack>
              <Text color={colors.grayScale[80]} fontSize={'16px'}>
                어울림동물병원
              </Text>
              <Text color={colors.grayScale[60]} fontSize={'13px'}>
                100마리의 친구들이 고마워했어요
              </Text>
            </Stack>

            <Text color={colors.grayScale[40]} fontSize={'11px'}>
              2022.02.22
            </Text>
          </Stack>
        </HStack>

        <RightIcon stroke={colors.grayScale[40]} />
      </HStack>
    </Pressable>
  );
}

export default MyReviewItem;
