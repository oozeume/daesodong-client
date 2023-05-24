import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {Center, HStack, Image, Stack, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
} from '~/../types/navigator';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';
import {useGetUser} from '~/api/user/queries';

interface Props {
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  currentStage: number;
}

/**
 *@description 집사정보등록 - 반려동물 나이
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetInfoRegisterIntro({setPreviousURL, currentStage}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {data: userData} = useGetUser();

  const onMovePage = () => {
    setPreviousURL(prev => [...prev, 'PetInfoRegisterIntro']);

    setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('ChoiceGenderRegister');
  };

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={0}
      possibleButtonPress>
      <Center>
        <Text pb={'12px'} fontSize={'24px'} color={colors.grayScale[80]}>
          안녕하세요 {userData?.nickname}님!
        </Text>

        <Stack pb={'60px'}>
          <Text
            color={colors.grayScale[60]}
            fontSize={'15px'}
            textAlign={'center'}>
            {userData?.nickname}님께 딱 맞는 정보 제공을 위해
          </Text>
          <Text
            color={colors.grayScale[60]}
            fontSize={'15px'}
            textAlign={'center'}>
            쉽게 답할 수 있는 8개의 질문을 준비했어요
          </Text>
        </Stack>

        <Image
          width={196}
          height={222}
          alt={'image'}
          source={require('../../../../assets/images/intro_image.png')}
        />
      </Center>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 15,
  },
});

export default PetInfoRegisterIntro;
