import _ from 'lodash';
import {Circle, HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {useGetPetKinds} from '~/api/kind/queries';
import {PET_KIND_LIST} from '~/constants/community/select';
import {colors} from '~/theme/theme';

interface Props {
  setPetType: React.Dispatch<React.SetStateAction<string>>;
  petType: string;
}

/**
 *@description 커뮤니티 메인 - 반려동물 종 선택
 */

function PetType({setPetType, petType}: Props) {
  const {data} = useGetPetKinds(true);

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

        {(data ?? PET_KIND_LIST).map((item, index) => (
          <Pressable onPressIn={() => setPetType(item)} key={index.toString()}>
            <Stack alignItems={'center'} space={'6px'}>
              <Circle
                width={'60px'}
                height={'60px'}
                backgroundColor={
                  item === petType
                    ? colors.fussOrange['-30']
                    : colors.grayScale[10]
                }
              />
              <Text>{item || ''}</Text>
            </Stack>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
}

export default PetType;
