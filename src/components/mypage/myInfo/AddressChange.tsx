import _ from 'lodash';
import {Pressable, Stack, Text, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import AddressDrawer, {
  Hangjungdong,
} from '~/components/signup/petInfo/AddressDrawer';
import {colors} from '~/theme/theme';
import {hangjungdong} from '~/utils/hangjungdong';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPress: (address: string) => void;
  value?: string;
}

/**
 *@description 내 계정 - 내 정보 - 주소 변경 컴포넌트
 */

function AddressChange({isOpen, onClose, onPress, value}: Props) {
  const {sido, sigugun, dong} = hangjungdong;

  const {
    isOpen: isSigugunOpen,
    onOpen: onSigugunOpen,
    onClose: onSigugunClose,
  } = useDisclose();

  const {
    isOpen: isDongOpen,
    onOpen: onDongOpen,
    onClose: onDongClose,
  } = useDisclose();

  // ex. {"name": "대구광역시", "sido": "27"}
  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();

  // ex. {"name": "동구", "sido": "27", "sigugun": "140"}
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>();

  // ex. {"dong": "520", "name": "신암2동", "sido": "27", "sigugun": "140"}
  const [dongValue, setDongValue] = useState<Hangjungdong>();

  const [sortedSigugun, setSortedSigugun] = useState<
    Partial<Hangjungdong>[] | undefined
  >();
  const [sortedDong, setSortedDong] = useState<Hangjungdong[]>();

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue, sigugun]);

  useEffect(() => {
    if (sigugunValue) {
      setSortedDong(
        dong.filter(
          item =>
            item.sigugun === sigugunValue.sigugun &&
            item.sido === sigugunValue.sido,
        ),
      );
    }
  }, [sigugunValue, dong]);

  useEffect(() => {
    // 초기 서버 값에 따른 초기값 설정
    if (value && _.isEmpty(sidoValue)) {
      const _spots = value.split(' ');

      if (_spots.length === 3) {
        sido.forEach(item => {
          if (value === item.name) {
            setSidoValue(item);
          }
        });

        sigugun.forEach(item => {
          if (value === item.name) {
            setSigugunValue(item);
          }
        });

        dong.forEach(item => {
          if (value === item.name) {
            setDongValue(item);
          }
        });
      }
    }
  }, [value]);

  return (
    <>
      <AddressDrawer
        isOpen={isOpen}
        onClose={onClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue}
        selectableList={sido}
      />

      <AddressDrawer
        titleText={'시/군/구'}
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => onDongOpen()}
        sidoValue={sidoValue}
        setValue={setSigugunValue}
        selectableList={sortedSigugun}
        sigugunValue={sigugunValue}
      />

      <AddressDrawer
        titleText={'읍/면/동'}
        contentsHeight={'260px'}
        isOpen={isDongOpen}
        onClose={onDongClose}
        onPress={() => {}}
        sidoValue={sidoValue}
        sigugunValue={sigugunValue}
        setValue={setDongValue}
        selectableList={sortedDong}
        dongValue={dongValue}
        ElementComponent={
          <>
            <Stack
              mx={'18px'}
              mb={'4px'}
              height={'40px'}
              borderRadius={'8px'}
              justifyContent={'center'}
              alignItems={'center'}
              backgroundColor={colors.grayScale[10]}>
              <Text fontSize={'14px'} color={colors.grayScale[60]}>
                {sidoValue?.name} {sigugunValue?.name} {dongValue?.name}으로
                설정합니다
              </Text>
            </Stack>
            <Pressable
              mx={'18px'}
              mt={'12px'}
              mb={'40px'}
              height={'52px'}
              disabled={!dongValue}
              onPress={() => {
                onClose();
                onSigugunClose();
                onDongClose();
                onPress(
                  `${sidoValue?.name} ${sigugunValue?.name} ${dongValue?.name}`,
                );
              }}
              variant={dongValue ? 'solidFussOrange' : 'opacityFussOrange'}>
              <Text
                variant={dongValue ? 'solidFussOrange' : 'opacityFussOrange'}>
                확인
              </Text>
            </Pressable>
          </>
        }
      />
    </>
  );
}

export default AddressChange;
