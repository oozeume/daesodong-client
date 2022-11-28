import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _ from 'lodash';
import {Box, HStack} from 'native-base';
import React, {useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icon/back_icon.svg';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';

import {colors} from '~/theme/theme';
import CurrentComponentOfArray from '~/components/common/CurrentComponentOfArray';
import Header from '~/components/hospital/review/register/Header';
import {RouteList} from '~/../types/navigator';
import PasswordResetPhoneCheck from './phoneCheck';
import PasswordResetChange from './change';
import PasswordResetSuccess from './success';

/**
 *@description 비밀번호 재설정 페이지
 */
function PasswordReset() {
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const onMove = (stack: keyof RouteList) => {
    navigation.navigate(stack);
  };

  const [currentStage, setCurrentStage] = useState(1);

  const moveToNextPage = () => setCurrentStage(prev => prev + 1);

  return (
    <TouchableWithoutView onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: colors.grayScale[0]}}>
        <HStack
          space={3}
          h={Platform.OS === 'android' ? '10%' : '8%'}
          justifyContent={'space-between'}
          backgroundColor={colors.grayScale[0]}>
          <Header
            title={currentStage === 3 ? '' : '비밀번호 재설정'}
            leftButton={
              <BackIcon
                style={{position: 'absolute', left: 18}}
                onPress={() => onMove('InitialLogin')}
              />
            }
          />
        </HStack>

        <Box
          h={Platform.OS === 'android' ? '90%' : '92%'}
          position={'relative'}
          marginX={'18px'}
          pb="40px"
          backgroundColor={colors.grayScale[0]}>
          <CurrentComponentOfArray index={currentStage}>
            <PasswordResetPhoneCheck handlePage={moveToNextPage} />
            <PasswordResetChange handlePage={moveToNextPage} />
            <PasswordResetSuccess />
          </CurrentComponentOfArray>
        </Box>
      </SafeAreaView>
    </TouchableWithoutView>
  );
}

export default PasswordReset;
