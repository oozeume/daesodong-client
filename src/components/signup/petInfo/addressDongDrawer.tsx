import {Actionsheet, Box, Center, HStack, ScrollView, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {BackButton} from '../../hospital/review/register/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sortedDong?: Hangjungdong[];
  onPress: () => void;
  dongValue: any;
  setDongValue: (a: any) => void;
}

type Hangjungdong = {
  sido: string;
  name: string;
  sigugun?: string;
  dong?: string;
};

function AddressDongDrawer({
  isOpen,
  onClose,
  sortedDong,
  dongValue,
  setDongValue,
  onPress,
}: Props) {
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
            읍/면/동
          </Text>
        </Center>

        <ScrollView w={'100%'}>
          {sortedDong &&
            sortedDong?.map(s => (
              <Actionsheet.Item
                key={`${s.name}+${s.dong} `}
                bgColor={colors.grayScale[0]}
                onPress={() => {
                  setDongValue(s);
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
                    {s.dong === dongValue?.dong && (
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
                      s.dong === dongValue?.dong
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

export default AddressDongDrawer;
