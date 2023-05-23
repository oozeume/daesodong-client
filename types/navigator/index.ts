import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Review from '~/model/facilityReview';
import {FacilityReviewParams} from '../facility';
import {AuthFoundResultParams, PasswordResetPreviousPage} from '../login';

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
  FacilityInfo: {
    id: string;
  };
  FacilityReview: {
    id: string;
    facilityName: string;
  };
  Contents: undefined;
  Commuity: undefined;
  MyPage: undefined;
};

/**
 * @description Stack.Navigator에 등록된 stack list
 * @example param 추가시,
 * { ... Hospital: { id: string; }; ... }
 */
export type RootStackParamList = {
  FacilityDetail: FacilityReviewParams;
  tab: undefined;
  FacilityReviewRegister: FacilityReviewParams;
  FacilityReviewEdit: {
    review: Review;
    reviewId: string;
    facilityId: string;
    facilityName: string;
  };
  TagRegister: undefined;
  HospitalReviewRegisterPrecaution: undefined;
  InitialLogin: undefined;

  EmailLogin: undefined;
  PasswordReset: {
    type: PasswordResetPreviousPage;
  };
  PasswordResetSuccess: undefined;
  AuthFoundResult: AuthFoundResultParams;
  FindEmail: undefined;

  SignupSocial: undefined;
  SignUpEmailNavigator: undefined;
  PetInfoRegister: undefined;

  Community: undefined;
  CommunityDetail: {id: string};
  CommunityRegister?: {postId?: string};

  ContentsDetail: {id: string};
  OtherContents: undefined;
  ContentsCommentsList: undefined;
  ContentsRecommentsList: undefined;
  ContentsMain: undefined;

  MyPageNotice: undefined;
  MyPageNoticeDetail: undefined;
  MyPageSave: undefined;
  MyPageHeart: undefined;
  MyInfo: undefined;
  MyPetInfo: undefined;
  MyLoginInfo: undefined;
  BlockedAccounts: undefined;
  FacilityRecommendation: undefined;

  AppIntroFirst: undefined;
  AppIntroSecond: undefined;
  AppIntroThird: undefined;

  PhoneVerification: undefined;
  EmailRegister: undefined;
  PasswordRegister: undefined;
  NicknameRegister: undefined;

  MyReview: undefined;
  MyReviewDetail: undefined;
  MyCommunityContent: undefined;
  Inquiry: undefined;

  SignupPetInfoNavigator: undefined;
  ChoiceGenderRegister: undefined;
  PetOwnerBirthRegister: undefined;
  PetNameRegister: undefined;
  PetTypeRegister: undefined;
  PetBirthRegister: undefined;
  PetGenderRegister: undefined;
  AddressRegister: undefined;
  AnyQuestionRegister: undefined;
  PetImageRegister: undefined;
  PetInfoRegisterOutro: {petName: string};
};

export type SignupNavigatorRouteList =
  | 'PhoneVerification'
  | 'EmailRegister'
  | 'PasswordRegister'
  | 'EmailLogin';

export type PetInfoRegisterNavigatorRouteList =
  | 'ChoiceGenderRegister'
  | 'EmailLogin'
  | 'PetNameRegister'
  | 'PetTypeRegister'
  | 'PetBirthRegister'
  | 'PetGenderRegister'
  | 'AddressRegister'
  | 'AnyQuestionRegister'
  | 'PetImageRegister'
  | 'PetOwnerBirthRegister';

export type RouteList = RootTabParamList & RootStackParamList;

/**
 * @description useNavigation 제네릭 타입
 * @example
 * const navigation = useNavigation<NavigationProp<RouteList>>();
 */
export type NavigationHookProp = NavigationProp<RouteList>;

export type RouteHookProp<T extends keyof RootStackParamList> = RouteProp<
  RouteList,
  T
>;

export type StackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<ParamListBase, T>;

// export type TabProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
// RootTabParamList,
//   T
// >;

// export type TabProps<T extends keyof RootTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, T>,
//   StackProps<keyof RootStackParamList>
// >;
