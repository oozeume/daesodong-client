import {NavigationProp, ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormType} from '../community';

/**
 * @description script 설명
 * stack 라이브러리 제네릭이 type 형식이라 interface 대신 type으로 작성
 *
 * @Todo CompositeScreenProps 으로 탭, 스택읇 병합한 타입 형식 구조 개발
 */

/**
 * @description Tab.Navigator에 등록된 tab list
 * @Use Tab.Navigator에 탭 추가시 하단에 추가
 * @example param 추가시,
 * { ... Home: { id: string; }; ... }
 */
export type RootTabParamList = {
  Home: undefined;
  Contents: undefined;
  Commuity: undefined;
  MyPage: undefined;
  DeveloperMenu: undefined;
};

/**
 * @description Stack.Navigator에 등록된 stack list
 * @example param 추가시,
 * { ... Hospital: { id: string; }; ... }
 */
export type RootStackParamList = {
  Hospital: undefined;
  tab: undefined;
  HospitalReviewRegister: undefined;
  HospitalReviewRegisterPrecaution: undefined;
  InitialLogin: undefined;

  EmailLogin: undefined;
  PasswordReset: undefined;
  PasswordResetNotFoundAuth: undefined;
  FindEmail: undefined;

  TermsOfServicePolicy: undefined;
  PrivacyPolicy: undefined;
  SignupSocial: undefined;
  SignUpEmail: undefined;
  PetInfoRegister: undefined;

  Community: undefined;
  CommunityDetail: undefined;
  CommunityRegister?: FormType;

  ContentsDetail: undefined;
  OtherContents: undefined;
  ContentsCommentsList: undefined;
  ContentsRecommentsList: undefined;
  ContentsMain: undefined;

  MyPageNotice: undefined;
  MyPageNoticeDetail: undefined;
  MyPageSave: undefined;
  FacilityMain: undefined;
  MyPageHeart: undefined;
  MyInfo: undefined;
  MyPetInfo: undefined;
  MyLoginInfo: undefined;
};

export type RouteList = RootTabParamList & RootStackParamList;

/**
 * @description useNavigation 제네릭 타입
 * @example
 * const navigation = useNavigation<NavigationProp<RouteList>>();
 */
export type NavigationHookProp = NavigationProp<RouteList>;

export type StackProps<T extends keyof RouteList> = NativeStackScreenProps<
  ParamListBase,
  T
>;

// export type TabProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
// RootTabParamList,
//   T
// >;

// export type TabProps<T extends keyof RootTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, T>,
//   StackProps<keyof RootStackParamList>
// >;
