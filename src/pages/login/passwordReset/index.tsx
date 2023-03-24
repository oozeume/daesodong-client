import _ from 'lodash';
import {Box, KeyboardAvoidingView, Pressable} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';

import {colors} from '~/theme/theme';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import PasswordResetPhoneCheck from './phoneCheck';
import PasswordResetChange from './change';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp, RouteHookProp} from '~/../types/navigator';
import PasswordCheck from './passwordCheck';
import useToastShow from '~/hooks/useToast';
import {useGetUser} from '~/api/user/queries';
import Header from '~/components/common/header/Header';
import BackIcon from '~/assets/icon/back_icon.svg';

/**
 *@description 비밀번호 재설정 페이지
 */
function PasswordReset() {
  const {navigate, setOptions, goBack} = useNavigation<NavigationHookProp>();
  const {data: userData} = useGetUser();

  const [emailForm, setEmailForm] = useState('');
  const [currentStage, setCurrentStage] = useState(1);
  const moveToNextPage = () => setCurrentStage(prev => prev + 1);
  const {params} = useRoute<RouteHookProp<'PasswordReset'>>();
  const {toastShow} = useToastShow();

  const onMoveSuccessPage = () => {
    if (params.type === 'LOGIN_EMAIL') navigate('PasswordResetSuccess');
    else {
      navigate('MyInfo');
      toastShow('비밀번호를 변경했어요');
    }
  };

  useEffect(() => {
    // 이전 페이지가 내 계정 > 내 정보 페이지일 경우, 유저 정보 조회를 통한 유저 이메일 state 설정
    if (
      userData?.email &&
      userData?.email !== emailForm &&
      params.type === 'MY_PET_INFO'
    ) {
      setEmailForm(userData?.email);
    }
  }, [userData]);

  useEffect(() => {
    // 이전 페이지에 따른 비밀번호 변경 페이지 타이틀 변경
    setOptions({
      header: () => (
        <Header
          title={
            params.type === 'LOGIN_EMAIL' ? '비밀번호 재설정' : '비밀번호 변경'
          }
          leftButton={
            <Pressable onPress={() => goBack()}>
              <BackIcon />
            </Pressable>
          }
        />
      ),
    });
  }, [setOptions, params, goBack]);

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss} style={{flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: colors.grayScale[0],
          flex: 1,
        }}>
        <KeyboardAvoidingView
          flex={1}
          behavior={'padding'}
          keyboardVerticalOffset={40}>
          <Box
            flex={1}
            marginX={'18px'}
            pb="40px"
            backgroundColor={colors.grayScale[0]}>
            <CurrentComponentOfArray index={currentStage}>
              {params.type === 'LOGIN_EMAIL' ? (
                <PasswordResetPhoneCheck
                  handlePage={moveToNextPage}
                  setEmailForm={setEmailForm}
                />
              ) : (
                <PasswordCheck
                  handlePage={moveToNextPage}
                  emailForm={emailForm}
                />
              )}
              <PasswordResetChange
                handlePage={onMoveSuccessPage}
                emailForm={emailForm}
              />
            </CurrentComponentOfArray>
          </Box>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default PasswordReset;
