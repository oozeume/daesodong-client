import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {WebView} from 'react-native-webview';
import {APP_HEIGHT} from '~/utils/dimension';
import {Box, HStack, Pressable, Text, useDisclose, VStack} from 'native-base';
import {colors} from '~/theme/theme';
import RightIcon from '~/assets/icons/right.svg';
import LocationFillIcon from '~/assets/icon/location_fill.svg';
import FilterIcon from '~/assets/icons/filter.svg';
import MapFilter from '~/components/facility/main/MapFilter';
import {
  FACILITY_SORT_TYPE,
  FACILITY_TYPE_LIST,
} from '~/constants/facility/main';
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
import {FormState} from '~/../types/facility';
import {SpeciesData} from '~/../types/api/species';

/**
 *@description 컨텐츠 메인 페이지
 */
const FacilityMain = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const ref = useRef<WebView | null>(null);

  const {sido, sigugun} = hangjungdong;
  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>(sido[0]);
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>(
    sigugun[0],
  );
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
    facility: undefined,
    animal: undefined,
    sortType: undefined,
  };

  const [filterForm, setFilterForm] = useState(initFormState);

  const [isFacilityListExpand, setFacilityListExpand] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petType, setPetType] = useState<SpeciesData>();

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

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue, sigugun]);

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
            onPress={() => {
              onMarkerMap();
              // onMoveMap({latitude: 37.5645, longitude: 126.8505});
            }}>
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

        <Pressable
          w="100%"
          onPress={() => setIsModalVisible(true)}
          mb="8px"
          style={styles.shadow}>
          <HStack
            alignItems={'center'}
            h="44px"
            pl="14px"
            pr="10px"
            w="100%"
            borderRadius={8}
            bgColor={colors.grayScale['0']}>
            <LocationFillIcon
              width={18}
              height={18}
              fill={colors.fussOrange[0]}
            />

            <Text ml="4px" fontSize={'14px'} color={colors.grayScale['80']}>
              {`${sidoValue?.name} ${sigugunValue?.name}`}
            </Text>
          </HStack>
        </Pressable>

        <HStack justifyContent={'space-between'} w="100%" space={3}>
          <MapFilterButton
            name={filterForm.facility || '시설'}
            onPress={onFacilityFilterOpen}
          />
          <MapFilterButton
            name={filterForm.animal || '동물'}
            onPress={onPetSearchOpen}
          />
          <MapFilterButton
            name={filterForm.sortType || '정렬'}
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
        onLoadEnd={onInitMap}
      />

      {/* 맵 필터(시설, 동물, 정렬) 액션시트  */}
      <MapFilter
        isOpen={isFacilityFilterOpen}
        onClose={onFacilityFilterClose}
        setValue={value => setFilterForm(prev => ({...prev, facility: value}))}
        value={filterForm.facility || ''}
        title="시설"
        itemList={FACILITY_TYPE_LIST}
      />

      {/* 동물 검색 모달 */}
      <PetTypeSelectModal
        isOpen={isPetSearchOpen}
        onClose={onPetSearchClose}
        setPetType={setPetType}
        onPress={() => {}}
      />

      <MapFilter
        isOpen={isSortTypeFilterOpen}
        onClose={onSortTypeFilterClose}
        setValue={value => setFilterForm(prev => ({...prev, sortType: value}))}
        value={filterForm.sortType || ''}
        title="정렬"
        itemList={FACILITY_SORT_TYPE}
      />

      <ListViewChangeButton
        icon={<FilterIcon />}
        name="목록보기"
        onPress={onFacilityListOpen}
      />

      {/* 시 군 구 선택 팝업창 */}
      <PositionPopup
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOK={() => setIsModalVisible(false)}
        onSidoPress={onSidoOpen}
        onSigunguPress={onSigugunOpen}
        sidoValue={sidoValue}
        sigugunValue={sigugunValue}
      />

      {/* 시 선택 drawer */}
      <AddressDrawer
        isOpen={isSidoOpen}
        onClose={onSidoClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue}
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
        sigugunValue={sigugunValue}
      />

      {/* 이용할 수 있는 시설 리스트 */}
      <FacilityList
        setListExpand={setFacilityListExpand}
        isListExpand={isFacilityListExpand}
        isOpen={isFacilityListOpen}
        onClose={onFacilityListClose}
        itemList={['', '', '', '', '', '', '', '', '', '']}
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
