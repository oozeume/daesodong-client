import _ from 'lodash';
import {Circle, HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {useGetPetKinds} from '~/api/kind/queries';
import {colors} from '~/theme/theme';

interface Props {
  setPetType: React.Dispatch<React.SetStateAction<string>>;
  petType: string;
}

/**
 *@description 커뮤니티 메인 - 반려동물 종 선택
 */

function PetType({setPetType, petType}: Props) {
  const {data} = useGetPetKinds();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}>
      <HStack
        space={'16px'}
        px={'18px'}
        pt={'24px'}
        pb={'12px'}
        backgroundColor={colors.grayScale[0]}>
        <Pressable onPressIn={() => setPetType('전체')}>
          <Stack alignItems={'center'} space={'6px'}>
            <Circle
              width={'60px'}
              height={'60px'}
              backgroundColor={
                '전체' === petType
                  ? colors.fussOrange['-30']
                  : colors.grayScale[10]
              }
            />
            <Text>{'전체'}</Text>
          </Stack>
        </Pressable>

        {(data?.data ?? []).map((item, index) => (
          <Pressable
            onPressIn={() => setPetType(item.name)}
            key={index.toString()}>
            <Stack alignItems={'center'} space={'6px'}>
              <Circle
                width={'60px'}
                height={'60px'}
                backgroundColor={
                  item?.name === petType
                    ? colors.fussOrange['-30']
                    : colors.grayScale[10]
                }
              />
              <Text>{item?.name || ''}</Text>
            </Stack>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
}

export default PetType;
