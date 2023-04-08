import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import {Circle, HStack, Image, Pressable, Spinner, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {PetInfoImageRegisterProps} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {onImagePicker} from '~/utils/image';
import {ErrorResponseTransform} from '~/../types/api/common';
import {usePatchUserInfo} from '~/api/user/mutation';
import {removeData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';
import {UnwrapPromise} from '~/../types/utils';
import useImageUpload from '~/hooks/useImagesUpload';

/**
 *@description 집사정보등록 - 반려동물 사진 등록
 */
function PetImageRegister({
  form,
  setForm,
  currentStage,
}: PetInfoImageRegisterProps) {
  const {reset} = useNavigation<NavigationHookProp>();
  const patchUserInfo = usePatchUserInfo();
  const {onImageUpload, postImageUpload} = useImageUpload();

  const [petImageInfo, setPetImageInfo] =
    useState<UnwrapPromise<ReturnType<typeof onImagePicker>>>();

  /**
   *@description r2에 이미지 등록 및 서버에 폼 요청
   *@param isSkip - 건너뛰기 여부 파라미터 (true 일 시, 이미지 저장 안함)
   */
  const onMovePage = async (isSkip: boolean) => {
    if (postImageUpload.isLoading) return;

    const petPictureUrl = isSkip ? undefined : petImageInfo?.cloudImageName;

    setForm(prev => ({...prev}));

    try {
      if (petImageInfo) {
        await onImageUpload([petImageInfo.cloudData], () => {});
      } else if (isSkip) {
        // 이미지 스킵할 경우

        patchUserInfo
          .mutateAsync({
            ...form,
            petPictureUrl,
          })
          .then(response => {
            if (response.data) {
              removeData(storageKeys.petInfoRegister.form);
              removeData(storageKeys.petInfoRegister.state);

              reset({
                index: 0,
                routes: [
                  {
                    name: 'PetInfoRegisterOutro',
                    params: {petName: form?.name ?? ''},
                  },
                ],
              });
            }
          });
      }
    } catch (error) {
      const _error = error as ErrorResponseTransform;

      // 이미 등록된 유저가 있을 경우
      if (_error.statusCode === 409)
        reset({index: 0, routes: [{name: 'InitialLogin'}]});
    }
  };

  // 이미지 선택 핸들러
  const onChooseImage = async () => {
    // 이미지가 업로드 중이면 핸들러 반환
    if (postImageUpload.isLoading) return;
    try {
      const _petImageInfo = await onImagePicker();
      setPetImageInfo(_petImageInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutContainer
      petName={form.name}
      buttonPress={() => onMovePage(false)}
      currentStage={currentStage}
      isSkipPage
      onSkipPage={() => onMovePage(true)}
      possibleButtonPress={!_.isNil(petImageInfo)}>
      {patchUserInfo.isLoading && <Spinner size="lg" />}

      <HStack w={'100%'} justifyContent={'center'} pt={'24px'}>
        {petImageInfo?.appLocalImageName ? (
          <Image
            source={{uri: petImageInfo.appLocalImageName}}
            alt="pet_img"
            w={'165px'}
            h={'165px'}
            borderRadius={165}
          />
        ) : (
          <Circle
            w={'165px'}
            h={'165px'}
            backgroundColor={colors.grayScale[10]}
          />
        )}
      </HStack>

      <Pressable
        mt={'16px'}
        alignSelf={'center'}
        borderColor={colors.grayScale[90]}
        borderWidth={1}
        w={'73px'}
        borderRadius={'4px'}
        h={'26px'}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={colors.fussYellow[0]}
        onPress={onChooseImage}>
        <Text>사진 선택</Text>
      </Pressable>
    </LayoutContainer>
  );
}

export default PetImageRegister;
