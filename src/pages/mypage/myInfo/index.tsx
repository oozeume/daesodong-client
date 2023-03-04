import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Stack, Text, useToast} from 'native-base';
import React, {useState} from 'react';
import Info from '~/components/mypage/myInfo/Info';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import GenderChange from '~/components/mypage/myInfo/GenderChange';
import BirthChange from '~/components/mypage/myInfo/BirthChange';
import AddressChange from '~/components/mypage/myInfo/AddressChange';
import ToastMessage from '~/components/common/toast/ToastMessage';
import NameChange from '~/components/mypage/myInfo/NameChange';
import {colors} from '~/theme/theme';
import {useGetUser} from '~/api/user/queries';

/**
 *@description 내 계정 > 내 정보 페이지
 */
function MyInfo() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {data: userData} = useGetUser();

  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [genderModalOpen, setGenderModalOpen] = useState(false);
  const [birthModalOpen, setBirthModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const toast = useToast();
  return (
    <>
      <Stack backgroundColor={'white'} px={'18px'} flex={1}>
        <Info
          text={'로그인 정보'}
          onPress={() => navigation.navigate('MyLoginInfo')}
        />
        <Info
          text={'비밀번호 변경'}
          onPress={() => setNicknameModalOpen(true)}
        />
        <Info
          text={'닉네임'}
          info={userData?.nickname ?? ''}
          onPress={() => setNicknameModalOpen(true)}
        />
        <Info
          text={'성별'}
          info={userData?.gender === 'Male' ? '남성' : '여성'}
          onPress={() => setGenderModalOpen(true)}
        />
        <Info
          text={'태어난 년도'}
          info={`${userData?.birthdate}년`}
          onPress={() => setBirthModalOpen(true)}
        />
        <Info
          text={'거주지'}
          info={`${userData?.address}`}
          onPress={() => setAddressModalOpen(true)}
        />
      </Stack>

      <InfoChangeBottomSheet
        isOpen={nicknameModalOpen}
        onClose={() => setNicknameModalOpen(false)}
        ElementComponent={
          <NameChange
            subText={
              <Text fontSize={'15px'} color={colors.grayScale[60]}>
                닉네임은 한 달에 1회 변경할 수 있어요
              </Text>
            }
            value={'봉이네'}
            onClose={() => setNicknameModalOpen(false)}
            onPress={() => {
              setNicknameModalOpen(false);
              toast.show({
                render: () => <ToastMessage text={'내 닉네임을 변경했어요'} />,
              });
            }}
          />
        }
      />

      <InfoChangeBottomSheet
        isOpen={genderModalOpen}
        onClose={() => setGenderModalOpen(false)}
        ElementComponent={
          <GenderChange
            onPress={() => {
              setGenderModalOpen(false);
              toast.show({
                render: () => <ToastMessage text={'내 성별을 변경했어요'} />,
              });
            }}
          />
        }
        height={'222px'}
      />

      <InfoChangeBottomSheet
        isOpen={birthModalOpen}
        onClose={() => {
          setBirthModalOpen(false);
        }}
        ElementComponent={
          <BirthChange
            onClose={() => {
              setBirthModalOpen(false);
            }}
            onPress={() => {
              setBirthModalOpen(false);
              toast.show({
                render: () => (
                  <ToastMessage text={'내가 태어난 년도를 수정했어요'} />
                ),
              });
            }}
          />
        }
        height={'530px'}
      />

      <AddressChange
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onPress={() => {
          toast.show({
            render: () => <ToastMessage text={'거주지를 변경했어요'} />,
          });
        }}
      />
    </>
  );
}

export default MyInfo;
