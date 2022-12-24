import {Actionsheet, FlatList, HStack, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import CheckIcon from '~/assets/icons/check-20.svg';
import {CloseButton} from '~/components/hospital/review/register/button';
import SearchIcon from '~/assets/icons/search.svg';
import Tag from '~/components/common/Tag';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Button from '~/components/common/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setPetType: (selectedItem: {id: string; title: string}) => void;
  isEnrollPet?: boolean;
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '동물명',
  },
  {
    id: '3ac68afc-c605-48d3a-a4f8-fbd91aa97f63',
    title: '동물명',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e2a9d72',
    title: '동물명',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145a571e29d72',
    title: '동물명',
  },
  {
    id: '58694a0af-3da1-471f-bd96-a145571e29d72',
    title: '동물명',
  },
  {
    id: '58694aa0f-3da1-471f-bd96-145571e29d72',
    title: '동물명',
  },
  {
    id: '58694a0f-3da1-471f-bd96a-145571e29d72',
    title: '동물명',
  },
  {
    id: '58694a0f-3da1-471f-bda96-145571e29d72',
    title: '동물명',
  },
  {
    id: '58694a0f-3da1-471f-bdaa96-145571e29d72',
    title: '동물명',
  },
  {
    id: '58694a0af-3da1-471f-bd96-145571ae29d72',
    title: '동물명',
  },
  {
    id: '58694a0fa-3da1-471f-bd96-145571ea29d72',
    title: '동물명',
  },
  {
    id: '5869a4a0f-3da1-471f-bdaa96-145571e29da72',
    title: '동물명',
  },

  {
    id: '58694a0f-a3da1-471f-bd96-1455a71e29d72',
    title: '동물명',
  },
];

/**
 *@description 집사정보등록 - 반려동물 종 선택 모달
 *@param isEnrollPet - 새로 팻을 등록할 지 여부
 */

function PetTypeSelectModal({isOpen, onClose, setPetType, isEnrollPet}: Props) {
  const statusbarHeight = getStatusBarHeight();
  const [isPetTypeEmpty, setPetTypeEmpty] = useState(false);
  const [selectedItem, setSelectedItem] = useState({id: '', title: ''});

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      paddingBottom={0}
      hideDragIndicator>
      <Actionsheet.Content
        maxHeight={APP_HEIGHT}
        height={APP_HEIGHT}
        w={APP_WIDTH}
        backgroundColor={colors.grayScale[0]}>
        <SafeAreaView style={{width: '100%'}}>
          <Stack h={APP_HEIGHT - statusbarHeight}>
            {isEnrollPet && isPetTypeEmpty ? (
              <>
                <Text>
                  집사님의 아이는 ‘친칠라'이군요! 검색결과에는 아직 없지만 곧
                  등록할 예정이에요. 입력하신 종으로 등록하시겠어요?
                </Text>

                <Button
                  width={'132px'}
                  fontColors={{
                    active: colors.grayScale[90],
                    disabled: colors.grayScale[50],
                  }}
                  buttonColors={{
                    active: colors.fussOrange[0],
                    disabled: colors.fussOrange['-30'],
                  }}
                  borderColors={{
                    active: colors.grayScale[90],
                    disabled: colors.grayScale[50],
                  }}
                  handlePress={() => {}}
                  active
                  shadow
                  text={'다음'}
                />
              </>
            ) : (
              <>
                <Stack>
                  <HStack
                    h={'60px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mb={'16px'}>
                    <Text
                      lineHeight={'26px'}
                      color={colors.grayScale[90]}
                      fontSize={'19px'}
                      fontWeight={'500'}>
                      동물
                    </Text>
                    <CloseButton onPress={onClose} />
                  </HStack>

                  <HStack
                    borderRadius={'8px'}
                    px={'16px'}
                    mb={'24px'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    h={'52px'}
                    backgroundColor={colors.grayScale[10]}>
                    <TextInput
                      style={{fontSize: 15}}
                      placeholder="검색어를 입력하세요"
                    />
                    <SearchIcon />
                  </HStack>

                  <FlatList
                    style={{
                      height: APP_HEIGHT - statusbarHeight - 200,
                    }}
                    data={DATA}
                    keyExtractor={item => item.id}
                    scrollEnabled
                    renderItem={({item, index}) => (
                      <Actionsheet.Item
                        backgroundColor={colors.grayScale[0]}
                        borderBottomWidth={1}
                        borderBottomColor={
                          selectedItem.id === item.id
                            ? colors.fussOrange[0]
                            : colors.grayScale[20]
                        }
                        onPress={() => setSelectedItem(item)}>
                        <HStack
                          w={`${APP_WIDTH - 36}px`}
                          justifyContent={'space-between'}
                          alignItems={'center'}>
                          <HStack alignItems={'center'} space={'10px'}>
                            <Tag
                              name="설치류"
                              bgColor={
                                index === 0 && !isEnrollPet
                                  ? colors.positive[0]
                                  : colors.fussOrange['-30']
                              }
                              color={
                                index === 0 && !isEnrollPet
                                  ? colors.positive['-40']
                                  : colors.fussOrange[0]
                              }
                            />
                            <Text color={colors.grayScale[60]} fontSize="16px">
                              {index === 0 && !isEnrollPet
                                ? '우리 아이(친칠라)'
                                : 'test'}
                            </Text>
                          </HStack>
                          <CheckIcon
                            fill={
                              selectedItem.id === item.id
                                ? colors.fussOrange[0]
                                : colors.grayScale[40]
                            }
                          />
                        </HStack>
                      </Actionsheet.Item>
                    )}
                  />
                </Stack>
              </>
            )}

            <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
              <Button
                handlePress={() => {
                  onClose();
                  setPetType(selectedItem);
                }}
                large
                active
                shadow
                text={'다음'}
                fontColors={{
                  active: colors.grayScale[90],
                  disabled: colors.grayScale[50],
                }}
                buttonColors={{
                  active: colors.fussOrange[0],
                  disabled: colors.fussOrange['-30'],
                }}
                borderColors={{
                  active: colors.grayScale[90],
                  disabled: colors.grayScale[50],
                }}
              />
            </Stack>
          </Stack>
        </SafeAreaView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PetTypeSelectModal;
