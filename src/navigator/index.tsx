import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RouteList} from '~/../types/navigator';
import SignupSocial from '~/pages/signup/social';
import FacilityReviewRegister from '~/pages/facility/detail/review/register';
import HospitalReviewRegisterPrecaution from '~/pages/facility/detail/review/register/precaution';

import EmailLogin from '~/pages/login/email';
import PrivacyPolicy from '~/components/signup/privacyPolicy';
import TermsOfServicePolicy from '~/components/signup/termsOfServicePolicy';
import SignUpEmail from '~/pages/signup/email';
import PetInfoRegister from '~/pages/signup/petInfo';
import InitialLogin from '~/pages/login';
import PasswordReset from '~/pages/login/passwordReset';
import CommunityDetail from '~/pages/community/detail';
import FindEmail from '~/pages/login/findEmail';
import CommunityRegister from '~/pages/community/register';
import ContentsDetail from '~/pages/contents/detail';
import OtherContents from '~/pages/contents/otherContents';
import ContentsCommentsList from '~/pages/contents/commentsList';
import ContentsRecommentsList from '~/pages/contents/recommentsList';
import Header from '~/components/common/header/Header';

import BackIcon from '~/assets/icon/back_icon.svg';
import DeleteIcon from '~/assets/icons/delete.svg';
import MyPageNotice from '~/pages/mypage/notice';
import HeaderLeft from '~/components/common/header/HeaderLeft';
import {Text} from 'native-base';
import NoticeDetail from '~/components/mypage/NoticeDetail';
import {colors} from '~/theme/theme';
import MyPageSave from '~/pages/mypage/save';
import TabNavigator from './tab/tabNavigator';
import AuthFoundResult from '~/pages/login/authFoundResult';
import MyPageHeart from '~/pages/mypage/heart';
import MyInfo from '~/pages/mypage/myInfo';
import LoginInfo from '~/components/mypage/myInfo/LoginInfo';
import MyPetInfo from '~/pages/mypage/myPetInfo';
import AppIntroFirst from '~/pages/appIntro/first';
import AppIntroSecond from '~/pages/appIntro/second';
import AppIntroThird from '~/pages/appIntro/third';
import MyReview from '~/pages/mypage/myReview';
import MyReviewDetail from '~/pages/mypage/myReviewDetail';
import MyCommunityContent from '~/pages/mypage/myCommunityContent';
import Inquiry from '~/pages/mypage/inquiry';
import FacilityDetail from '../pages/facility/detail';

const Stack = createNativeStackNavigator<RouteList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'InitialLogin'}>
        <Stack.Screen name="tab" component={TabNavigator} />
        <Stack.Screen
          name="FacilityDetail"
          component={FacilityDetail}
          options={({navigation, route}) => ({
            headerShown: true,
            header: () => (
              <Header
                title={route.params?.facilityName ?? '병원이름'}
                leftButton={<BackIcon onPress={() => navigation.goBack()} />}
              />
            ),
          })}
        />

        <Stack.Screen
          name="FacilityReviewRegister"
          component={FacilityReviewRegister}
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
          name="SignUpEmail"
          component={SignUpEmail}
          options={{animation: 'slide_from_right'}}
        />

        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen
          name="TermsOfServicePolicy"
          component={TermsOfServicePolicy}
        />

        <Stack.Screen name="SignupSocial" component={SignupSocial} />
        <Stack.Screen name="PetInfoRegister" component={PetInfoRegister} />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLogin}
          options={{
            headerShown: true,
            header: props => (
              <Header
                title="이메일로 로그인"
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />

        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="FindEmail" component={FindEmail} />
        <Stack.Screen name="AuthFoundResult" component={AuthFoundResult} />

        <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        <Stack.Screen name="CommunityRegister" component={CommunityRegister} />
        <Stack.Screen
          name="ContentsDetail"
          component={ContentsDetail}
          options={{
            headerShown: true,
            header: props => (
              <Header
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="OtherContents"
          component={OtherContents}
          options={{
            headerShown: true,
            header: props => (
              <Header
                title={'시리즈 이름'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="ContentsCommentsList"
          component={ContentsCommentsList}
          options={{
            headerShown: true,
            header: props => (
              <Header
                title={'댓글 23'}
                rightButton={
                  <DeleteIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="ContentsRecommentsList"
          component={ContentsRecommentsList}
          options={{
            headerShown: true,
            header: props => (
              <Header
                title={'답글 23'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="MyPageNotice"
          component={MyPageNotice}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerBackground: () => <></>,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => <Text>새 알림</Text>,
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="MyPageNoticeDetail"
          component={NoticeDetail}
          options={({navigation}) => ({
            headerShown: true,
            headerBackground: () => <></>,
            headerTitle: '',
            headerStyle: {
              backgroundColor: colors.fussYellow['-40'],
            },
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="MyPageSave"
          component={MyPageSave}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerBackground: () => <></>,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => (
              <Text fontSize={'18px'} fontWeight={'500'}>
                저장
              </Text>
            ),
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen
          name="MyPageHeart"
          component={MyPageHeart}
          options={({navigation}) => ({
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerBackground: () => <></>,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => (
              <Text fontSize={'18px'} fontWeight={'500'}>
                고마워요
              </Text>
            ),
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen
          name="MyInfo"
          component={MyInfo}
          options={({navigation}) => ({
            headerShown: true,
            headerBackground: () => <></>,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => (
              <Text fontSize={'18px'} fontWeight={'500'}>
                내 정보
              </Text>
            ),
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen
          name="MyPetInfo"
          component={MyPetInfo}
          options={({navigation}) => ({
            headerShown: true,
            headerBackground: () => <></>,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => (
              <Text fontSize={'18px'} fontWeight={'500'}>
                아이정보
              </Text>
            ),
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen
          name="MyReview"
          component={MyReview}
          options={props => ({
            headerShown: true,
            header: () => (
              <Header
                title={'내가 작성한 리뷰'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="MyReviewDetail"
          component={MyReviewDetail}
          options={() => ({
            headerShown: true,
            header: ({navigation}) => (
              <Header
                title={'내가 작성한 리뷰'}
                leftButton={<BackIcon onPress={() => navigation.goBack()} />}
              />
            ),
          })}
        />

        <Stack.Screen
          name="MyCommunityContent"
          component={MyCommunityContent}
          options={() => ({
            headerShown: true,
            header: props => (
              <Header
                title={'내가 작성한 게시글'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          })}
        />

        <Stack.Screen
          name="Inquiry"
          component={Inquiry}
          options={() => ({
            headerShown: true,
            header: props => (
              <Header
                title={'1:1 문의'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          })}
        />

        <Stack.Screen
          name="MyLoginInfo"
          component={LoginInfo}
          options={({navigation}) => ({
            headerShown: true,
            headerBackground: () => <></>,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerStyle: {backgroundColor: 'white'},
            headerTitle: () => (
              <Text fontSize={'18px'} fontWeight={'500'}>
                로그인 정보
              </Text>
            ),
            headerLeft: props => (
              <HeaderLeft {...props} navigation={navigation} />
            ),
          })}
        />

        <Stack.Screen
          name="AppIntroFirst"
          component={AppIntroFirst}
          options={() => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="AppIntroSecond"
          component={AppIntroSecond}
          options={() => ({
            headerShown: false,
            animation: 'slide_from_right',
          })}
        />

        <Stack.Screen
          name="AppIntroThird"
          component={AppIntroThird}
          options={() => ({
            headerShown: false,
            animation: 'slide_from_right',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
