import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RouteList} from '~/../types/navigator';
import FacilityReviewRegister from '~/pages/facility/detail/review/register';
import HospitalReviewRegisterPrecaution from '~/pages/facility/detail/review/register/precaution';

import EmailLogin from '~/pages/login/email';
import SignUpEmailNavigator from '~/pages/signup/emailNavigator';
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

import BackIcon from '~/assets/icons/back.svg';
import ShareIcon from '~/assets/icons/share_fill.svg';
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
import MyReview from '~/pages/mypage/myReview';
import MyReviewDetail from '~/pages/mypage/myReviewDetail';
import MyCommunityContent from '~/pages/mypage/myCommunityContent';
import Inquiry from '~/pages/mypage/inquiry';
import PasswordResetSuccess from '~/pages/login/passwordReset/success';
import SignupPetInfoNavigator from '~/pages/signup/petInfoNavigator';
import PetInfoRegisterOutro from '~/pages/signup/petInfoRegister/outro';
import FacilityDetail from '../pages/facility/detail';
import TagRegister from '~/pages/facility/detail/review/register/tagRegister';
import FacilityReviewEdit from '~/pages/facility/detail/review/edit';
import BlockedAccounts from '~/pages/mypage/blockedAccounts';
import FacilityRecommendation from '~/pages/mypage/facilityRecommendation';
import SignupSocialNavigator from '~/pages/signup/socialNavigator';
import useFixFontSize from '~/hooks/useFixFontSize';
import AppIntro from '~/pages/appIntro';

const Stack = createNativeStackNavigator<RouteList>();

const AppNavigator = () => {
  useFixFontSize(); // 글자 크기 고정

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
                title={route.params?.facilityName ?? ''}
                leftButton={<BackIcon onPress={() => navigation.goBack()} />}
                rightButton={<ShareIcon onPress={() => {}} />}
              />
            ),
          })}
        />

        <Stack.Screen
          name="FacilityReviewRegister"
          component={FacilityReviewRegister}
        />

        <Stack.Screen
          name="FacilityReviewEdit"
          component={FacilityReviewEdit}
        />

        <Stack.Screen
          name="TagRegister"
          component={TagRegister}
          options={({navigation}) => ({
            headerShown: true,
            header: () => (
              <Header
                title={'진단 내용'}
                leftButton={<BackIcon onPress={() => navigation.goBack()} />}
              />
            ),
          })}
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
          name="SignUpEmailNavigator"
          component={SignUpEmailNavigator}
          options={{animation: 'slide_from_right'}}
        />

        <Stack.Screen
          name="SignupPetInfoNavigator"
          component={SignupPetInfoNavigator}
          options={{animation: 'slide_from_right'}}
        />

        <Stack.Screen
          name="PetInfoRegisterOutro"
          component={PetInfoRegisterOutro}
          options={{animation: 'slide_from_right', headerShown: false}}
        />

        <Stack.Screen
          name="SignupSocialNavigator"
          component={SignupSocialNavigator}
        />
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

        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={({route}) => ({
            headerShown: true,
            header: props => (
              <Header
                title={'비밀번호 재설정'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          })}
        />

        <Stack.Screen
          name="PasswordResetSuccess"
          component={PasswordResetSuccess}
          options={({route}) => ({
            headerShown: true,
            header: props => (
              <Header
                title={''}
                leftButton={
                  <BackIcon
                    onPress={() => props.navigation.navigate('EmailLogin')}
                  />
                }
              />
            ),
          })}
        />

        <Stack.Screen
          name="FindEmail"
          component={FindEmail}
          options={{
            headerShown: true,
            header: props => (
              <Header
                title="이메일 찾기"
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
            ),
          }}
        />
        <Stack.Screen name="AuthFoundResult" component={AuthFoundResult} />

        <Stack.Screen
          name="CommunityDetail"
          component={CommunityDetail}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="CommunityRegister"
          component={CommunityRegister}
          options={{
            headerShown: false,
          }}
        />
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
          name="BlockedAccounts"
          component={BlockedAccounts}
          options={({navigation}) => ({
            headerShown: true,
            header: props => (
              <Header
                title={'차단계정 관리'}
                leftButton={
                  <BackIcon onPress={() => props.navigation.goBack()} />
                }
              />
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
          name="FacilityRecommendation"
          component={FacilityRecommendation}
          options={props => ({
            headerShown: true,
            header: () => (
              <Header
                title={'시설 소개/추천'}
                rightButton={
                  <DeleteIcon onPress={() => props.navigation.goBack()} />
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
          name="AppIntro"
          component={AppIntro}
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
