import React from 'react';
import {FlatListProps, ViewStyle} from 'react-native';
import {
  FlatList as GestureFlatList,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function FlatList(props: FlatListProps<any>) {
  return (
    <GestureHandlerRootView>
      <GestureFlatList {...props} />
    </GestureHandlerRootView>
  );
}

export default FlatList;
