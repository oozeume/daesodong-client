import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {colors} from '~/theme/theme';
import {Circle, HStack, Image, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
} from '~/../types/navigator';
import {PetInfoForm, SetPetInfoForm} from '~/../types/signup';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import _ from 'lodash';
import {usePostImageUpload} from '~/api/image';
import {imagePicker} from '~/utils/image';
import {ErrorResponseTransform} from '~/../types/api/common';

interface Props {
  onChangeStage: () => void;
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  form: PetInfoForm;
  setForm: SetPetInfoForm;
}

/**
 *@description 집사정보등록 - 반려동물 사진 등록
 * @param onChangeStage - 집사정보등록 스테이지 count 변경 핸들러
 * @param setPreviousURL - 이중 네비게이터 구조에서 이전 url 변경 함수
 */
function PetImageRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {mutateAsync} = usePostImageUpload();

  const [image, setImage] = useState<string>();
  const [_filename, setFilename] = useState<string>();

  const onMovePage = () => {
    if (!image) return;

    setForm(pre => ({...pre, petPictureUrl: image}));
    setForm(prev => ({...prev, petPictureUrl: _filename}));

    onChangeStage();
    setPreviousURL(prev => [...prev, 'PetImageRegister']);
    navigate('PetInfoRegisterOutro');
  };

  const onSkipPage = () => {
    onChangeStage();
    navigate('PetInfoRegisterOutro');
  };

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

    console.log('@@@ imageUploadForm');
    console.log(imageUploadForm);

    if (response.success === 'SUCCESS') {
      setImage(imageUploadForm.uri || '');
      setFilename(fileName);
    }
  };

  console.log('@@@ FORM');
  console.log(form);
  console.log(image);

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={9}
      isSkipPage
      onSkipPage={onSkipPage}
      possibleButtonPress={!_.isNil(image)}>
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
