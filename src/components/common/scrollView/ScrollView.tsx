import React from 'react';
import {ScrollViewProps, ViewStyle} from 'react-native';
import {
  ScrollView as GestureScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function ScrollView(props: ScrollViewProps) {
  return (
    <GestureHandlerRootView>
      <GestureScrollView {...props} />
    </GestureHandlerRootView>
  );
}

export default ScrollView;
