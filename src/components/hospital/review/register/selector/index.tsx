import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import React from 'react';
import DownIcon from '~/assets/icons/down.svg';
import {colors} from '~/theme/theme';
import {BackButton} from '../button';

interface Props {
  headerText?: string;
  itemList?: {value: any; txt: string}[];
  onSelect: (index: number) => void;
  selectedIndex: number;
}

/**
 *@description 셀렉터, 하단에 드롭박스 띄우는 컴포넌트
 *@param {string} headerText - 셀렉터 컨텐트 헤더 텍스트
 *@param {Array<{value: any; txt: string}>} itemList - 셀렉터 컨텐트 목록itemList
 *@param onSelect - 셀렉터 선택 이벤트 핸들러
 *@param {number} selectedIndex - 선택된 아이템 index state
 */
function Selector({headerText, itemList, onSelect, selectedIndex}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();

  /**
   *@description 아이템 클릭 이벤트 핸들러
   */
  const onClickItem = (index: number) => {
    onSelect(index);
    onClose();
  };

  return (
    <Center>
      <Pressable
        borderColor="#E1E2E4"
        borderBottomWidth={1}
        flexDirection="row"
        backgroundColor={colors.grayScale['0']}
        onPress={onOpen}>
        <HStack
          width="100%"
          paddingBottom="15px"
          justifyContent="space-between"
          alignItems="center">
          <Text fontSize={15} color="#383E4A">
            {itemList ? itemList[selectedIndex]?.txt : ''}
          </Text>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content>
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
              {headerText || ''}
            </Text>
          </Center>

          <ScrollView width={'100%'}>
            {itemList?.map((val, i) => (
              <Actionsheet.Item key={i} onPress={() => onClickItem(i)}>
                <HStack alignItems="center">
                  <Center
                    width="22px"
                    height="22px"
                    marginRight="10px"
                    borderWidth={2}
                    borderColor="#E1E2E4"
                    borderRadius={22}>
                    {selectedIndex === i && (
                      <Box
                        width="14px"
                        height="14px"
                        borderRadius={14}
                        backgroundColor="#bbb"></Box>
                    )}
                  </Center>

                  <Text color="#7F838C" fontSize="16px" marginBottom="1.2px">
                    {val.txt}
                  </Text>
                </HStack>
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default Selector;
