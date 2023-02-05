import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
} from '~/../types/navigator';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */
function PetNameRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const [name, setName] = useState<string>();

  const onMovePage = () => {
    if (!name) return;

    setForm(pre => ({...pre, name}));
    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetNameRegister']);
    navigate('PetTypeRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={3}
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
