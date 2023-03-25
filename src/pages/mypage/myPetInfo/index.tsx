import _ from 'lodash';
import {HStack, Image, Pressable, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {SpeciesData} from '~/../types/api/species';
import {MyPetInfoForm} from '~/../types/mypage';
import {usePatchPet} from '~/api/pets/mutation';
import {useGetUser} from '~/api/user/queries';
import CameraIcon from '~/assets/icons/camera.svg';
import Tag from '~/components/common/Tag';
import GenderChange from '~/components/mypage/myInfo/GenderChange';
import Info from '~/components/mypage/myInfo/Info';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import NameChange from '~/components/mypage/myInfo/NameChange';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import useImageUpload from '~/hooks/useImagesUpload';
import useToastShow from '~/hooks/useToast';
import {colors} from '~/theme/theme';
import {config} from '~/utils/config';
import {onImagePicker} from '~/utils/image';

/**
 *@description 내 계정 > 아이 정보 수정 페이지
 *@todo PetTypeSelectModal을 공통 모듈에 맞게 수정하기
 */
function MyPetInfo() {
  const {data: userData, refetch: refetchUserData} = useGetUser(true);
  const patchPet = usePatchPet();
  const {toastShow} = useToastShow();
  const {onImageUpload} = useImageUpload();

  const [modalOpen, setModalOpen] = useState({
    name: false,
    speciesName: false,
    age: false,
    sex: false,
  });

  const initForm = {
    name: userData?.mainPetInfo.name ?? '',
    speciesName: userData?.mainPetInfo.specieName ?? '',
    age: userData?.mainPetInfo.age ?? 1,
    sex: userData?.mainPetInfo.sex ?? 'Male',
    petPictureUrl: userData?.mainPetInfo?.petImageURL,
  };

  const [form, setForm] = useState(initForm);

  const [selectedPetTypeName, setSelectedPetTypeName] = useState(
    userData?.mainPetInfo.specieName,
  );

  const onCloseModal = (key: keyof typeof initForm) => {
    setForm(prev => ({...prev, [key]: initForm[key]}));
    setModalOpen(prev => ({...prev, [key]: false}));
  };

  /**
   *@description 유저 정보 수정 api 요청 함수
   *@param messageKey - 토스트에 들어갈 텍스트 단어
   *@param modalKey - modalOpen state의 객체 키
   */
  const onChangeUserInfo = (
    messageKey: string,
    modalKey: string,
    _form: Partial<MyPetInfoForm>,
  ) => {
    if (!userData?.mainPetInfo.id)
      return toastShow(`잠시 후에 다시 시도해주세요.`);

    patchPet
      .mutateAsync({
        data: form,
        id: userData?.mainPetInfo.id,
      })
      .then(() => {
        toastShow(`내 ${messageKey}을 변경했어요`);

        setModalOpen(prev => ({...prev, [modalKey]: false}));
        refetchUserData();
      })
      .catch(() => {
        setModalOpen(prev => ({...prev, [modalKey]: false}));

        toastShow(
          `${messageKey} 변경 과정에서 오류가 발생했습니다. 다시 시도해주세요.`,
        );
      });
  };

  /**
   *@description 이미지 선택 > 클라우드 저장 > 서버에 이미지 클라우드 파일명 전송 > 펫 이미지 변경 완료.
   */
  const onMyPetImageUpdate = async () => {
    try {
      const imageData = await onImagePicker();

      onImageUpload([imageData.cloudData], () => {
        onChangeUserInfo('이미지', 'petPictureUrl', {
          petPictureUrl: imageData.cloudImageName,
        });
      });
    } catch (error) {
      console.log(error);
      toastShow('이미지를 불러오는 과정에서 오류가 발생했습니다.');
    }
  };

  return (
    <Stack backgroundColor={'white'} flex={1}>
      <Pressable
        my={'40px'}
        alignSelf={'center'}
        w={'120px'}
        justifyContent={'center'}
        onPress={onMyPetImageUpdate}
        alignItems={'center'}>
        <Image
          w={120}
          h={120}
          borderColor={'black'}
          borderWidth={1}
          borderRadius={100}
          fallbackElement={
            <Image
              w={120}
              h={120}
              borderColor={'black'}
              borderWidth={1}
              source={require('../../../assets/images/intro_image.png')}
              alt={'image'}
              borderRadius={100}
            />
          }
          alt="post_img"
          source={{
            uri: `${config.IMAGE_BASE_URL}${form.petPictureUrl}`,
          }}
        />

        <Stack position={'absolute'} bottom={0} right={0}>
          <CameraIcon fill={'#FF6B00'} />
        </Stack>
      </Pressable>

      <Stack px={'18px'}>
        <Info
          text={'이름'}
          info={userData?.petInfoList[0].name}
          onPress={() => setModalOpen(prev => ({...prev, name: true}))}
        />

        <Info
          text={'종'}
          info={
            <HStack alignItems={'center'} space={'8px'}>
              <Tag
                top={3}
                name="설치류"
                bgColor={colors.fussOrange['-30']}
                color={colors.fussOrange[0]}
              />
              <Text color={colors.grayScale[80]} fontSize={'15px'} top="3px">
                {userData?.petInfoList[0].specie?.name}
              </Text>
            </HStack>
          }
          onPress={() => setModalOpen(prev => ({...prev, speciesName: true}))}
        />

        <Info
          text={'나이'}
          info={`${userData?.petInfoList[0].age}개월`}
          onPress={() => setModalOpen(prev => ({...prev, age: true}))}
        />

        <Info
          text={'성별'}
          info={userData?.petInfoList[0].sex === 'Male' ? '남아' : '여아'}
          onPress={() => setModalOpen(prev => ({...prev, sex: true}))}
        />
      </Stack>

      <InfoChangeBottomSheet
        isOpen={modalOpen.name}
        onClose={() => setModalOpen(prev => ({...prev, name: false}))}
        ElementComponent={
          <NameChange
            title={'아이 이름'}
            value={form.name}
            onClose={() => onCloseModal('name')}
            onPress={() => onChangeUserInfo('이름', 'name', form)}
            verificationResult={
              !_.isEmpty(form.name) && form.name !== userData?.mainPetInfo.name
                ? 'SUCCESS'
                : 'WARNING'
            }
            onChangeText={text => setForm(prev => ({...prev, name: text}))}
          />
        }
      />

      <PetTypeSelectModal
        isOpen={modalOpen.speciesName}
        buttonText={'변경'}
        onPress={(selectedItem?: SpeciesData) =>
          onChangeUserInfo('종', 'speciesName', {
            ...form,
            speciesName: selectedItem?.name ?? '',
          })
        }
        onClose={() => onCloseModal('speciesName')}
        previousPetTypeName={selectedPetTypeName}
      />

      <InfoChangeBottomSheet
        isOpen={modalOpen.age}
        onClose={() => setModalOpen(prev => ({...prev, age: false}))}
        ElementComponent={
          <NameChange
            title={'나이'}
            valueUnit={<Text color={colors.grayScale[70]}>개월</Text>}
            onClose={() => onCloseModal('age')}
            onPress={() => onChangeUserInfo('나이', 'age', form)}
            verificationResult={
              form.age !== undefined && form.age !== userData?.mainPetInfo.age
                ? 'SUCCESS'
                : 'WARNING'
            }
            value={form.age.toString()}
            onChangeText={text =>
              setForm(prev => ({...prev, age: Number(text)}))
            }
          />
        }
      />

      <InfoChangeBottomSheet
        isOpen={modalOpen.sex}
        height={'222px'}
        onClose={() => onCloseModal('sex')}
        ElementComponent={
          <GenderChange
            gender={form.sex}
            onChangeGender={sex => {
              if (sex === form.sex) return;
              setForm(prev => ({...prev, sex}));
              onChangeUserInfo('성별', 'sex', {...form, sex});
            }}
          />
        }
      />
    </Stack>
  );
}

export default MyPetInfo;
