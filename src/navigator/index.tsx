import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RouteList} from '~/../types/navigator';
import Home from '../pages/home';
import Hospital from '../pages/hospital';
import Contents from '../pages/contents';
import Community from '../pages/community';
import MyPage from '../pages/mypage';
import InitialLogin from '~/pages/login';
import SignupEmail from '~/pages/signup/email';
import SignupSocial from '~/pages/signup/social';
import DeveloperMenu from '~/pages/developerMenu';
import HospitalReviewRegister from '~/pages/hospital/review/register';
import HospitalReviewRegisterPrecaution from '~/pages/hospital/review/register/precaution';
import UserIcon from '../assets/icon/nav_user_icon.svg';
import LocationIcon from '../assets/icon/nav_location_icon.svg';
import ContentsIcon from '../assets/icon/nav_contents_icon.svg';
import CommunityIcon from '../assets/icon/nav_community_icon.svg';
import EmailLogin from '~/pages/login/email';
import PasswordResetPhoneCheck from '~/pages/login/passwordReset/phoneCheck';
import PasswordResetChange from '~/pages/login/passwordReset/change';
import PasswordResetSuccess from '~/pages/login/passwordReset/success';
import PasswordResetNotFoundAuth from '~/pages/login/passwordReset/notFoundAuth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RouteList>();

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
        name="DeveloperMenu"
        component={DeveloperMenu}
        options={{
          tabBarLabel: '개발',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => <UserIcon fill={'#000'} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '시설 정보',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => <LocationIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Contents"
        component={Contents}
        options={{
          tabBarLabel: '콘텐츠',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => <ContentsIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Commuity"
        component={Community}
        options={{
          tabBarLabel: '커뮤니티',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => <CommunityIcon fill={color} />,
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: '내 계정',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({color}) => <UserIcon fill={color} />,
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
          name="HospitalReviewRegister"
          component={HospitalReviewRegister}
        />
        <Stack.Screen
          name="HospitalReviewRegisterPrecaution"
          component={HospitalReviewRegisterPrecaution}
        />
        <Stack.Screen
          name="InitialLogin"
          component={InitialLogin}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SignupEmail"
          component={SignupEmail}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen name="SignupSocial" component={SignupSocial} />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLogin}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="PasswordResetPhoneCheck"
          component={PasswordResetPhoneCheck}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="PasswordResetChange"
          component={PasswordResetChange}
        />
        <Stack.Screen
          name="PasswordResetSuccess"
          component={PasswordResetSuccess}
        />
        <Stack.Screen
          name="PasswordResetNotFoundAuth"
          component={PasswordResetNotFoundAuth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
