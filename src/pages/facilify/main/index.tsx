import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {WebView} from 'react-native-webview';
import {APP_HEIGHT} from '~/utils/dimension';
import {Pressable, Text} from 'native-base';

/**
 *@description 컨텐츠 메인 페이지
 */
const FacilityMain = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const ref = useRef<WebView | null>(null);

  const onInitMap = () => {
    ref.current?.postMessage(JSON.stringify({success: true, type: 'init'}));
  };

  const onMoveMap = (coordinates: {latitude: number; longitude: number}) => {
    console.log('MOVE');
    ref.current?.postMessage(
      JSON.stringify({success: true, type: 'move', ...coordinates}),
    );
  };

  const onSearchMap = () => {
    ref.current?.postMessage(JSON.stringify({success: true, type: 'search'}));
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: APP_HEIGHT - 80,
      }}>
      <WebView
        ref={ref}
        source={{
          uri: 'http://daesodong-map.s3-website.us-east-2.amazonaws.com/',
        }}
        // source={{uri: 'https://reactnative.dev/'}}
        style={{
          width: '100%',
          height: APP_HEIGHT - 80,
        }}
      />

      <Pressable
        onPress={() => onMoveMap({latitude: 37.5645, longitude: 126.8505})}
        w="80px"
        h="44px"
        bgColor={'#fff'}
        borderWidth={1}
        position="absolute"
        top={'60px'}
        right={'10px'}
        zIndex={4}>
        <Text>장소1</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FacilityMain;
