import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {WebView} from 'react-native-webview';
import {APP_HEIGHT} from '~/utils/dimension';
import {Box, HStack, Pressable, Text, useDisclose, VStack} from 'native-base';
import {colors} from '~/theme/theme';
import RightIcon from '~/assets/icons/right.svg';
import FilterIcon from '~/assets/icons/filter.svg';
import MapFilter from '~/components/facility/main/MapFilter';
import {StyleSheet} from 'react-native';
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

  const initFormState: FormState = {
    facility: 'all' as keyof typeof FacilityType,
    animal: undefined,
    sortType: 'distances' as keyof typeof FacilitySortType,
  };

  const [filterForm, setFilterForm] = useState(initFormState);
  const [isFacilityListExpand, setFacilityListExpand] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petType, setPetType] = useState<SpeciesData>();

  // const onInitMap = () => {
  //   ref.current?.postMessage(
  //     JSON.stringify({
  //       success: true,
  //       type: 'move',
  //       isDebug: true,
  //       data: coordinate,
  //     }),
  //   );
  // };
  const onInitMap = () => {
    ref.current?.postMessage(
      JSON.stringify({success: true, type: 'init', isDebug: true}),
    );
  };

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

  useEffect(() => {
    if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
      onMoveMap(coordinate);
    }
  }, [coordinate]);

  // 마커 표시 이벤트
  // 추후, api 연결 시, useEffect 쪽 코드로 변경 예정
  const onMarkerMap = () => {
    /**
      * 여의도역
      * 37.521731 126.924293

      * 여의도역 진주집
      * 37.5209, 126.9267

      * 진가와 여의도점
      * 37.5243, 126.9261
      */

    const markerList = [
      {latitude: 37.521731, longitude: 126.924293},
      {latitude: 37.5209, longitude: 126.9267},
      {latitude: 37.5243, longitude: 126.9261},
    ];

    onMoveMap(markerList[0]);

    ref.current?.postMessage(
      JSON.stringify({
        success: true,
        type: 'marker',
        isDebug: false,
        data: markerList,
      }),
    );
  };

  const onSearchMap = () => {
    ref.current?.postMessage(JSON.stringify({success: true, type: 'search'}));
  };

  const hasLocationSearchValue = useMemo(() => {
    return (
      !_.isEmpty(locationSearchValue.sido.name) &&
      !_.isEmpty(locationSearchValue.sigugun.name)
    );
  }, [locationSearchValue]);

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

  useEffect(() => {
    if (!_.isEmpty(locationSearchValue.sido)) {
      setSortedSigugun(
        sigugun.filter(i => i.sido === locationSearchValue.sido.sido),
      );
    }
  }, [locationSearchValue.sido]);

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue]);

  return (
    <Box w="100%" h={APP_HEIGHT}>
      <VStack
        w="100%"
        px="18px"
        position={'absolute'}
        top={'56px'}
        zIndex={100}>
        {!isFacilityListExpand && (
          <Pressable
            w="100%"
            bgColor={colors.grayScale['90']}
            borderRadius={8}
            mb="8px"
            style={styles.shadow}
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
          style={styles.shadow}
          locationValue={locationSearchValue}
          setLocationValue={setLocationSearchValue}
          coordinate={coordinate}
          setCoordinate={setCoordinate}
        />

        <HStack justifyContent={'space-between'} w="100%" space={3}>
          <MapFilterButton
            name={FacilityType[filterForm.facility]}
            onPress={onFacilityFilterOpen}
          />
          <MapFilterButton
            name={filterForm.animal || '동물'}
            onPress={onPetSearchOpen}
          />
          <MapFilterButton
            name={FacilitySortType[filterForm.sortType]}
            onPress={onSortTypeFilterOpen}
          />
        </HStack>
      </VStack>

      <WebView
        scrollEnabled={false}
        ref={ref}
        source={{
          uri: 'http://daesodong-map.s3-website.us-east-2.amazonaws.com/',
        }}
        onLoadEnd={() => onMoveMap(coordinate)}
      />

      {/* 맵 필터(시설, 동물, 정렬) 액션시트  */}
      <MapFilter
        isOpen={isFacilityFilterOpen}
        onClose={onFacilityFilterClose}
        onPress={(value: any) =>
          setFilterForm(prev => ({...prev, facility: value}))
        }
        value={filterForm.facility || ''}
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
        value={filterForm.sortType || ''}
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
        setListExpand={setFacilityListExpand}
        isListExpand={isFacilityListExpand}
        isOpen={isFacilityListOpen}
        onClose={onFacilityListClose}
        filterForm={filterForm}
        coordinate={coordinate}
        locationSearchValue={locationSearchValue}
        hasLocationSearchValue={hasLocationSearchValue}
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
  },
});

export default FacilityMain;
