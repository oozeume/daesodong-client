import {useNavigation} from '@react-navigation/native';
import {Stack, Text} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import Info from '~/components/mypage/myInfo/Info';
import InfoChangeBottomSheet from '~/components/mypage/myInfo/InfoChangeBottomSheet';
import GenderChange from '~/components/mypage/myInfo/GenderChange';
import BirthChange from '~/components/mypage/myInfo/BirthChange';
import AddressChange from '~/components/mypage/myInfo/AddressChange';
import NameChange from '~/components/mypage/myInfo/NameChange';
import {colors} from '~/theme/theme';
import {useGetUser} from '~/api/user/queries';
import {VerificationResult} from '~/../types/verification';
import {debounce} from 'lodash';
import {usePostAuthNicknameCheck} from '~/api/auth/mutations';
import {NavigationHookProp} from '~/../types/navigator';
import {usePatchUser} from '~/api/user/mutation';
import useToastShow from '~/hooks/useToast';
import {MyInfoForm} from '~/../types/mypage';
import dayjs from 'dayjs';
import {
  checkNicknameLength,
  isExistBlank,
  isExistSpecialCharacters,
} from '~/utils/verification';

/**
 *@description 내 계정 > 내 정보 페이지
 */
function MyInfo() {
  const {navigate} = useNavigation<NavigationHookProp>();
  const {toastShow} = useToastShow();

  const {data: userData, refetch: refetchUserData} = useGetUser(true);
  const postAuthNicknameCheck = usePostAuthNicknameCheck();
  const patchUser = usePatchUser();

  const [modalOpen, setModalOpen] = useState({
    nickname: false,
    gender: false,
    birthdate: false,
    address: false,
  });

  const [previousForm, setPreviousForm] = useState({
    nickname: userData?.nickname ?? '',
    gender: userData?.gender ?? 'Male',
    birthdate: userData?.birthdate ?? dayjs().year(),
    address: userData?.address ?? '',
  });

  const initForm = {
    nickname: userData?.nickname ?? '',
    gender: userData?.gender ?? 'Male',
    birthdate: userData?.birthdate ?? dayjs().year(),
    address: userData?.address ?? '',
  };

  const [form, setForm] = useState(initForm);

  // 닉네임 중복 검증 결과
  const [nicknameDuplicate, setNicknameDuplicate] =
    useState<VerificationResult>('WARNING');

  // 닉네임 서브 검증 결과
  const [nicknameHelpResults, setNicknameHelpResults] = useState<
    VerificationResult[]
  >(['WARNING', 'WARNING', 'WARNING']);

  // 닉네임 서브 검증 텍스트
  const nicknameHelpList = useMemo(
    () => ['공백 미포함', '기호 미포함', '2~10자 이내'],
    [],
  );

  // debounce 최적화
  const checkNickname = useMemo(
    () =>
      debounce(async text => {
        try {
          const response = await postAuthNicknameCheck.mutateAsync({
            nickname: text,
          });

          if (response.data) {
            setNicknameDuplicate('SUCCESS');
          } else {
          }
        } catch (error) {
          setNicknameDuplicate('FAIL');
        }
      }, 50),
    [],
  );

  const onCloseModal = (key: keyof typeof initForm) => {
    setForm(prev => ({...prev, [key]: initForm[key]}));
    setModalOpen(prev => ({...prev, [key]: false}));
  };

  useEffect(() => {
    const _isExistBlank = isExistBlank(form.nickname);
    const _isExistSpecialCharacters = isExistSpecialCharacters(form.nickname);
    const _checkNicknameLength = checkNicknameLength(form.nickname);

    setNicknameHelpResults([
      _isExistBlank,
      _isExistSpecialCharacters,
      _checkNicknameLength,
    ]);

    // 서브 검증이 맞고 이전 닉네임과 다르면 서버에 중복 닉네임 확인 요청
    if (
      _isExistBlank === 'SUCCESS' &&
      _isExistSpecialCharacters === 'SUCCESS' &&
      _checkNicknameLength === 'SUCCESS' &&
      previousForm.nickname !== form.nickname
    ) {
      checkNickname(form.nickname);
    } else {
      setNicknameDuplicate('WARNING');
    }
  }, [form.nickname]);

  /**
   *@description 유저 정보 수정 api 요청 함수
   *@param messageKey - 토스트에 들어갈 텍스트 단어
   *@param modalKey - modalOpen state의 객체 키
   */
  const onChangeUserInfo = (
    messageKey: string,
    modalKey: string,
    _form: MyInfoForm,
  ) => {
    patchUser
      .mutateAsync(_form)
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
    <>
      <Stack backgroundColor={'white'} px={'18px'} flex={1}>
        <Info text={'로그인 정보'} onPress={() => navigate('MyLoginInfo')} />
        <Info
          text={'비밀번호 변경'}
          onPress={() => navigate('PasswordReset', {type: 'MY_PET_INFO'})}
        />
        <Info
          text={'닉네임'}
          info={userData?.nickname ?? ''}
          onPress={() => setModalOpen(prev => ({...prev, nickname: true}))}
        />
        <Info
          text={'성별'}
          info={userData?.gender === 'Male' ? '남성' : '여성'}
          onPress={() => setModalOpen(prev => ({...prev, gender: true}))}
        />
        <Info
          text={'태어난 년도'}
          info={`${userData?.birthdate}년`}
          onPress={() => setModalOpen(prev => ({...prev, birthdate: true}))}
        />
        <Info
          text={'거주지'}
          info={`${userData?.address}`}
          onPress={() => setModalOpen(prev => ({...prev, address: true}))}
        />
      </Stack>

      <InfoChangeBottomSheet
        height="332px"
        isOpen={modalOpen.nickname}
        onClose={() => onCloseModal('nickname')}
        ElementComponent={
          <NameChange
            subText={
              <Text fontSize={'15px'} color={colors.grayScale[60]}>
                닉네임은 한 달에 1회 변경할 수 있어요
              </Text>
            }
            onClose={() => setModalOpen(prev => ({...prev, nickname: false}))}
            onPress={() => onChangeUserInfo('닉네임', 'nickname', form)}
            helpList={nicknameHelpList}
            successMessage={'사용 가능한 닉네임입니다'}
            errorMessage={'이미 사용 중인 닉네임입니다'}
            helpResults={nicknameHelpResults}
            verificationResult={nicknameDuplicate}
            value={form.nickname}
            onChangeText={text => setForm(prev => ({...prev, nickname: text}))}
          />
        }
      />

      <InfoChangeBottomSheet
        isOpen={modalOpen.gender}
        onClose={() => onCloseModal('gender')}
        ElementComponent={
          <GenderChange
            gender={form.gender}
            onChangeGender={gender => {
              if (gender === form.gender) return;
              setForm(prev => ({...prev, gender}));
              onChangeUserInfo('성별', 'gender', {...form, gender});
            }}
          />
        }
        height={'222px'}
      />

      <InfoChangeBottomSheet
        isOpen={modalOpen.birthdate}
        onClose={() => onCloseModal('birthdate')}
        ElementComponent={
          <BirthChange
            onClose={() => setModalOpen(prev => ({...prev, birthdate: false}))}
            onPress={birthdate => {
              if (!birthdate) return;
              setForm(prev => ({...prev, birthdate}));
              onChangeUserInfo('태어난 년도', 'birthdate', {
                ...form,
                birthdate,
              });
            }}
          />
        }
        height={'530px'}
      />

      <AddressChange
        isOpen={modalOpen.address}
        onClose={() => onCloseModal('address')}
        onPress={address => {
          setForm(prev => ({...prev, address}));
          onChangeUserInfo('거주', 'address', {
            ...form,
            address,
          });
        }}
      />
    </>
  );
}

export default MyInfo;
