import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import {TextArea} from 'native-base';
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
 *@description 집사정보등록 - 고민되는 점
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function AnyQuestionRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const [concern, setConcern] = useState<string>();

  const onMovePage = () => {
    if (!concern) return;

    setForm(pre => ({...pre, concern}));
    onChangeStage();
    setPreviousURL(prev => [...prev, 'AnyQuestionRegister']);
    navigate('PetImageRegister');
  };

  const onSkipPage = () => {
    onChangeStage();
    navigate('PetImageRegister');
  };

  console.log('@@@ FORM');
  console.log(form);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={8}
      isSkipPage
      onSkipPage={onSkipPage}
      possibleButtonPress={!_.isNil(concern)}>
      <TextArea
        _focus={{
          backgroundColor: 'transparent',
          borderColor: colors.grayScale[30],
        }}
        borderRadius={'8px'}
        width={'100%'}
        h={240}
        py="14px"
        px="16px"
        value={concern}
        onChangeText={text => setConcern(text)}
        placeholderTextColor={colors.grayScale[40]}
        autoCompleteType={''}
        fontSize={'15px'}
        lineHeight={'22px'}
        color={colors.grayScale[80]}
        keyboardType={'default'}
        placeholder={'염려되는 질환이나 궁금했던 점을 알려주세요'}
      />
    </LayoutContainer>
  );
}

export default AnyQuestionRegister;
