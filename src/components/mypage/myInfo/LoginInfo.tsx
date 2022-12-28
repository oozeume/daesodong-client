import {Stack, Text, TextArea} from 'native-base';
import React, {useState} from 'react';
import Info from './Info';
import {colors} from '~/theme/theme';
import Popup from '~/components/common/popup/Popup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Platform, StyleSheet} from 'react-native';

/**
 *@description 내 계정 - 내 정보 - 로그인 정보 페이지
 */

function LoginInfo() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [logout, setLogout] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);
  const [withdrawalConfirm, setWithdrawalConfirm] = useState(false);

  const onLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      <Stack
        pt={Platform.OS === 'android' ? '20px' : 0}
        px={'18px'}
        backgroundColor={'white'}
        flex={1}>
        <Info
          invisibleIcon
          text={
            <Stack>
              <Text lineHeight={'22px'} fontSize={'15px'}>
                heyzugwon@kakao.com
              </Text>
              <Text
                lineHeight={'18px'}
                color={colors.grayScale[50]}
                fontSize={'13px'}>
                카카오톡으로 로그인
              </Text>
            </Stack>
          }
        />
        <Info invisibleIcon text={'로그아웃'} onPress={() => setLogout(true)} />
        <Info
          invisibleIcon
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
        onSuccess={() => setWithdrawalConfirm(true)}
        bodyElement={
          <TextArea
            autoCompleteType={false}
            placeholder={'정말 떠나신다면 이유를 꼭 듣고싶어요'}
            style={styles.textArea}
            focusOutlineColor={colors.grayScale[30]}
          />
        }
      />

      <Popup
        isVisible={withdrawalConfirm}
        setIsVisible={setWithdrawalConfirm}
        invisibleCancelButton
        title={'이유를 알려주셔서 감사해요. \n우리 다음에 또 만나요!'}
        successButtonName={'확인'}
        successButtonStyle={{backgroundColor: colors.grayScale[10]}}
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
