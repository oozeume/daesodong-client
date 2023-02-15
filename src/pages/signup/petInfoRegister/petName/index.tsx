import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {PetInfoRegisterProps} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';

/**
 *@description 집사정보등록 - 반려동물 이름
 */
function PetNameRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: PetInfoRegisterProps) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [name, setName] = useState<string>();

  const onMovePage = () => {
    if (!name) return;

    setForm(pre => ({...pre, name}));
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetNameRegister']);

    setData(storageKeys.petInfoRegister.form, {...form, name});
    setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('PetTypeRegister');
  };

  useEffect(() => {
    if (form.name) setName(form.name);
  }, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={currentStage}
      possibleButtonPress={!_.isNil(name)}>
      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
        placeholder={'이름을 입력해주세요'}
      />
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});

export default PetNameRegister;
