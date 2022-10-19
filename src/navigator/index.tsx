import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test3 from '../pages/test3';
import Test1 from '../pages/test1';
import Test2 from '../pages/test2';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: '#28282c',
          height: 49,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: '#40c4ff',
        tabBarInactiveTintColor: '#fff',

        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
          marginBottom: Platform.OS === 'android' ? 14 : 0,
          lineHeight: Platform.OS === 'android' ? 20 : 20,
        },

        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen
        name="Test1"
        component={Test1}
        options={{
          tabBarLabel: 'Test1',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Test2"
        component={Test2}
        options={{
          tabBarLabel: 'Test2',
          headerShown: false,
          unmountOnBlur: true,
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
