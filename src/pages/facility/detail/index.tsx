import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FacilityInfo from './info';
import FacilityReview from './review';
import {RootStackParamList} from '~/../types/navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'FacilityDetail'>;

const FaciltiyTab = createMaterialTopTabNavigator();

/**
 * 시설 상세 페이지
 */

function FacilityDetail({route}: Props) {
  const {id} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FaciltiyTab.Navigator
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
        <FaciltiyTab.Screen
          name={'FacilityInfo'}
          component={() => <FacilityInfo id={id} />}
          options={{title: '시설 정보'}}
        />
        <FaciltiyTab.Screen
          name={'FacilityReview'}
          component={FacilityReview}
          options={{title: '후기'}}
        />
      </FaciltiyTab.Navigator>
    </SafeAreaView>
  );
}

export default FacilityDetail;
