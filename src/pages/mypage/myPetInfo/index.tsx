import {Center, HStack, Image, Stack, Text, useToast} from 'native-base';
import React, {useState} from 'react';
import {SpeciesData} from '~/../types/api/species';
import {MyPetInfoForm} from '~/../types/mypage';
import {usePatchUserInfo} from '~/api/user/mutation';
import {useGetUser} from '~/api/user/queries';
import CameraIcon from '~/assets/icons/camera.svg';
import Tag from '~/components/common/Tag';
import GenderChange from '~/components/mypage/myInfo/GenderChange';
import Info from '~/components/mypage/myInfo/Info';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import NameChange from '~/components/mypage/myInfo/NameChange';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import useToastShow from '~/hooks/useToast';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 > 아이 정보 수정 페이지
 *@todo PetTypeSelectModal을 공통 모듈에 맞게 수정하기
 *@todo 비밀번호 변경 로직 추가하기
 *@todo 이미지 변경 로직 추가하기
 */
function MyPetInfo() {
  const {data: userData, refetch: refetchUserData} = useGetUser(true);
  const patchUserInfo = usePatchUserInfo();
  const {toastShow} = useToastShow();

  const [modalOpen, setModalOpen] = useState({
    name: false,
    speciesName: false,
    age: false,
    sex: false,
  });

  const [form, setForm] = useState({
    name: userData?.mainPetInfo.name ?? '',
    speciesName: userData?.mainPetInfo.specieName ?? '',
    age: userData?.mainPetInfo.age ?? 1,
    sex: userData?.mainPetInfo.sex ?? 'Male',
  });

  const [selectedPetTypeName, setSelectedPetTypeName] = useState(
    userData?.mainPetInfo.specieName,
  );

  /**
   *@description 유저 정보 수정 api 요청 함수
   *@param messageKey - 토스트에 들어갈 텍스트 단어
   *@param modalKey - modalOpen state의 객체 키
   */
  const onChangeUserInfo = (
    messageKey: string,
    modalKey: string,
    _form: MyPetInfoForm,
  ) => {
    patchUserInfo
      .mutateAsync({
        gender: userData?.gender ?? 'Male',
        birthDate: userData?.birthdate,
        address: userData?.address ?? '',
        concern: userData?.mainPetInfo.concern ?? '',
        petPictureUrl: userData?.mainPetInfo.pet_picture_url ?? '',
        ...form,
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

  return (
    <Stack backgroundColor={'white'} flex={1}>
      <Center
        my={'40px'}
        alignSelf={'center'}
        w={'120px'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Image
          w={120}
          h={120}
          borderColor={'black'}
          borderWidth={1}
          source={require('../../../assets/images/intro_image.png')}
          alt={'image'}
          borderRadius={100}
        />
        <Stack position={'absolute'} bottom={0} right={0}>
          <CameraIcon fill={'#FF6B00'} />
        </Stack>
      </Center>

      <Stack px={'18px'}>
        <Info
          text={'이름'}
          info={'봉식이'}
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
                햄스터
              </Text>
            </HStack>
          }
          onPress={() => setModalOpen(prev => ({...prev, speciesName: true}))}
        />

        <Info
          text={'나이'}
          info={'2개월'}
          onPress={() => setModalOpen(prev => ({...prev, age: true}))}
        />

        <Info
          text={'성별'}
          info={'남아'}
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
            onClose={() => setModalOpen(prev => ({...prev, name: false}))}
            onPress={() => onChangeUserInfo('이름', 'name', form)}
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
        onClose={() => setModalOpen(prev => ({...prev, speciesName: false}))}
        previousPetTypeName={selectedPetTypeName}
      />

      <InfoChangeBottomSheet
        isOpen={modalOpen.age}
        onClose={() => setModalOpen(prev => ({...prev, age: false}))}
        ElementComponent={
          <NameChange
            title={'나이'}
            valueUnit={<Text color={colors.grayScale[70]}>개월</Text>}
            onClose={() => setModalOpen(prev => ({...prev, age: false}))}
            onPress={() => onChangeUserInfo('나이', 'age', form)}
            verificationResult={'SUCCESS'}
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
        onClose={() => setModalOpen(prev => ({...prev, sex: false}))}
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
