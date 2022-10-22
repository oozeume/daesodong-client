import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test3 from '../pages/test3';
import Test1 from '../pages/test1';
import Test2 from '../pages/test2';
import {Platform} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        name="Test1"
        component={Test1}
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
        name="Test2"
        component={Test1}
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
        name="Test3"
        component={Test1}
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
        name="Test4"
        component={Test2}
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
        screenOptions={{headerShown: false, presentation: 'modal'}}
        initialRouteName="Test1">
        <Stack.Screen name="tab" component={TabNavigator} />
        <Stack.Screen name="test3" component={Test3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
