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
import {COMMUNIT_LIST} from '~/constants/community/select';
import {colors} from '~/theme/theme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setValue: (value: any) => void;
  value: string;
}

/**
 *@description 커뮤니티 게시글작성 > 커뮤니티 셀랙터
 * @param isOpen (필수)
 * @param onClose (필수)
 * @param setValue - 선택한 항목으로 state 변경 함수
 * @param value - 선택된 state
 */
function CommunitySelect({isOpen, onClose, setValue, value}: Props) {
  const onPress = (item: string) => {
    setValue(item);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={colors.grayScale[0]}>
        <Center
          alignItems="center"
          width="100%"
          height="26px"
          margin="24px 0px 36px">
          <Text fontSize="18px" color={colors.grayScale[80]} lineHeight="24px">
            커뮤니티를 선택해주세요
          </Text>
        </Center>

        <Stack w={'100%'}>
          <ScrollView>
            {COMMUNIT_LIST?.map((item, index) => {
              return (
                <Actionsheet.Item
                  backgroundColor={colors.grayScale[0]}
                  key={`${index}`}
                  onPress={() => onPress(item)}>
                  <HStack alignItems={'center'}>
                    <Center
                      width="22px"
                      height="22px"
                      marginRight="10px"
                      borderWidth={2}
                      borderColor={colors.grayScale[30]}
                      borderRadius={22}>
                      {value === item && (
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
                        value === item
                          ? colors.grayScale[80]
                          : colors.grayScale[60]
                      }>
                      {item}
                    </Text>
                  </HStack>
                </Actionsheet.Item>
              );
            })}
          </ScrollView>
        </Stack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default CommunitySelect;
