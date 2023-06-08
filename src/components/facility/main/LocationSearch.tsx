import {HStack, Pressable, Text} from 'native-base';
import React, {useEffect} from 'react';
import LocationFillIcon from '~/assets/icon/location_fill.svg';
import {colors} from '~/theme/theme';
import {useGetLocation} from '~/api/facility/queries';
import Geolocation from 'react-native-geolocation-service';
import {hangjungdong} from '~/utils/hangjungdong';
import {CoordinateType, LocationInfoType} from '~/../types/facility';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {SetState} from '~/../types/common';

interface Props {
  onPress: () => void;
  style: any;
  locationValue: LocationInfoType;
  setLocationValue: SetState<LocationInfoType>;
  coordinate: CoordinateType;
  setCoordinate: SetState<CoordinateType>;
}

/**
 *@description 시설 메인 > 위치 검색바
 */

function LocationSearch({
  onPress,
  style,
  locationValue,
  setLocationValue,
  coordinate,
  setCoordinate,
}: Props) {
  const {sido, sigugun} = hangjungdong;

  const {data: locationInfo} = useGetLocation(
    coordinate,
    coordinate.latitude !== 0 && coordinate.longitude !== 0,
  );

  useEffect(() => {
    if (locationInfo) {
      const userSido = locationInfo.data.results[0].region.area1.name;
      const userSigugun = locationInfo.data.results[0].region.area2.name;

      const siValue = sido.find(i => i.name.includes(userSido));
      const gunValue = sigugun.find(i => i.name === userSigugun);

      if (siValue && gunValue) {
        setLocationValue({
          sido: siValue,
          sigugun: gunValue,
        });
      }
    }
  }, [locationInfo]);

  useEffect(() => {
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const locationPermission = async () => {
      try {
        const result = await check(platformPermissions);

        if (result !== RESULTS.GRANTED) {
          if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('always');
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
          }
        } else {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setCoordinate({
                latitude,
                longitude,
              });
            },
            error => {
              Alert.alert('앱을 다시 실행해주세요.');
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      } catch {
        Alert.alert('앱을 다시 실행해주세요.');
      }
    };

    locationPermission();
  }, []);

  if (!locationInfo) {
    return null;
  }

  return (
    <Pressable w="100%" onPress={onPress} mb="8px" style={style}>
      <HStack alignItems={'center'} h="44px" pl="14px" pr="10px" w="100%">
        <LocationFillIcon width={18} height={18} fill={colors.grayScale[80]} />

        <Text ml="4px" fontSize={'14px'} color={colors.grayScale['80']}>
          {`${locationValue?.sido.name} ${locationValue?.sigugun.name}`}
        </Text>
      </HStack>
    </Pressable>
  );
}

export default LocationSearch;
