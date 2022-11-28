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
import CheckIcon from '~/assets/icons/check-20.svg';
import {DEVICE_WIDTH} from '~/utils/dimention';
import Button from '~/components/common/button';
import _ from 'lodash';

interface Props {
  headerText?: string;
  itemList?: {value: any; txt: string}[];
  onSelect: (index: number) => void;
  selectedIndex: number | undefined;
  iconType?: 'circle' | 'underline';
  showConfirmButton?: boolean;
}

/**
 *@description 셀렉터, 하단에 드롭박스 띄우는 컴포넌트
 *@param {string} headerText - 셀렉터 컨텐트 헤더 텍스트
 *@param {Array<{value: any; txt: string}>} itemList - 셀렉터 컨텐트 목록itemList
 *@param onSelect - 셀렉터 선택 이벤트 핸들러
 *@param {number} selectedIndex - 선택된 아이템 index state
 */
function Selector({
  headerText,
  itemList,
  onSelect,
  selectedIndex,
  iconType,
  showConfirmButton,
}: Props) {
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
            {itemList && selectedIndex !== undefined
              ? itemList[selectedIndex].txt
              : ''}
          </Text>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content backgroundColor={colors.grayScale[0]}>
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

          <ScrollView w={'100%'}>
            {itemList?.map((val, i) => (
              <React.Fragment key={i.toString()}>
                {iconType === 'underline' ? (
                  <Actionsheet.Item
                    padding={0}
                    alignItems={'center'}
                    px={'18px'}
                    backgroundColor={colors.grayScale[0]}
                    _pressed={{backgroundColor: colors.grayScale[0]}}
                    onPress={
                      showConfirmButton
                        ? () => onSelect(i)
                        : () => onClickItem(i)
                    }>
                    <HStack
                      w={DEVICE_WIDTH - 36}
                      borderBottomWidth={1}
                      borderBottomColor={
                        selectedIndex === i
                          ? colors.fussOrange[0]
                          : colors.grayScale[40]
                      }
                      flex={1}
                      justifyContent={'space-between'}>
                      <Text
                        py={'17px'}
                        color="#7F838C"
                        fontSize="16px"
                        marginBottom="1.2px">
                        {val.txt}
                      </Text>
                      <Center>
                        <CheckIcon
                          fill={
                            selectedIndex === i
                              ? colors.fussOrange[0]
                              : colors.grayScale[40]
                          }
                        />
                      </Center>
                    </HStack>
                  </Actionsheet.Item>
                ) : (
                  <Actionsheet.Item>
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
                            backgroundColor="#bbb"
                          />
                        )}
                      </Center>

                      <Text
                        color="#7F838C"
                        fontSize="16px"
                        marginBottom="1.2px">
                        {val.txt}
                      </Text>
                    </HStack>
                  </Actionsheet.Item>
                )}
              </React.Fragment>
            ))}
          </ScrollView>

          {showConfirmButton && (
            <HStack space={'10px'}>
              <Button
                width={'80px'}
                active
                large
                shadow
                text={'닫기'}
                borderColors={{active: colors.grayScale[60]}}
                buttonColors={{active: colors.grayScale[10]}}
                fontColors={{active: colors.grayScale[90]}}
              />
              <Button
                width={'249px'}
                large
                handlePress={() => onClose()}
                shadow
                active={!_.isNil(selectedIndex)}
                text={'확인'}
                borderColors={{
                  active: colors.grayScale[90],
                  disabled: colors.grayScale[50],
                }}
                buttonColors={{
                  active: colors.fussOrange[0],
                  disabled: colors.fussOrange['-30'],
                }}
                fontColors={{
                  active: colors.grayScale[90],
                  disabled: colors.grayScale[50],
                }}
              />
            </HStack>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default Selector;
