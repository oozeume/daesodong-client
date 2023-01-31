import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FacilityInfo from './info';
import HospitalReview from './review';
import {RootStackParamList} from '~/../types/navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Hospital'>;

const HostpitalTab = createMaterialTopTabNavigator();

/**
 * 시설 정보, 후기 페이지
 */

function Facility({route}: Props) {
  const {facilityId} = route.params;
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
          component={FacilityInfo}
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

export default Facility;
