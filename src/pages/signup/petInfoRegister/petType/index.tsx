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

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
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
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);

  const {isOpen, onOpen, onClose} = useDisclose();
  const [petType, setPetType] = useState<SpeciesData>();

  const onMovePage = () => {
    if (!petType) return;

    setForm(prev => ({
      ...prev,
      speciesName: petType.name,
    }));

    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetTypeRegister']);
    navigate('PetBirthRegister');
  };

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={4}
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
