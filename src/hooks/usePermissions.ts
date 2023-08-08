import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';

/**
 *@description 위치 권한을 확인하는 훅
 */

function usePermissions() {
  const [isGranted, setGranted] = useState(true);

  useEffect(() => {
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const locationPermission = async () => {
      const result = await check(platformPermissions);
      setGranted(result === RESULTS.GRANTED);
    };

    locationPermission();
  }, []);

  return isGranted;
}

export default usePermissions;
