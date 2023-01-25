import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Center, HStack, Text, View} from 'native-base';
import {ParamListBase, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HospitalInfo from './info';
import {colors} from '~/theme/theme';
import HospitalReview from './review';
import HospitalInfoFooter from '~/components/hospital/info/HospitalInfoFooter';

import BackIcon from '../../assets/icon/back_icon.svg';
import ShareIcon from '../../assets/icon/share_line_icon.svg';
import FacilityDetail from '~/components/hospital/info/FacilityDetail';
import ReviewDetail from '~/components/hospital/review/ReviewDetail';
import {RootStackParamList} from '~/../types/navigator';

type TabType = 'Info' | 'Review';
type Props = NativeStackScreenProps<RootStackParamList, 'Hospital'>;

const HostpitalTab = createMaterialTopTabNavigator();

/**
 * 병원 시설 정보, 후기 페이지
 */

function Hospital({route}: Props) {
  const {facilityId} = route.params;
  console.log('시설 정보 아이디 잘 들어오는지', facilityId);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HostpitalTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 16},
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
          },
          tabBarItemStyle: {
            marginHorizontal: 18,
          },
          tabBarStyle: {
            backgroundColor: 'white',
            borderColor: 'black',
            marginHorizontal: 18,
          },
          swipeEnabled: true,
        }}
        tabBarPosition={'top'}
        initialRouteName="Facility">
        <HostpitalTab.Screen
          name={'Facility'}
          initialParams={{facilityId: facilityId}}
          component={HospitalInfo}
          options={{title: '시설 정보'}}
        />
        <HostpitalTab.Screen
          name={'Review'}
          component={HospitalReview}
          options={{
            title: '후기',
          }}
        />
      </HostpitalTab.Navigator>
    </SafeAreaView>
  );
}

export default Hospital;
