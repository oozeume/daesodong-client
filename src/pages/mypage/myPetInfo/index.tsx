import {Center, HStack, Image, Stack, Text, useToast} from 'native-base';
import React, {useState} from 'react';
import CameraIcon from '~/assets/icons/camera.svg';
import Tag from '~/components/common/Tag';
import ToastMessage from '~/components/common/toast/ToastMessage';
import GenderChange from '~/components/mypage/myInfo/GenderChange';
import Info from '~/components/mypage/myInfo/Info';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import NicknameChange from '~/components/mypage/myInfo/NicknameChange';
import PetTypeSelectModal from '~/components/signup/petInfo/PetTypeSelectModal';
import {colors} from '~/theme/theme';

function MyPetInfo() {
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [petTypeModalOpen, setPetTypeModalOpen] = useState(false);
  const [birthModalOpen, setBirthModalOpen] = useState(false);
  const [genderModalOpen, setGenderModalOpen] = useState(false);

  const toast = useToast();

  const [petType, setPetType] = useState({id: '', title: ''});

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
          onPress={() => setNameModalOpen(true)}
        />
        <Info
          text={'종'}
          info={
            <HStack alignItems={'center'} space={'8px'}>
              <Tag
                name="설치류"
                bgColor={colors.fussOrange['-30']}
                color={colors.fussOrange[0]}
              />
              <Text color={colors.grayScale[80]} fontSize={'15px'}>
                햄스터
              </Text>
            </HStack>
          }
          onPress={() => setPetTypeModalOpen(true)}
        />
        <Info
          text={'나이'}
          info={'2개월'}
          onPress={() => setBirthModalOpen(true)}
        />
        <Info
          text={'성별'}
          info={'남아'}
          onPress={() => setGenderModalOpen(true)}
        />
      </Stack>

      <InfoChangeBottomSheet
        isOpen={genderModalOpen}
        height={'222px'}
        onClose={() => setGenderModalOpen(false)}
        ElementComponent={
          <GenderChange
            onPress={() => {
              setGenderModalOpen(false);
              toast.show({
                render: () => (
                  <ToastMessage text={'우리 아이 성별을 변경했어요'} />
                ),
              });
            }}
          />
        }
      />

      <InfoChangeBottomSheet
        isOpen={birthModalOpen}
        onClose={() => setBirthModalOpen(false)}
        ElementComponent={
          <NicknameChange
            title={'나이'}
            value={'2'}
            ValueUnit={<Text color={colors.grayScale[70]}>개월</Text>}
            isInvisibleSubText
            isInvisibleDuplicationButton
            onClose={() => setBirthModalOpen(false)}
            onPress={() => {
              setBirthModalOpen(false);
              toast.show({
                render: () => (
                  <ToastMessage text={'우리 아이 나이를 수정했어요'} />
                ),
              });
            }}
          />
        }
      />

      <PetTypeSelectModal
        isOpen={petTypeModalOpen}
        setPetType={setPetType}
        onClose={() => {
          setPetTypeModalOpen(false);
          toast.show({
            render: () => <ToastMessage text={'우리 아이 종을 변경했어요'} />,
          });
        }}
      />

      <InfoChangeBottomSheet
        isOpen={nameModalOpen}
        onClose={() => setNameModalOpen(false)}
        ElementComponent={
          <NicknameChange
            title={'아이 이름'}
            value={'봉이네'}
            isInvisibleSubText
            isInvisibleDuplicationButton
            onClose={() => setNameModalOpen(false)}
            onPress={() => {
              setNameModalOpen(false);
              toast.show({
                render: () => (
                  <ToastMessage text={'우리 아이 이름을 변경했어요'} />
                ),
              });
            }}
          />
        }
      />
    </Stack>
  );
}

export default MyPetInfo;
