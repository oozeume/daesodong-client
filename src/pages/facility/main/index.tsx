import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {WebView} from 'react-native-webview';
import {APP_HEIGHT} from '~/utils/dimension';
import {Box, HStack, Pressable, Text, useDisclose, VStack} from 'native-base';
import {colors} from '~/theme/theme';
import RightIcon from '~/assets/icons/right.svg';
import FilterIcon from '~/assets/icons/filter.svg';
import MapFilter from '~/components/facility/main/MapFilter';
import {Platform, StyleSheet} from 'react-native';
import MapFilterButton from '~/components/facility/main/MapFilterButton';
import FacilityList from '~/components/facility/main/FacilityList';
import AddressDrawer, {
  Hangjungdong,
} from '~/components/signup/petInfo/AddressDrawer';
import {hangjungdong} from '~/utils/hangjungdong';
import PositionPopup from '~/components/facility/main/PositionPopup';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import ListViewChangeButton from '~/components/facility/main/ListViewChangeButton';
import {CoordinateType, FormState, LocationInfoType} from '~/../types/facility';
import {SpeciesData} from '~/../types/api/species';
import {useGetUser} from '~/api/user/queries';
import LocationSearch from '../../../components/facility/main/LocationSearch';
import _ from 'lodash';
import {FacilitySortType, FacilityType} from '~/../types/api/facility';
import {FACILITY_PER_PAGE} from '~/constants/facility/main';
import {useCoordinate, useGetFacilityList} from '~/api/facility/queries';
import Facility from '~/model/facility';
import useBackHandler from '~/hooks/useBackHandler';

const LOCATION_INIT = {
  sido: {
    name: '',
    sido: '',
  },
  sigugun: {
    name: '',
    sigugun: '',
  },
};

/**
 *@description 시설 메인 페이지
 */
const FacilityMain = () => {
  const {data: userInfo} = useGetUser(true);

  const navigation = useNavigation<NavigationHookProp>();
  const ref = useRef<WebView | null>(null);

  const {sido, sigugun} = hangjungdong;
  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>();

  const [locationSearchValue, setLocationSearchValue] =
    useState<LocationInfoType>(LOCATION_INIT);

  const [coordinate, setCoordinate] = useState<CoordinateType>({
    latitude: 0,
    longitude: 0,
  });

  const [sortedSigugun, setSortedSigugun] = useState<
    Partial<Hangjungdong>[] | undefined
  >();

  const initFormState: FormState = {
    facility: 'all' as keyof typeof FacilityType,
    animal: undefined,
    sortType: 'distances' as keyof typeof FacilitySortType,
  };

  const [filterForm, setFilterForm] = useState(initFormState);
  const [isFacilityListExpand, setFacilityListExpand] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petType, setPetType] = useState<SpeciesData>();

  const [facilities, setFacilities] = useState<Facility[]>([]);

  useBackHandler();

  const {refetch: getCoordinate} = useCoordinate(
    locationSearchValue.sido.name + ' ' + locationSearchValue.sigugun.name,
  );

  const {refetch, hasNextPage, fetchNextPage} = useGetFacilityList(
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
    false,
    result => {
      if (result) {
        const _facilities: Facility[] =
          result.pages
            .flatMap(i => {
              return i.data;
            })
            .flatMap(i => i.data)
            .map(i => new Facility(i)) ?? [];

        if (_.isEmpty(_facilities)) {
          setFacilities([]);
          getCoordinate().then(d => {
            onMoveMap({
              latitude: d.data?.data.addresses[0]?.y,
              longitude: d.data?.data.addresses[0]?.x,
            });
          });
        } else {
          onMarkerMap(_facilities);
          setFacilities(_facilities);
          onMoveMap({
            latitude: _facilities[0].latitude,
            longitude: _facilities[0].longitude,
          });
        }
      }
    },
  );

  const {
    isOpen: isSidoOpen,
    onOpen: onSidoOpen,
    onClose: onSidoClose,
  } = useDisclose();

  const {
    isOpen: isSigugunOpen,
    onOpen: onSigugunOpen,
    onClose: onSigugunClose,
  } = useDisclose();

  const {
    isOpen: isFacilityFilterOpen,
    onOpen: onFacilityFilterOpen,
    onClose: onFacilityFilterClose,
  } = useDisclose();

  const {
    isOpen: isSortTypeFilterOpen,
    onOpen: onSortTypeFilterOpen,
    onClose: onSortTypeFilterClose,
  } = useDisclose();

  const {
    isOpen: isFacilityListOpen,
    onOpen: onFacilityListOpen,
    onClose: onFacilityListClose,
  } = useDisclose(true);

  const {
    isOpen: isPetSearchOpen,
    onOpen: onPetSearchOpen,
    onClose: onPetSearchClose,
  } = useDisclose(false);

  const onMoveMap = (coordinates: {latitude: number; longitude: number}) => {
    ref.current?.postMessage(
      JSON.stringify({
        success: true,
        type: 'move',
        isDebug: true,
        data: coordinates,
      }),
    );
  };

  // 마커 표시 이벤트
  const onMarkerMap = (_facilities: Facility[]) => {
    const markerList = _facilities.map(i => ({
      latitude: i.latitude,
      longitude: i.longitude,
    }));

    ref.current?.postMessage(
      JSON.stringify({
        success: true,
        type: 'marker',
        isDebug: false,
        data: markerList,
      }),
    );
  };

  const positionSelectCancel = () => {
    setIsModalVisible(false);
    setSidoValue(undefined);
    setSigugunValue(undefined);
  };

  const positionSelect = () => {
    setLocationSearchValue({
      sido: {
        name: sidoValue?.name ?? locationSearchValue.sido.name,
        sido: sidoValue?.sido ?? locationSearchValue.sido.sido,
      },
      sigugun: {
        name: sigugunValue?.name ?? '',
        sigugun: sigugunValue?.sigugun ?? '',
      },
    });
    setIsModalVisible(false);
  };

  const fetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isSigugunOpen && !_.isEmpty(locationSearchValue.sido)) {
      setSortedSigugun(
        sigugun.filter(i => i.sido === locationSearchValue.sido.sido),
      );
    }
  }, [isSigugunOpen]);

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue]);

  useEffect(() => {
    refetch();
  }, [filterForm, locationSearchValue]);

  return (
    <Box w="100%" h={APP_HEIGHT}>
      <VStack
        w="100%"
        px="18px"
        position={'absolute'}
        top={Platform.OS === 'ios' ? '56px' : '12px'}
        zIndex={100}>
        {!isFacilityListExpand && (
          <Pressable
            w="100%"
            backgroundColor={colors.grayScale['90']}
            borderRadius={8}
            mb="8px"
            style={[styles.shadow, styles.blackBackground]}
            onPress={() => navigation.navigate('FacilityRecommendation')}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              h="44px"
              pr="10px"
              pl="16px"
              w="100%">
              <Text fontSize={'13px'} color={colors.fussOrange['0']}>
                좋은 시설이 있다면 소개해주세요!
              </Text>

              <RightIcon fill={colors.fussOrange['0']} />
            </HStack>
          </Pressable>
        )}

        <LocationSearch
          onPress={() => setIsModalVisible(true)}
          style={isFacilityListExpand ? styles.solidBackground : styles.shadow}
          locationValue={locationSearchValue}
          setLocationValue={setLocationSearchValue}
          coordinate={coordinate}
          setCoordinate={setCoordinate}
        />

        <HStack justifyContent={'space-between'} w="100%" space={3}>
          <MapFilterButton
            name={FacilityType[filterForm.facility]}
            onPress={onFacilityFilterOpen}
            style={
              isFacilityListExpand ? styles.solidBackground : styles.shadow
            }
          />
          <MapFilterButton
            name={filterForm.animal || '동물'}
            onPress={onPetSearchOpen}
            style={
              isFacilityListExpand ? styles.solidBackground : styles.shadow
            }
          />
          <MapFilterButton
            name={FacilitySortType[filterForm.sortType]}
            onPress={onSortTypeFilterOpen}
            style={
              isFacilityListExpand ? styles.solidBackground : styles.shadow
            }
          />
        </HStack>
      </VStack>

      <WebView
        scrollEnabled={false}
        ref={ref}
        source={{
          uri: 'http://daesodong-map.s3-website.us-east-2.amazonaws.com/',
        }}
      />

      {/* 맵 필터(시설, 동물, 정렬) 액션시트  */}
      <MapFilter
        isOpen={isFacilityFilterOpen}
        onClose={onFacilityFilterClose}
        onPress={(value: any) =>
          setFilterForm(prev => ({...prev, facility: value}))
        }
        value={FacilityType[filterForm.facility] || ''}
        title="시설"
        filters={FacilityType}
      />

      {/* 동물 검색 모달 */}
      <PetTypeSelectModal
        isOpen={isPetSearchOpen}
        onClose={onPetSearchClose}
        setPetType={setPetType}
        onPress={(value: any) =>
          setFilterForm(prev => ({...prev, animal: value.name}))
        }
        isEnrollPet={false}
        previousPetTypeName={userInfo?.mainPetInfo.specieName}
      />

      <MapFilter
        isOpen={isSortTypeFilterOpen}
        onClose={onSortTypeFilterClose}
        onPress={(value: any) => {
          setFilterForm(prev => ({...prev, sortType: value}));
        }}
        value={FacilitySortType[filterForm.sortType] || ''}
        title="정렬"
        filters={FacilitySortType}
      />

      <ListViewChangeButton
        icon={<FilterIcon />}
        name="목록보기"
        onPress={onFacilityListOpen}
      />

      {/* 시 군 구 선택 팝업창 */}
      <PositionPopup
        visible={isModalVisible}
        onCancel={positionSelectCancel}
        onOK={positionSelect}
        onSidoPress={onSidoOpen}
        onSigunguPress={onSigugunOpen}
        sidoValue={sidoValue ?? locationSearchValue.sido}
        sigugunValue={sigugunValue ?? locationSearchValue.sigugun}
      />

      {/* 시 선택 drawer */}
      <AddressDrawer
        isOpen={isSidoOpen}
        onClose={onSidoClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue ?? locationSearchValue.sido}
        selectableList={sido}
      />

      {/* 군 구 선택 drawer */}
      <AddressDrawer
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => {
          onSidoClose();
          onSigugunClose();
        }}
        setValue={setSigugunValue}
        selectableList={sortedSigugun}
        sigugunValue={sigugunValue ?? locationSearchValue.sigugun}
      />

      {/* 이용할 수 있는 시설 리스트 */}
      <FacilityList
        facilities={facilities}
        fetchMore={fetchMore}
        setListExpand={setFacilityListExpand}
        isListExpand={isFacilityListExpand}
        isOpen={isFacilityListOpen}
        onClose={onFacilityListClose}
      />
    </Box>
  );
};

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
    backgroundColor: colors.grayScale[0],
    borderRadius: 8,
  },
  solidBackground: {
    backgroundColor: colors.grayScale[10],
    borderRadius: 8,
  },
  blackBackground: {
    backgroundColor: 'black',
  },
});

export default FacilityMain;
