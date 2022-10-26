import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../pages/home';
import Hospital from '../pages/hospital';
import Contents from '../pages/contents';
import Community from '../pages/community';
import MyPage from '../pages/mypage';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import HospitalReviewRegister from '~/pages/hospital/review/register';
import HospitalReviewRegisterPrecaution from '~/pages/hospital/review/register/precaution';

export type RootTabParmList = {
  Home: undefined;
  Contents: undefined;
  Commuity: undefined;
  HospitalReviewRegister: undefined;
  MyPage: undefined;
};

// 네비게이션 라우트 맵핑
export type RootStackParamList = {
  Home: undefined;
  Hospital: undefined;
  Contents: undefined;
  Commuity: undefined;
  tab: undefined;

  HospitalReviewRegister: undefined;
  HospitalReviewRegisterPrecaution: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 98,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#E1E2E4',

        tabBarLabelStyle: {
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: 10,
          marginBottom: Platform.OS === 'android' ? 14 : 0,
          lineHeight: Platform.OS === 'android' ? 14 : 14,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '시설 정보',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <FeatherIcon name={'map-pin'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Contents"
        component={Contents}
        options={{
          tabBarLabel: '콘텐츠',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <FontAwesome5Icon name={'book'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Commuity"
        component={Community}
        options={{
          tabBarLabel: '커뮤니티',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name={'comments'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        // name="MyPage"
        // component={MyPage}
        name="HospitalReviewRegister"
        component={HospitalReviewRegister}
        options={{
          tabBarLabel: '내 계정',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon name={'user'} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="tab">
        <Stack.Screen name="tab" component={TabNavigator} />
        <Stack.Screen name="Hospital" component={Hospital} />
        <Stack.Screen
          name="HospitalReviewRegisterPrecaution"
          component={HospitalReviewRegisterPrecaution}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
