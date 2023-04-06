import {HStack, Pressable, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import LocationFillIcon from '~/assets/icon/location_fill.svg';
import {colors} from '~/theme/theme';
import {useGetLocation} from '~/api/facility/queries';
import Geolocation from 'react-native-geolocation-service';
import {hangjungdong} from '~/utils/hangjungdong';

interface Props {
  onPress: () => void;
  style: any;
  locationValue: any;
  setLocationValue: any;
}

/**
 *@description 시설 메인 > 위치 검색바
 */

function LocationSearch({
  onPress,
  style,
  locationValue,
  setLocationValue,
}: Props) {
  const {sido, sigugun} = hangjungdong;
  const [coordinate, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [availableLocation, setAvailableLocation] = useState(false);
  const {data: locationInfo} = useGetLocation(coordinate, availableLocation);

  useEffect(() => {
    if (locationInfo) {
      const userSido =
        locationInfo.data.documents[0].address.region_1depth_name;
      const userSigugun =
        locationInfo.data.documents[0].address.region_2depth_name;

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
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        setAvailableLocation(true);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <Pressable w="100%" onPress={onPress} mb="8px" style={style}>
      <HStack
        alignItems={'center'}
        h="44px"
        pl="14px"
        pr="10px"
        w="100%"
        borderRadius={8}
        bgColor={colors.grayScale['0']}>
        <LocationFillIcon width={18} height={18} fill={colors.fussOrange[0]} />

        <Text ml="4px" fontSize={'14px'} color={colors.grayScale['80']}>
          {`${locationValue?.sido.name} ${locationValue?.sigugun.name}`}
        </Text>
      </HStack>
    </Pressable>
  );
}

export default LocationSearch;
