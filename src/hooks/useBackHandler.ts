import React, {useEffect, useRef} from 'react';
import useToastShow from './useToast';
import {BackHandler} from 'react-native';

/**
 *@description 안드로이드 뒤로가기 두번 누를 경우 로직 훅
 */
function useBackHandler() {
  const doubleClickTimeoutCheckRef = useRef<number | null>(null);
  const doubleClickRef = useRef(false);
  const {toastShow} = useToastShow();

  // 뒤로가기 두 번시, 앱 종료 이벤트
  const onDoubleClickBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료

    if (!doubleClickRef.current) {
      toastShow('한 번 더 뒤로 스와이프 하면 앱이 종료돼요.');
      doubleClickRef.current = true;

      doubleClickTimeoutCheckRef.current = setTimeout(
        () => {
          doubleClickRef.current = false;
        },
        2000, // 2초
      );
    } else {
      if (doubleClickTimeoutCheckRef.current)
        clearTimeout(doubleClickTimeoutCheckRef.current);

      BackHandler.exitApp(); // 앱 종료
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onDoubleClickBackButton);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onDoubleClickBackButton,
      );
    };
  }, []);

  return;
}

export default useBackHandler;
