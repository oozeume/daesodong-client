import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 *@description 보안 수준이 있어야하는 데이터 저장
 */
export function setSecurityData(key: string, data: string | object) {
  return EncryptedStorage.setItem(
    key,
    typeof data === 'string' ? data : JSON.stringify(data),
  );
}

/**
 *@description 보안 수준이 있어야하는 데이터 조회
 */
export function getSecurityData(key: string) {
  return EncryptedStorage.getItem(key);
}

/**
 *@description 보안 수준이 있어야하는 데이터 제거
 */
export function removeSecurityData(key: string) {
  return EncryptedStorage.removeItem(key);
}

/**
 *@description 일반적인 앱 내부 데이터 저장
 */
export function setData(key: string, data: string | object) {
  return AsyncStorage.setItem(
    key,
    typeof data === 'string' ? data : JSON.stringify(data),
  );
}

/**
 *@description 일반적인 앱 내부 데이터 조회
 */
export function getData(key: string) {
  return AsyncStorage.getItem(key);
}

/**
 *@description 일반적인 앱 내부 데이터 제거
 */
export function removeData(key: string) {
  return AsyncStorage.removeItem(key);
}
