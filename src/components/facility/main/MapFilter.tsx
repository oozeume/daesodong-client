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
import {FilterTypes} from '~/../types/api/facility';
import {colors} from '~/theme/theme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  value: FilterTypes;
  title: string;
  filters: any;
  onPress: (value: FilterTypes) => void;
}

/**
 *@description 시설 메인 지도 검색 필터 액션시트 뷰
 * @param isOpen (필수)
 * @param onClose (필수)
 * @param setValue - 선택한 항목으로 state 변경 함수
 * @param value - 선택된 state
 */
function MapFilter({
  isOpen,
  onClose,
  value,
  title,
  filters,
  onPress: _onPress,
}: Props) {
  const onPress = (item: FilterTypes) => {
    _onPress(item);
    onClose();
  };

  const list = (Object.keys(filters) as FilterTypes[]) ?? [];

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
      <Actionsheet.Content
        bgColor={colors.grayScale[0]}
        pt="28px"
        pb="40px"
        px="18px">
        <Center
          alignItems="center"
          width="100%"
          height="26px"
          margin="24px 0px 36px">
          <Text
            fontSize="18px"
            color={colors.grayScale[80]}
            lineHeight="24px"
            fontWeight={500}>
            {title}
          </Text>
        </Center>

        <Stack w={'100%'}>
          <ScrollView>
            {list.map((item: FilterTypes, index: number) => {
              return (
                <React.Fragment key={index.toString()}>
                  <Actionsheet.Item
                    px={0}
                    backgroundColor={colors.grayScale[0]}
                    key={`${index}`}
                    onPress={() => onPress(item)}>
                    <HStack alignItems={'center'}>
                      <Center
                        width="22px"
                        height="22px"
                        marginRight="10px"
                        borderWidth={value === filters[item] ? 0 : 2}
                        borderColor={colors.grayScale[30]}
                        bgColor={
                          value === filters[item]
                            ? colors.fussOrange[0]
                            : colors.grayScale[0]
                        }
                        borderRadius={22}>
                        {value === filters[item] && (
                          <Box
                            width="9px"
                            height="9px"
                            borderRadius={9}
                            backgroundColor={colors.grayScale[0]}
                          />
                        )}
                      </Center>

                      <Text
                        bgColor={colors.fussOrange[0]}
                        fontSize={'16px'}
                        color={
                          value === filters[item]
                            ? colors.grayScale[80]
                            : colors.grayScale[60]
                        }>
                        {filters[item]}
                      </Text>
                    </HStack>
                  </Actionsheet.Item>
                </React.Fragment>
              );
            })}
          </ScrollView>
        </Stack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default MapFilter;
