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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPress: () => void;
  setSidoValue: (s: any) => void;
  sidoValue: any;
}

export type Hangjungdong = {
  sido: string;
  name: string;
  sigugun?: string;
  dong?: string;
};

function AddressSidoDrawer({
  isOpen,
  onClose,
  onPress: _onPress,
  setSidoValue,
  sidoValue,
}: Props) {
  const {sido} = hangjungdong;

  // const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();

  // const [sortedSigugun, setSortedSigugun] = useState<Hangjungdong[]>();
  // const [sortedDong, setSortedDong] = useState<Hangjungdong[]>();

  // useEffect(() => {
  //   if (sidoValue) {
  //     setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
  //   }
  // }, [sidoValue, sigugun]);

  // useEffect(() => {
  //   if (sigugunValue) {
  //     setSortedDong(dong.filter(i => i.sigugun === sigugunValue?.sigugun));
  //   }
  // }, [sigugunValue, dong]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
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
            시/도
          </Text>
        </Center>

        <Stack w={'100%'}>
          <ScrollView>
            {sido.map(s => (
              <Actionsheet.Item
                backgroundColor={colors.grayScale[0]}
                key={s.sido}
                onPress={() => {
                  setSidoValue(s);
                  // onClose();
                  _onPress();
                }}>
                <HStack alignItems={'center'}>
                  <Center
                    width="22px"
                    height="22px"
                    marginRight="10px"
                    borderWidth={2}
                    borderColor="#E1E2E4"
                    borderRadius={22}>
                    {s.sido === sidoValue?.sido && (
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
                      s.sido === sidoValue?.sido
                        ? colors.grayScale[80]
                        : colors.grayScale[60]
                    }>
                    {s.name}
                  </Text>
                </HStack>
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Stack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default AddressSidoDrawer;
