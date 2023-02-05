import React, {useEffect, useState} from 'react';
import {colors} from '~/theme/theme';
import {HStack, Pressable, Text, useDisclose} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
} from '~/../types/navigator';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import Tag from '~/components/common/Tag';
import DownIcon from '~/assets/icons/down.svg';
import {SpeciesData} from '~/../types/api/species';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import {useGetSpecies} from '~/api/species';
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
 *@description 집사정보등록 - 반려동물 종 선택
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetTypeRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
  currentStage,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const {data, isSuccess} = useGetSpecies({limit: 10});

  const {isOpen, onOpen, onClose} = useDisclose();
  const [petType, setPetType] = useState<SpeciesData>();

  const onMovePage = async () => {
    if (!petType) return;

    setForm(prev => ({
      ...prev,
      speciesName: petType.name,
    }));

    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetTypeRegister']);

    await setData(storageKeys.petInfoRegister.form, {
      ...form,
      speciesName: petType.name,
    });
    await setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('PetBirthRegister');
  };

  console.log('@@@ FORM');
  console.log(form);

  useEffect(() => {
    // 이전 페이지로 이동하거나 등록 중 앱 이탈할 경우, 이전 폼 값 등록 로직
    if (form.name && isSuccess) {
      let _petType = null;

      data.data.map(item => {
        if (form.speciesName === item.name) {
          _petType = item;
        }
      });

      if (_petType) setPetType(_petType);
    }
  }, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={currentStage}
      possibleButtonPress={!_.isNil(petType)}>
      <Pressable
        borderColor={colors.grayScale[30]}
        borderBottomWidth={1}
        flexDirection="row"
        backgroundColor={colors.grayScale[0]}
        onPress={onOpen}>
        <HStack
          width="100%"
          paddingBottom="15px"
          justifyContent="space-between"
          alignItems="center">
          <HStack alignItems={'center'} space={'8px'}>
            {!_.isEmpty(petType?.name) && (
              <Tag
                bgColor={colors.fussOrange['-30']}
                color={colors.fussOrange[0]}
                name={petType?.specie.name || ''}
              />
            )}
            <Text
              fontSize={15}
              color={
                _.isEmpty(petType?.name)
                  ? colors.grayScale[40]
                  : colors.grayScale[80]
              }>
              {_.isEmpty(petType?.name) ? '종을 선택해주세요' : petType?.name}
            </Text>
          </HStack>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>

      {isOpen && (
        <PetTypeSelectModal
          isOpen={isOpen}
          onClose={onClose}
          setPetType={petType => {
            setPetType(petType);
          }}
          isEnrollPet
          onPress={() => {}}
        />
      )}
    </LayoutContainer>
  );
}

export default PetTypeRegister;
