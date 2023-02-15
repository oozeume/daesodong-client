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
import {ImageOrVideo} from 'react-native-image-crop-picker';

/**
 *@description 집사정보등록 - 반려동물 사진 등록
 */
function PetImageRegister({
  form,
  setForm,
  currentStage,
}: PetInfoImageRegisterProps) {
  const {reset} = useNavigation<NavigationHookProp>();
  const {mutateAsync, isLoading} = usePostImageUpload();
  const patchUserInfo = usePatchUserInfo();

  // 내부 앱 이미지 경로
  const [imagePath, setImagePath] = useState<string>();
  const [imageInfo, setImageInfo] = useState<ImageOrVideo>();

  // 이미지명
  const [fileName, setFilename] = useState<string>();

  const onMovePage = async (isSkip: boolean) => {
    if (!imagePath || !imageInfo || !fileName) return;

    const petPictureUrl = isSkip ? undefined : fileName;

    setForm(prev => ({...prev}));

    try {
      const imageUploadForm = {
        uri: Platform.OS === 'android' ? imageInfo.path : imageInfo.sourceURL,
        type: imageInfo.mime,
        name: Platform.OS === 'android' ? fileName : imageInfo.filename,
      };

      const data = new FormData();
      data.append('file', imageUploadForm);

      // 이미지 업로드 api 호출
      const imageUploadResponse = await mutateAsync(
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

      if (imageUploadResponse.statusCode === 201) {
        const response = await patchUserInfo.mutateAsync({
          ...form,
          petPictureUrl,
        });

        if (response.data) {
          await removeData(storageKeys.petInfoRegister.form);
          await removeData(storageKeys.petInfoRegister.state);
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
    // 이미지가 업로드 중이면 핸들러 반환
    if (isLoading) return;

    try {
      const imageInfo = await imagePicker();
      const tmp = imageInfo.path.split('/');
      const fileName = tmp[tmp.length - 1];

      setImageInfo(imageInfo);
      setImagePath(
        Platform.OS === 'android' ? imageInfo.path : imageInfo.sourceURL,
      );
      setFilename(fileName);
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
      possibleButtonPress={!_.isNil(imagePath)}>
      {patchUserInfo.isLoading && <Spinner size="lg" />}

      <HStack w={'100%'} justifyContent={'center'} pt={'24px'}>
        {imagePath ? (
          <Image
            source={{uri: imagePath}}
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
