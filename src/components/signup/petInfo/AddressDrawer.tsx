import {
  Actionsheet,
  Box,
  Center,
  HStack,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {BackButton} from '../../hospital/review/register/button';
import {SafeAreaView, StyleSheet} from 'react-native';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPress: () => void;
  selectableList?: Partial<Hangjungdong>[];
  setValue?: (s: any) => void;
  sidoValue?: Partial<Hangjungdong>;
  sigugunValue?: Partial<Hangjungdong>;
  dongValue?: Partial<Hangjungdong>;
  titleText?: string;
  ElementComponent?: JSX.Element;
  contentsHeight?: string;
}

export type Hangjungdong = {
  sido: string;
  name: string;
  sigugun?: string;
  dong?: string;
};

/**
 *@description 집사정보등록 - 주소 선택 모달
 * @param isOpen (필수)
 * @param onClose (필수)
 * @param onPress (필수) - 항목 선택시 실행될 동작
 * @param selectableList - 선택할 주소 항목 리스트
 * @param sidoValue - 선택한 시/도
 * @param sigugunValue - 선택한 시/구/군
 * @param dongValue - 선택한 동
 * @param setValue - 선택한 항목으로 state 변경 함수
 */

function AddressDrawer({
  isOpen,
  onClose,
  onPress: _onPress,
  selectableList,
  sidoValue,
  sigugunValue,
  dongValue,
  setValue,
  titleText,
  ElementComponent,
  contentsHeight,
}: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={colors.grayScale[0]} minHeight={'534px'}>
        <Center
          alignItems="center"
          width="100%"
          height="26px"
          margin="24px 0px 36px">
          <BackButton onPress={onClose} buttonStyle={styles.backButton} />
          <Text fontSize="18px" color={colors.grayScale[80]} lineHeight="24px">
            {titleText ?? '시 / 도'}
          </Text>
        </Center>

        <SafeAreaView style={styles.container}>
          <Stack height={'100%'}>
            <ScrollView pb={'40px'} flex={1} height={contentsHeight}>
              {selectableList?.map((s, index) => {
                return (
                  <Actionsheet.Item
                    backgroundColor={colors.grayScale[0]}
                    key={`${s.sido} + ${index}`}
                    onPress={() => {
                      if (setValue) {
                        setValue(s);
                      }

                      _onPress();
                    }}>
                    <HStack alignItems={'center'}>
                      <Center
                        width="22px"
                        height="22px"
                        marginRight="10px"
                        borderWidth={2}
                        borderColor={colors.grayScale[30]}
                        borderRadius={22}>
                        <Box
                          width="14px"
                          height="14px"
                          borderRadius={14}
                          backgroundColor={
                            s.sido === sidoValue?.sido &&
                            s.sigugun === sigugunValue?.sigugun &&
                            s.dong === dongValue?.dong
                              ? colors.fussOrange[0]
                              : colors.grayScale[0]
                          }
                        />
                      </Center>
                      <Text
                        bgColor={colors.fussOrange[0]}
                        fontSize={'16px'}
                        color={
                          s.sido === sidoValue?.sido &&
                          s.sigugun === sigugunValue?.sigugun &&
                          s.dong === dongValue?.dong
                            ? colors.grayScale[80]
                            : colors.grayScale[60]
                        }>
                        {s.name}
                      </Text>
                    </HStack>
                  </Actionsheet.Item>
                );
              })}
            </ScrollView>

            {ElementComponent}
          </Stack>
        </SafeAreaView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default AddressDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: APP_WIDTH,
    height: '100%',
  },
  backButton: {
    width: 16,
    height: 16,
    left: '2%',
  },
});
