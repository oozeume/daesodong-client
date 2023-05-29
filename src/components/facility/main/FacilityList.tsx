import {Box, Center, FlatList, Pressable, Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';
import MapIcon from '~/assets/icons/map.svg';
import MapViewIcon from '~/assets/icons/map_view.svg';
import ListViewChangeButton from './ListViewChangeButton';
import Facility from '~/model/facility';
import FacilityItem from './FacilityItem';
import {useGetFacilityList} from '~/api/facility/queries';
import {FACILITY_PER_PAGE} from '~/constants/facility/main';
import {CoordinateType, FormState, LocationInfoType} from '~/../types/facility';
import {TAB_BAR_HEIGHT} from '~/navigator/tab/tabNavigator';
import {Platform} from 'react-native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setListExpand: (isListExpand: boolean) => void;
  isListExpand?: boolean;
  filterForm: FormState;
  coordinate: CoordinateType;
  locationSearchValue: LocationInfoType;
  hasLocationSearchValue: boolean;
}

/**
 *@description 시설 메인 페이지 > 시설 리스트
 * @param setListExpand - 시설 리스트 뷰 확장 설정 함수
 */
function FacilityList({
  isOpen,
  onClose,
  setListExpand,
  isListExpand,
  filterForm,
  coordinate,
  locationSearchValue,
  hasLocationSearchValue,
}: Props) {
  // 360 / 812 값은 피그마 페이지 비율
  const actionSheetHeightRatio = isListExpand ? 1 : 360 / 812;

  const {data, refetch, hasNextPage, fetchNextPage} = useGetFacilityList(
    {
      limit: FACILITY_PER_PAGE,
      expose: false, // TODO: 어드민 생성 후에 true로 변경
      sort: filterForm.sortType,
      state: locationSearchValue.sido.name,
      city: locationSearchValue.sigugun.name,
      lat: coordinate.latitude,
      lng: coordinate.longitude,
      species: filterForm.animal,
    },
    hasLocationSearchValue,
  );

  const fetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const facilities: Facility[] =
    data?.pages
      .flatMap(i => i.data)
      .flatMap(i => i.data)
      .map(i => new Facility(i)) ?? [];

  useEffect(() => {
    refetch();
  }, [filterForm]);

  return (
    <>
      {isOpen && (
        <Box zIndex={99}>
          <Box
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            bgColor={colors.grayScale[0]}
            pt={isListExpand ? (Platform.OS === 'ios' ? '166px' : '120px') : 0}
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
              style={{marginBottom: TAB_BAR_HEIGHT}}
              onEndReached={fetchMore}
              onEndReachedThreshold={0.9}
              data={facilities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <FacilityItem facility={item} />}
            />
          </Box>

          {isListExpand && (
            <ListViewChangeButton
              icon={isOpen ? <MapViewIcon /> : <MapIcon />}
              name={isOpen ? '지도보기' : '목록보기'}
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

export default FacilityList;
