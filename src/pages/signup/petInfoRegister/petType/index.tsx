import React, {useEffect, useState} from 'react';
import {colors} from '~/theme/theme';
import {HStack, Pressable, Text, useDisclose} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import Tag from '~/components/common/Tag';
import DownIcon from '~/assets/icons/down.svg';
import {SpeciesData} from '~/../types/api/species';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import {useGetSpecies} from '~/api/species/queries';
import {setData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';
import {PetInfoRegisterProps} from '~/../types/signup';

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
}: PetInfoRegisterProps) {
  const {navigate} = useNavigation<NavigationHookProp>();

  const {data, isSuccess} = useGetSpecies({limit: 10}, true);

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

    setData(storageKeys.petInfoRegister.form, {
      ...form,
      speciesName: petType.name,
    });
    setData(storageKeys.petInfoRegister.state, currentStage.toString());
    navigate('PetBirthRegister');
  };

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
      petName={form.name}
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
            {!_.isEmpty(petType?.specie.name) && (
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

      {_.isEmpty(petType?.specie.name) && (
        <Text mt="8px" color={colors.grayScale[50]} fontSize={'13px'}>
          {`직접 입력한 종으로 등록을 진행 중이에요\n대소동 팀에서 빠르게 확인 후 동물리스트에 추가할게요!`}
        </Text>
      )}

      {isOpen && (
        <PetTypeSelectModal
          isOpen={isOpen}
          onClose={onClose}
          setPetType={petType => {
            setPetType(petType);
          }}
          isEnrollPet
        />
      )}
    </LayoutContainer>
  );
}

export default PetTypeRegister;
