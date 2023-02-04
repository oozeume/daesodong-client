import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Platform, StyleSheet, TextInput} from 'react-native';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import VerificationModal from '~/components/common/modal/VerificationModal';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {
  Box,
  Center,
  Circle,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import StageTextBox from '~/components/common/stage/StageTextBox';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {EMAIL_SIGNUP_STAGE_TEXT_LIST} from '~/constants/signup';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationHookProp,
  PetInfoRegisterNavigatorRouteList,
  SignupNavigatorRouteList,
} from '~/../types/navigator';
import useRegExPhone from '~/hooks/useRegExPhone';
import {PetInfoForm, SetPetInfoForm, SignupForm} from '~/../types/signup';
import {usePostAuthMobileVerify} from '~/api/auth/mutations';
import LayoutContainer from '~/components/signup/petInfo/LayoutContainer';
import ChoiceButton from '~/components/signup/petInfo/ChoiceButton';
import _ from 'lodash';
import {DateList} from '~/components/signup/petInfo/PetOwnerBirth';
import dayjs from 'dayjs';
import DateSelector from '~/components/hospital/review/register/selector';
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
 *@description 집사정보등록 - 반려동물 이름
 */
function PetImageRegister({
  onChangeStage,
  setPreviousURL,
  form,
  setForm,
}: Props) {
  const {navigate} = useNavigation<NavigationHookProp>();
  console.log('@@@ FORM');
  console.log(form);
  const {mutateAsync} = usePostImageUpload();

  const [image, setImage] = useState<string>();
  const [_filename, setFilename] = useState<string>();

  console.log('@@@ image');
  console.log(image);
  const onMovePage = () => {
    if (!image) return;

    setForm(pre => ({...pre, petPictureUrl: image}));
    setForm(prev => ({...prev, petPictureUrl: _filename}));

    onChangeStage();
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

  useEffect(() => {}, []);

  return (
    <LayoutContainer
      buttonPress={onMovePage}
      currentStage={9}
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

      <Stack position={'absolute'} bottom={120} alignSelf={'center'}>
        <Text onPress={onSkipPage} color={colors.grayScale[60]}>
          건너뛰기
        </Text>
      </Stack>
    </LayoutContainer>
  );
}

export default PetImageRegister;
