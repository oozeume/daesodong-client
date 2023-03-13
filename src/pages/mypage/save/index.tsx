import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Facility from '~/components/mypage/save/facility';
import MyPageSaveHeader from '~/components/mypage/save/MyPageSaveHeader';
import Contents from '~/components/mypage/save/contents';
import Community from '~/components/mypage/save/community';

const ShoppingTab = createMaterialTopTabNavigator();

/**
 *@description 내 계정 - 저장
 */

function MypageSave() {
  return (
    <ShoppingTab.Navigator
      tabBar={props => <MyPageSaveHeader {...props} />}
      screenOptions={{swipeEnabled: true, animationEnabled: true}}
      initialRouteName="Facility">
      <ShoppingTab.Screen
        name={'Facility'}
        component={Facility}
        options={{
          title: '시설',
        }}
      />
      <ShoppingTab.Screen
        name="Contents"
        component={Contents}
        options={{
          title: '콘텐츠',
        }}
      />
      <ShoppingTab.Screen
        name="Community"
        component={Community}
        options={{
          title: '커뮤니티',
        }}
      />
    </ShoppingTab.Navigator>
  );
}

export default MypageSave;
