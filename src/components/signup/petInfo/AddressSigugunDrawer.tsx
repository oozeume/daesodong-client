import {
  Actionsheet,
  Box,
  Center,
  HStack,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '~/theme/theme';
import {BackButton} from '../../hospital/review/register/button';
import {hangjungdong} from '~/utils/hangjungdong';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import {ActionSheetIOS} from 'react-native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sortedSigugun?: Hangjungdong[];
  onPress: () => void;
  setSigugunValue: (s: any) => void;
  sigugunValue: any;
}

type Hangjungdong = {
  sido: string;
  name: string;
  sigugun?: string;
  dong?: string;
};

function AddressSigugunDrawer({
  isOpen,
  onClose,
  sortedSigugun,
  setSigugunValue,
  sigugunValue,
  onPress,
}: Props) {
  // const [sigugunValue, setSigugunValue] =
  //   useState<Omit<Hangjungdong, 'dong'>>();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={1111}>
      <Actionsheet.Content height={'534px'} bgColor={colors.grayScale[0]}>
        <Center
          alignItems="center"
          width="100%"
          height="26px"
          margin="24px 0px 36px">
          <BackButton
            onPress={onClose}
            buttonStyle={{
              width: 16,
              height: 16,
              left: '2%',
            }}
          />
          <Text fontSize="18px" color="#383E4A" lineHeight="24px">
            시/군/구
          </Text>
        </Center>

        <ScrollView w={'100%'}>
          {sortedSigugun &&
            sortedSigugun?.map(s => (
              <Actionsheet.Item
                key={s.name}
                bgColor={colors.grayScale[0]}
                onPress={() => {
                  setSigugunValue(s);
                  onPress();
                }}>
                <HStack alignItems={'center'}>
                  <Center
                    width="22px"
                    height="22px"
                    marginRight="10px"
                    borderWidth={2}
                    borderColor="#E1E2E4"
                    borderRadius={22}>
                    {s.sigugun === sigugunValue?.sigugun && (
                      <Box
                        width="14px"
                        height="14px"
                        borderRadius={14}
                        backgroundColor={colors.fussOrange[0]}
                      />
                    )}
                  </Center>
                  <Text
                    bgColor={colors.fussOrange[0]}
                    fontSize={'16px'}
                    color={
                      s.sigugun === sigugunValue?.sigugun
                        ? colors.grayScale[80]
                        : colors.grayScale[60]
                    }>
                    {s.name}
                  </Text>
                </HStack>
              </Actionsheet.Item>
            ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default AddressSigugunDrawer;
