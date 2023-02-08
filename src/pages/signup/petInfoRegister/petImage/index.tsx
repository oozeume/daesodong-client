import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import {Circle, HStack, Image, Pressable, Spinner, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {PetInfoImageRegisterProps} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {usePostImageUpload} from '~/api/image';
import {imagePicker} from '~/utils/image';
import {ErrorResponseTransform} from '~/../types/api/common';
import {usePatchUserInfo} from '~/api/user';
import {removeData} from '~/utils/storage';
import storageKeys from '~/constants/storageKeys';

/**
 *@description 집사정보등록 - 반려동물 사진 등록
 */
function PetImageRegister({
  form,
  setForm,
  currentStage,
}: PetInfoImageRegisterProps) {
  const {reset} = useNavigation<NavigationHookProp>();
  const {mutateAsync} = usePostImageUpload();
  const patchUserInfo = usePatchUserInfo();

  // 내부 앱 이미지 경로
  const [image, setImage] = useState<string>();

  // 이미지명
  const [_filename, setFilename] = useState<string>();

  const onMovePage = async (isSkip: boolean) => {
    if (!image && !_filename && !isSkip) return;

    const petPictureUrl = isSkip ? undefined : _filename;

    setForm(prev => ({...prev, petPictureUrl}));

    try {
      const response = await patchUserInfo.mutateAsync({
        ...form,
        petPictureUrl,
      });

      if (response.data) {
        await removeData(storageKeys.petInfoRegister.form);
        await removeData(storageKeys.petInfoRegister.state);
        reset({index: 0, routes: [{name: 'PetInfoRegisterOutro'}]});
      }
    } catch (error) {
      const _error = error as ErrorResponseTransform;

      // 이미 등록된 유저가 있을 경우
      if (_error.statusCode === 409)
        reset({index: 0, routes: [{name: 'InitialLogin'}]});
    }
  };

  // 이미지 선택 핸들러
  const onImagePicker = async () => {
    const imageInfo = await imagePicker();

    const tmp = imageInfo.path.split('/');
    const fileName = tmp[tmp.length - 1];

    const imageUploadForm = {
      uri: Platform.OS === 'android' ? imageInfo.path : imageInfo.sourceURL,
      type: imageInfo.mime,
      name: Platform.OS === 'android' ? fileName : imageInfo.filename,
    };

    const data = new FormData();
    data.append('file', imageUploadForm);

    const response = await mutateAsync(
      {data, fileName},
      {
        onError: error => {
          const errorResponse = error as ErrorResponseTransform;

          if (errorResponse?.message && errorResponse?.message !== '') {
            Alert.alert(errorResponse.message);
          }
        },
      },
    );

    if (response.success === 'SUCCESS') {
      setImage(imageUploadForm.uri || '');
      setFilename(fileName);
    }
  };

  return (
    <LayoutContainer
      buttonPress={() => onMovePage(false)}
      currentStage={currentStage}
      isSkipPage
      onSkipPage={() => onMovePage(true)}
      possibleButtonPress={!_.isNil(image)}>
      {patchUserInfo.isLoading && <Spinner size="lg" />}

      <HStack w={'100%'} justifyContent={'center'} pt={'24px'}>
        {image ? (
          <Image
            source={{uri: image}}
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
        onPress={onImagePicker}>
        <Text>사진 선택</Text>
      </Pressable>
    </LayoutContainer>
  );
}

export default PetImageRegister;
