import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {HStack, Text} from 'native-base';
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

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
  currentStage: number;
}

/**
 *@description 집사정보등록 - 반려동물 나이
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetBirthRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [birthDate, setBirthDate] = useState<number>();

  const onMovePage = () => {
    if (!birthDate) return;

    setForm(pre => ({...pre, birthDate}));
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetBirthRegister']);

    setData(storageKeys.petInfoRegister.form, {...form, birthDate});
    setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('PetGenderRegister');
  };

  useEffect(() => {
    if (form.birthDate) setBirthDate(form.birthDate);
  }, []);

  return (
    <LayoutContainer
      petName={form.name}
      buttonPress={onMovePage}
      currentStage={5}
      possibleButtonPress={!_.isNil(birthDate)}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomColor={colors.grayScale[30]}
        borderBottomWidth={1}>
        <TextInput
          style={styles.input}
          onChangeText={text => setBirthDate(Number(text))}
          value={birthDate?.toString()}
          onSubmitEditing={Keyboard.dismiss}
          keyboardType={'number-pad'}
          placeholder={'숫자만 입력해주세요'}
          autoFocus
        />
        <Text fontSize={'15px'} color={colors.grayScale[70]}>
          개월
        </Text>
      </HStack>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 15,
  },
});

export default PetBirthRegister;
