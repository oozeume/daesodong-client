import {Actionsheet, FlatList, HStack, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import CheckIcon from '~/assets/icons/check-20.svg';
import {CloseButton} from '~/components/hospital/review/register/button';
import SearchIcon from '~/assets/icons/search.svg';
import Tag from '~/components/common/Tag';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Button from '~/components/common/button';
import {useGetSpecies} from '~/api/species';
import {SpeciesData} from '~/../types/api/species';
import _ from 'lodash';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setPetType?: (selectedItem: SpeciesData) => void;
  isEnrollPet?: boolean;
  onPress?: (selectedItem?: SpeciesData) => void;
  buttonText?: string;
  previousPetTypeName?: string;
}

/**
 *@description 집사정보등록 - 반려동물 종 선택 모달
 *@param isEnrollPet - 새로 팻을 등록할 지 여부
 */

function PetTypeSelectModal({
  isOpen,
  onClose,
  setPetType,
  isEnrollPet,
  onPress,
  buttonText,
  previousPetTypeName,
}: Props) {
  const statusbarHeight = getStatusBarHeight();
  const [isPetTypeEmpty, setPetTypeEmpty] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SpeciesData>();
  const {data, isSuccess} = useGetSpecies({limit: 10});
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState<SpeciesData[]>([]);
  const [defaultList, setDefaultList] = useState<SpeciesData[]>(
    data?.data ?? [],
  );
  const petSearchHeight = 200;

  useEffect(() => {
    // 검색 단어 입력에 따른 동물 목록 변경
    if (!_.isEmpty(searchText)) {
      let _searchList: SpeciesData[] = [];
      let _selectedPetType;

      data?.data.forEach(item => {
        if (item.name === previousPetTypeName) {
          _selectedPetType = item;
        }

        if (
          item?.name &&
          item?.name.includes(searchText) &&
          item.name !== previousPetTypeName
        ) {
          _searchList.push(item);
        }
      });

      // 검색 단어는 있지만, 검색된 리스트는 없을 경우
      if (!_searchList.length && searchText.length) setPetTypeEmpty(true);
      else setPetTypeEmpty(false);

      if (_selectedPetType) _searchList.unshift(_selectedPetType);

      setSearchList(_searchList);
    }
  }, [searchText]);

  useEffect(() => {
    if (previousPetTypeName) {
      // 모달 오픈 시, 동물리스트 순서 변경 > [내 아이, 다른 동물] 순으로
      let _selectedPetType;
      const filterSpecies = (data?.data ?? []).filter(item => {
        if (item.name === previousPetTypeName) {
          _selectedPetType = item;
        }

        return item.name !== previousPetTypeName;
      });

      setSelectedItem(_selectedPetType);

      let _searchList = _selectedPetType
        ? [_selectedPetType, ...filterSpecies]
        : [...filterSpecies];

      setDefaultList(_searchList);
    }
  }, [previousPetTypeName]);

  useEffect(() => {
    if (!isOpen) {
      // 모달창 닫았을 때, 초기화
      setSearchText('');
      setSearchList([]);
    }
  }, [isOpen]);

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
        px={'18px'}
        backgroundColor={colors.grayScale[0]}>
        <SafeAreaView style={{width: '100%'}}>
          <Stack h={APP_HEIGHT - statusbarHeight}>
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

            {/* 동물 종 검색 뷰 */}
            <HStack
              borderRadius={'8px'}
              px={'16px'}
              mb={'24px'}
              justifyContent={'space-between'}
              alignItems={'center'}
              h={'52px'}
              backgroundColor={colors.grayScale[10]}>
              <TextInput
                onChangeText={text => setSearchText(text)}
                value={searchText}
                style={{fontSize: 15}}
                placeholder="검색어를 입력하세요"
              />
              <SearchIcon />
            </HStack>

            {isEnrollPet && isPetTypeEmpty ? (
              <Stack mt="48px">
                <Text
                  textAlign={'center'}
                  color={colors.grayScale[60]}
                  fontSize={14}
                  mb="20px">
                  {
                    '집사님의 아이는 친칠라이군요!\n검색결과에는 아직 없지만 곧 등록할 예정이에요.\n\n입력하신 종으로 등록하시겠어요?'
                  }
                </Text>

                <Stack alignItems={'center'}>
                  <Button
                    width={'132px'}
                    fontColors={{
                      active: colors.fussOrange[0],
                      disabled: colors.grayScale[50],
                    }}
                    buttonColors={{
                      active: colors.fussOrange['-40'],
                      disabled: colors.fussOrange['-30'],
                    }}
                    borderColors={{
                      active: colors.fussOrange[0],
                      disabled: colors.grayScale[50],
                    }}
                    handlePress={() => {}}
                    active
                    text={'입력한 동물로 등록'}
                  />
                </Stack>
              </Stack>
            ) : (
              <FlatList
                style={{
                  height: APP_HEIGHT - statusbarHeight - petSearchHeight,
                }}
                data={
                  !searchList.length && isSuccess ? defaultList : searchList
                }
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled
                renderItem={({item, index}) => (
                  <Actionsheet.Item
                    backgroundColor={colors.grayScale[0]}
                    borderBottomWidth={1}
                    p={0}
                    h="56px"
                    borderBottomColor={
                      selectedItem?.id === item.id
                        ? colors.fussOrange[0]
                        : colors.grayScale[20]
                    }
                    onPress={() => {
                      setSelectedItem(item);
                      if (setPetType) setPetType(item);
                    }}>
                    <HStack
                      w={`${APP_WIDTH - 36}px`}
                      h="100%"
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <HStack alignItems={'center'} space={'10px'}>
                        <Tag
                          name={item.specie.name}
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
                            ? `우리 아이(${previousPetTypeName})`
                            : item.name}
                        </Text>
                      </HStack>

                      <CheckIcon
                        fill={
                          selectedItem?.id === item.id
                            ? colors.fussOrange[0]
                            : colors.grayScale[40]
                        }
                      />
                    </HStack>
                  </Actionsheet.Item>
                )}
              />
            )}

            <Stack
              pt="12px"
              pb={'40px'}
              w={'100%'}
              position={'absolute'}
              bottom={0}>
              <Button
                handlePress={() => {
                  if (!selectedItem) return;
                  onClose();
                  if (setPetType) setPetType(selectedItem);
                  if (onPress) onPress(selectedItem);
                }}
                large
                active={!_.isUndefined(selectedItem)}
                shadow
                text={buttonText ?? '확인'}
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
