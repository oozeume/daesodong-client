import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  KeyboardEvent,
  EmitterSubscription,
  Alert,
} from 'react-native';

/**
 *@description 현재 ios만 적용되고 android는 적용이 안되는 이슈가 있음
 *@return height - 키보드 높이
 */
function useGetKeyboardHeight() {
  const [height, setHeight] = useState(0); // 키보드 높이
  const subscriptions = useRef<EmitterSubscription[]>();

  useEffect(() => {
    function onKeyboardChange(event: KeyboardEvent) {
      if (
        event.startCoordinates &&
        event.endCoordinates.screenY <= event.startCoordinates.screenY
      )
        // 키보드 On일 때, 키보드 높이 받아옴
        setHeight(event.endCoordinates.height);
      else setHeight(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', event => onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', event => onKeyboardChange),
      ];
    }
    return () => {
      if (subscriptions.current)
        subscriptions.current.forEach(subscription => {
          subscription.remove();
        });
    };
  }, [setHeight, subscriptions]);

  return height;
}

export default useGetKeyboardHeight;
