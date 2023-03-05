import dayjs from 'dayjs';
import {Button, Center, HStack, Pressable, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DateList} from '~/components/signup/petInfo/PetOwnerBirth';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';
import CheckIcon from '~/assets/icons/check-20.svg';
import {FlatList} from 'react-native-gesture-handler';

const PADDING_X = 18;

interface Props {
  onClose: () => void;
  onPress: (birthdate?: number) => void;
}

/**
 *@description 내 계정 - 내 정보 - 태어난 년도 변경 컴포넌트
 */

function BirthChange({onClose, onPress}: Props) {
  const [birthDate, setBirthDate] = useState<number>();
  const [yearList, setYearList] = useState<DateList[]>([]);

  useEffect(() => {
    const curYear = dayjs().year();
    const refYear = 1950;

    let _yearList = [];

    for (let i = curYear; i >= refYear; i--) {
      _yearList.push({value: i, txt: `${i}년`});
    }

    setYearList(_yearList);
  }, []);

  return (
    <Stack flex={1}>
      <Stack pt={'28px'} space={'41px'}>
        <Text textAlign={'center'} fontSize={'18px'}>
          년도
        </Text>

        <Stack height={'336px'} pb={'12px'}>
          <FlatList
            keyExtractor={item => item.txt}
            data={yearList}
            renderItem={({item}) => (
              <Pressable
                alignItems={'center'}
                backgroundColor={colors.grayScale[0]}
                onPress={() => setBirthDate(item.value)}>
                <HStack
                  width={APP_WIDTH - PADDING_X * 2}
                  borderBottomWidth={1}
                  borderBottomColor={
                    birthDate === item.value
                      ? colors.fussOrange[0]
                      : colors.grayScale[40]
                  }
                  justifyContent={'space-between'}>
                  <Text
                    py={'17px'}
                    color={colors.grayScale[70]}
                    fontSize="16px"
                    marginBottom="1.2px">
                    {item.txt}
                  </Text>
                  <Center>
                    <CheckIcon
                      fill={
                        birthDate === item.value
                          ? colors.fussOrange[0]
                          : colors.grayScale[40]
                      }
                    />
                  </Center>
                </HStack>
              </Pressable>
            )}
          />
        </Stack>
      </Stack>

      <HStack flex={1} space={'10px'} height={'104px'}>
        <Button
          onPress={onClose}
          width={'80px'}
          height={'52px'}
          borderRadius={'8px'}
          borderColor={colors.grayScale[60]}
          borderWidth={1}
          backgroundColor={colors.grayScale[10]}>
          <Text fontSize={'16px'} fontWeight={'500'}>
            닫기
          </Text>
        </Button>

        <Button
          onPress={() => onPress(birthDate)}
          flex={1}
          height={'52px'}
          borderRadius={'8px'}
          borderColor={colors.grayScale[60]}
          borderWidth={1}
          backgroundColor={
            birthDate ? colors.fussOrange[0] : colors.fussOrange['-30']
          }>
          <Text
            fontSize={'16px'}
            fontWeight={'500'}
            color={birthDate ? 'black' : colors.grayScale[50]}>
            수정
          </Text>
        </Button>
      </HStack>
    </Stack>
  );
}

export default BirthChange;
