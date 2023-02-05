import React, {useEffect, useState} from 'react';
import {Stack, useDisclose} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
} from '~/../types/navigator';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import AddressDrawer, {
  Hangjungdong,
} from '~/components/signup/petInfo/AddressDrawer';
import {hangjungdong} from '~/utils/hangjungdong';
import SelectButtonForm from '~/components/signup/petInfo/SelectButtonForm';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 주소 등록
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function AddressRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {sido, sigugun, dong} = hangjungdong;

  const {
    isOpen: isSigugunOpen,
    onOpen: onSigugunOpen,
    onClose: onSigugunClose,
  } = useDisclose();

  const {
    isOpen: isDongOpen,
    onOpen: onDongOpen,
    onClose: onDongClose,
  } = useDisclose();

  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>();
  const [dongValue, setDongValue] = useState<Hangjungdong>();

  const [sortedSigugun, setSortedSigugun] = useState<
    Partial<Hangjungdong>[] | undefined
  >();
  const [sortedDong, setSortedDong] = useState<Hangjungdong[]>();

  const onMovePage = async () => {
    setForm(() => ({
      ...form,
      address: `${sidoValue?.name} ${sigugunValue?.name} ${dongValue?.name}`,
    }));

    onChangeStage();
    setPreviousURL(prev => [...prev, 'AddressRegister']);
    navigate('AnyQuestionRegister');
  };

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue, sigugun]);

  useEffect(() => {
    if (sigugunValue) {
      setSortedDong(
        dong.filter(
          item =>
            item.sigugun === sigugunValue.sigugun &&
            item.sido === sigugunValue.sido,
        ),
      );
    }
  }, [sigugunValue, dong]);

  console.log('@@@ form');
  console.log(form);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={7}
      possibleButtonPress={!_.isNil(sidoValue && sigugunValue && dongValue)}>
      <Stack w="100%" space={'10px'}>
        <SelectButtonForm selectorName={sidoValue?.name} onPress={onOpen} />
        {sigugunValue && (
          <SelectButtonForm
            selectorName={sigugunValue?.name ?? ''}
            onPress={onSigugunOpen}
          />
        )}
        {dongValue && (
          <SelectButtonForm
            selectorName={dongValue?.name ?? ''}
            onPress={onDongOpen}
          />
        )}
      </Stack>

      <AddressDrawer
        isOpen={isOpen}
        onClose={onClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue}
        selectableList={sido}
      />

      <AddressDrawer
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => onDongOpen()}
        setValue={setSigugunValue}
        selectableList={sortedSigugun}
        sigugunValue={sigugunValue}
      />

      <AddressDrawer
        isOpen={isDongOpen}
        onClose={onDongClose}
        onPress={() => {
          onClose();
          onSigugunClose();
          onDongClose();
        }}
        setValue={setDongValue}
        selectableList={sortedDong}
        dongValue={dongValue}
      />
    </LayoutContainer>
  );
}

export default AddressRegister;
