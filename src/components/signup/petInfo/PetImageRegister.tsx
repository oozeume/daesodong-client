import {Circle, HStack, Stack, Text, Pressable, Image} from 'native-base';
import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {ErrorResponseTransform} from '~/../types/api/common';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import {usePostImageUpload} from '~/api/image';
import {colors} from '~/theme/theme';
import {imagePicker} from '~/utils/image';
import LayoutContainer from './LayoutContainer';

interface Props {
  handlePage: () => void;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 이미지
 */
function PetImageRegister({handlePage, form, setForm}: Props) {
  const [image, setImage] = useState<string>();
  const {mutateAsync} = usePostImageUpload();

  const onImagePicker = async () => {
    const imageInfo = await imagePicker();

    const tmp = imageInfo.path.split('/');
    const fileName = tmp[tmp.length - 1];

    const form = {
      uri: Platform.OS === 'android' ? imageInfo.path : imageInfo.sourceURL,
      type: imageInfo.mime,
      name: Platform.OS === 'android' ? fileName : imageInfo.filename,
    };

    const data = new FormData();
    data.append('file', form);

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
      setImage(form.uri || '');
      setForm(prev => ({...prev, pet_picture_url: fileName}));
    }
  };

  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={image !== undefined}>
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

      <Stack position={'absolute'} bottom={120} alignSelf={'center'}>
        <Text onPress={handlePage} color={colors.grayScale[60]}>
          건너뛰기
        </Text>
      </Stack>
    </LayoutContainer>
  );
}

export default PetImageRegister;
