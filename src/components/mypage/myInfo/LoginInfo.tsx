import {Stack, Text, TextArea} from 'native-base';
import React, {useEffect, useState} from 'react';
import Info from './Info';
import {colors} from '~/theme/theme';
import Popup from '~/components/common/popup/Popup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Platform, StyleSheet} from 'react-native';
import {useGetUser} from '~/api/user/queries';
import {useDeleteUser} from '~/api/user/mutation';
import useToastShow from '~/hooks/useToast';
import {ErrorResponse} from '~/../types/api/common';
import _ from 'lodash';
import {removeSecurityData} from '~/utils/storage';
import {config} from '~/utils/config';

/**
 *@description 내 계정 - 내 정보 - 로그인 정보 페이지
 */

function LoginInfo() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {data: userData} = useGetUser();
  const {mutateAsync: deleteUser} = useDeleteUser();

  // 로그아웃 팝업 출력 state
  const [logout, setLogout] = useState(false);

  const [withdrawalReason, setWithdrawalReason] = useState('');

  // 회원탈퇴 이유 폼 모달 on/off state
  const [withdrawal, setWithdrawal] = useState(false);
  // 이유를 알려주셔서 감사해요 modal on/off state
  const [withdrawalConfirm, setWithdrawalConfirm] = useState(false);
  const {toastShow} = useToastShow();

  const [loginType, setLoginType] = useState('이메일');

  const onLogout = () => {
    removeSecurityData(config.ACCESS_TOKEN_NAME);
    removeSecurityData(config.REFRESH_TOKEN_NAME);

    navigation.reset({index: 0, routes: [{name: 'InitialLogin'}]});
  };

  const onLeaveMembership = () => {
    deleteUser({
      reason: _.isEmpty(withdrawalReason) ? ' ' : withdrawalReason,
    })
      .then(response => {
        if (response) setWithdrawalConfirm(true);
      })
      .catch(error => {
        const _error = error as unknown as ErrorResponse;
        if (_error.statusCode === 404) toastShow('이미 삭제된 계정입니다.');
        else
          toastShow(
            '잘못된 접근입니다.\n계속해서 안되시면 관리자에게 문의 부탁드립니다.',
          );
      });
  };

  useEffect(() => {
    if (Array.isArray(userData?.social) && userData?.social[0]) {
      const _socialType = userData?.social[0];

      if (_socialType === 'Kakao') setLoginType('카카오');
      else if (_socialType === 'Google') setLoginType('구글');
      else setLoginType('애플');
    }
  }, [userData?.social]);

  return (
    <>
      <Stack
        pt={Platform.OS === 'android' ? '20px' : 0}
        px={'18px'}
        backgroundColor={'white'}
        flex={1}>
        <Info
          isInvisibleIcon
          text={
            <Stack>
              <Text lineHeight={'22px'} fontSize={'15px'}>
                {userData?.email ?? ''}
              </Text>
              <Text
                lineHeight={'18px'}
                color={colors.grayScale[50]}
                fontSize={'13px'}>
                {loginType}으로 로그인
              </Text>
            </Stack>
          }
        />
        <Info
          isInvisibleIcon
          text={'로그아웃'}
          onPress={() => setLogout(true)}
        />
        <Info
          isInvisibleIcon
          text={'회원탈퇴'}
          onPress={() => setWithdrawal(true)}
        />
      </Stack>

      <Popup
        title={'로그아웃 하시겠어요?'}
        isVisible={logout}
        setIsVisible={setLogout}
        successButtonName={'로그아웃'}
        successButtonStyle={{backgroundColor: colors.fussOrange[0]}}
        onSuccess={onLogout}
      />

      <Popup
        isVisible={withdrawal}
        setIsVisible={setWithdrawal}
        title={'정말 떠나시겠어요?😢'}
        subText={'지금까지의 모든 기록들은 삭제되어 복구할 수 없어요'}
        successButtonName={'탈퇴할래요'}
        successButtonStyle={{backgroundColor: colors.fussOrange[0]}}
        onSuccess={onLeaveMembership}
        bodyElement={
          <TextArea
            px="16px"
            py="14px"
            h="160px"
            placeholderTextColor={colors.grayScale[40]}
            autoCompleteType={false}
            placeholder={'정말 떠나신다면 이유를 꼭 듣고싶어요'}
            style={styles.textArea}
            focusOutlineColor={colors.grayScale[30]}
            value={withdrawalReason}
            onChangeText={setWithdrawalReason}
          />
        }
      />

      <Popup
        isVisible={withdrawalConfirm}
        setIsVisible={setWithdrawalConfirm}
        isInvisibleCancelButton
        title={'이유를 알려주셔서 감사해요. \n우리 다음에 또 만나요!'}
        successButtonName={'확인'}
        successButtonStyle={{backgroundColor: colors.grayScale[10]}}
        onSuccess={() => navigation.navigate('Login')}
      />
    </>
  );
}

export default LoginInfo;

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: 'white',
    borderColor: colors.grayScale[30],
  },
});
