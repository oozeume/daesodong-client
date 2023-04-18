import {Box, Center, FlatList, Pressable, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';
import MapIcon from '~/assets/icons/map.svg';
import ListViewChangeButton from './ListViewChangeButton';
import Facility from '~/model/facility';
import FacilityItem from './FacilityItem';

interface Props {
  facilities: Facility[];
  isOpen: boolean;
  onClose: () => void;
  setListExpand: (isListExpand: boolean) => void;
  isListExpand: boolean;
}

/**
 *@description 시설 메인 페이지 > 시설 리스트
 * @param setListExpand - 시설 리스트 뷰 확장 설정 함수
 */
function FacilityList({
  facilities,
  isOpen,
  onClose,
  setListExpand,
  isListExpand,
}: Props) {
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
                  {`${facilities.length}개의 시설이 있어요`}
                </Text>
              </Center>
            </Box>

            <FlatList
              data={facilities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <FacilityItem facility={item} />}
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
