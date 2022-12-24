import {
  Box,
  Center,
  FlatList,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import MapIcon from '~/assets/icons/map.svg';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import ListViewChangeButton from './ListViewChangeButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setListExpand: (isListExpand: boolean) => void;
  isListExpand: boolean;
  itemList: any[];
}

/**
 *@description 시설 메인 페이지 > 시설 리스트
 * @param itemList - 시설 데이터 리스트
 * @param setListExpand - 시설 리스트 뷰 확장 설정 함수
 */
function FacilityList({
  isOpen,
  onClose,
  itemList,
  setListExpand,
  isListExpand,
}: Props) {
  const navigation = useNavigation<NavigationHookProp>();

  // 시설 리스트 뷰 확장 여부
  const onPress = () => {
    navigation.navigate('Hospital');
  };

  // 360 / 812 값은 피그마 페이지 비율
  const actionSheetHeightRatio = isListExpand ? 1 : 360 / 812;

  return (
    <>
      {isOpen && (
        <Box zIndex={99}>
          <Box
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            bgColor={colors.grayScale[0]}
            pt={isListExpand ? '166px' : 0}
            pb={'40px'}
            w="100%"
            maxH={`${Math.floor(APP_HEIGHT)}`}
            h={Math.floor(APP_HEIGHT * actionSheetHeightRatio)}>
            {!isListExpand && (
              <Pressable
                onPressOut={() => {
                  setListExpand(true);
                }}
                w="100%"
                h="44px"
                justifyContent={'center'}
                alignItems={'center'}>
                <View w="40px" h="4px" bgColor={colors.grayScale[30]} />
              </Pressable>
            )}

            <Box px="18px">
              <Center
                alignItems="center"
                width="100%"
                height="34px"
                borderRadius={8}
                bgColor={colors.fussOrange['-40']}>
                <Text
                  fontSize="13px"
                  color={colors.fussOrange[0]}
                  fontWeight={500}>
                  {`${24}개의 시설이 있어요`}
                </Text>
              </Center>
            </Box>

            <FlatList
              data={itemList}
              renderItem={({index}) => (
                <Pressable
                  py="16px"
                  onPress={() => onPress()}
                  px="18px"
                  backgroundColor={colors.grayScale[0]}
                  borderBottomWidth={1}
                  borderBottomColor={colors.grayScale[20]}
                  key={`${index}`}>
                  <HStack
                    pb="12px"
                    mb="12px"
                    w={`${APP_WIDTH - 36}px`}
                    borderBottomWidth={1}
                    borderBottomColor={colors.grayScale[10]}
                    justifyContent={'space-between'}>
                    <VStack>
                      <HStack alignItems={'center'}>
                        <Text
                          color={colors.grayScale[80]}
                          fontSize={'16px'}
                          fontWeight={500}
                          mr="8px">
                          시설명
                        </Text>

                        <Text
                          color={colors.grayScale[50]}
                          fontSize={'12px'}
                          fontWeight={400}>
                          시설종류
                        </Text>
                      </HStack>

                      <Text
                        color={colors.grayScale[50]}
                        fontSize={'13px'}
                        fontWeight={400}>
                        시설 주소가 입력됩니다. 영역 초과시 말줄임...
                      </Text>

                      <HStack alignItems={'center'}>
                        <HStack alignItems={'center'} mr="8px">
                          <StarFillIcon
                            width={12}
                            height={12}
                            fill={colors.fussOrange[0]}
                          />
                          <Text
                            ml="5px"
                            fontSize={'13px'}
                            fontWeight={500}
                            color={colors.fussOrange[0]}>
                            4.5
                          </Text>
                        </HStack>

                        <View w="1px" h="8px" bgColor={colors.grayScale[40]} />

                        <HStack alignItems={'center'} px="8px">
                          <MessageFillIcon
                            width={10}
                            height={10}
                            fill={'#D9D9D9'}
                          />
                          <Text
                            ml="4px"
                            fontSize={'13px'}
                            fontWeight={500}
                            color={colors.grayScale[50]}>
                            100
                          </Text>
                        </HStack>

                        <View w="1px" h="8px" bgColor={colors.grayScale[40]} />

                        <Text
                          ml="8px"
                          fontSize={'13px'}
                          fontWeight={500}
                          color={colors.grayScale[50]}>
                          02-123-4567
                        </Text>
                      </HStack>
                    </VStack>

                    {/* 병원 이미지 */}
                    <View w="70px" h="70px" bgColor={colors.grayScale[20]} />
                  </HStack>

                  <Text
                    fontSize={'13px'}
                    fontWeight={500}
                    color={colors.grayScale[60]}>
                    24마리의 [내 동물종] 친구들이 방문했어요
                  </Text>
                </Pressable>
              )}
            />
          </Box>

          {isListExpand && (
            <ListViewChangeButton
              icon={<MapIcon />}
              name="지도보기"
              onPress={() => {
                setListExpand(false);
                onClose();
              }}
            />
          )}
        </Box>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      // 안드로이드에서 안됨
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84, // 안드로이드에서 안됨
    elevation: 3,
  },
});

export default FacilityList;
