import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RouteList} from '~/../types/navigator';

import FacilityTabIcon from '~/assets/icons/facility_tab';
import ContentsTabIcon from '~/assets/icons/contents_tab';
import CommunityTabIcon from '~/assets/icons/community_tab';
import MypageTabIcon from '~/assets/icons/mypage_tab';

import ContentsMain from '~/pages/contents/main';
import {colors} from '~/theme/theme';
import FacilityMain from '~/pages/facility/main';
import MyPage from '~/pages/mypage';
import CommunityMain from '~/pages/community';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RouteList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Facility"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 98,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: colors.fussOrange[0],
        tabBarInactiveTintColor: colors.grayScale[30],
        tabBarLabelStyle: {
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: 10,
          marginBottom: Platform.OS === 'android' ? 40 : 10,
          lineHeight: Platform.OS === 'android' ? 14 : 14,
        },
        tabBarIconStyle: {
          width: 24,
          maxHeight: 24,
          marginBottom: 4,
        },
      }}>
      <Tab.Screen
        name="Facility"
        component={FacilityMain}
        options={{
          tabBarLabel: '시설 정보',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <FacilityTabIcon
                fill={focused ? colors.fussOrange[0] : colors.grayScale[40]}
                subFill={focused ? colors.fussYellow[0] : colors.grayScale[30]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Contents"
        component={ContentsMain}
        options={{
          tabBarLabel: '콘텐츠',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <ContentsTabIcon
              fill={focused ? colors.fussOrange[0] : colors.grayScale[40]}
              subFill={focused ? colors.fussYellow[0] : colors.grayScale[30]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Commuity"
        component={CommunityMain}
        options={{
          tabBarLabel: '커뮤니티',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <CommunityTabIcon
              fill={focused ? colors.fussOrange[0] : colors.grayScale[40]}
              subFill={focused ? colors.fussYellow[0] : colors.grayScale[30]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: '내 계정',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <MypageTabIcon
              fill={focused ? colors.fussOrange[0] : colors.grayScale[40]}
              subFill={focused ? colors.fussYellow[0] : colors.grayScale[30]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
