import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParmList} from '~/navigator';
// import type {StackScreenProps} from '@react-navigation/native-stack';

export type StackProps<T extends keyof RootStackParamList> =
  // NativeStackScreenProps<RootStackParamList, T>;
  NativeStackScreenProps<ParamListBase, T>;

// export type TabProps<T extends keyof RootTabParmList> = BottomTabScreenProps<
// RootTabParmList,
//   T
// >;

// export type TabProps<T extends keyof RootTabParmList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParmList, T>,
//   StackProps<keyof RootStackParamList>
// >;
