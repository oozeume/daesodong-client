import {HStack, Image, Stack, Text, View} from 'native-base';
import React, {useState} from 'react';
import {colors} from '~/theme/theme';
import NotificationIcon from '~/assets/icons/notification_30.svg';
import {APP_WIDTH} from '~/utils/dimension';
import NoticeDashboard from '~/components/mypage/NoticeDashboard';
import BookMarkFillIcon from '~/assets/icons/bookmark_fill_30.svg';
import HeartFillIcon from '~/assets/icons/heart_fill_30.svg';
import Tag from '~/components/common/Tag';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteList} from '~/../types/navigator';
import MypageDefaultPetImage from '~/assets/images/mypage_default_pet_image.svg';
import {useGetUser} from '~/api/user/queries';
import {config} from '~/utils/config';
import MenuButton from '~/components/mypage/myInfo/main/MenuButton';
import MenuSectionView from '~/components/mypage/myInfo/main/MenuSectionView';
import ServicePolicyModal from '~/components/common/modal/ServicePolicyModal';
import PrivacyPolicyModal from '~/components/common/modal/PrivacyPolicyModal';
import ScrollView from '~/components/common/scrollView/ScrollView';

/**
 *@description 내 계정 - 메인
 */

function MyPage() {
  const {data: userData} = useGetUser();
  const navigation = useNavigation<NavigationProp<RouteList>>();

  const [policyModalOpen, setPolicyModalOpen] = useState({
    isServicePolicyModalOpen: false,
    isPrivacyPolicyModalOpen: false,
  });

  /**
   *@description 이용약관 설명 모달 on/off 핸들러
   *@param modalName -  ServicePolicy: 이용약관 설명 모달 오픈 / PrivacyPolicy: 개인정보 처리 설명 모달 오픈
   */
  const onPolicyModalOpen = (
    modalName: 'ServicePolicy' | 'PrivacyPolicy',
    isOpen: boolean,
  ) => {
    if (modalName === 'ServicePolicy')
      setPolicyModalOpen({
        ...policyModalOpen,
        isServicePolicyModalOpen: isOpen,
      });
    else
      setPolicyModalOpen({
        ...policyModalOpen,
        isPrivacyPolicyModalOpen: isOpen,
      });
  };

  return (
    <>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {/* 대시보드 */}
        <Stack
          height={'416px'}
          pb={'28px'}
          px={'18px'}
          justifyContent={'flex-end'}
          backgroundColor={colors.fussOrange[0]}>
          <Stack alignItems={'center'}>
            <Image
              alt="my-page-pet"
              width={120}
              height={120}
              borderRadius={120}
              borderWidth={1}
              borderColor={'black'}
              fallbackElement={
                <MypageDefaultPetImage
                  width={120}
                  height={120}
                  stroke={colors.grayScale[0]}
                />
              }
              source={{
                uri: `${config.IMAGE_BASE_URL}${userData?.mainPetInfo.petImageURL}`,
              }}
            />

            <Text
              mt={'16px'}
              color={colors.grayScale[90]}
              fontWeight={'700'}
              fontSize={'20px'}
              noOfLines={1}>
              {`${userData?.nickname} ❤︎ ${userData?.mainPetInfo.name}`}
            </Text>

            <HStack alignItems={'center'} space="6px" ml={'8px'} mt={'2px'}>
              <Text color={colors.grayScale[90]} fontSize={'14px'}>
                {userData?.mainPetInfo?.specieName}
              </Text>

              <View backgroundColor={colors.grayScale['80']} h="8px" w="1px" />

              <Text color={colors.grayScale[90]} fontSize={'14px'}>
                {userData?.mainPetInfo.age}개월
              </Text>

              <View backgroundColor={colors.grayScale['80']} h="8px" w="1px" />

              <Text color={colors.grayScale[90]} fontSize={'14px'}>
                {userData?.mainPetInfo.sex === 'Male' ? '남' : '여'}아
              </Text>
            </HStack>

            <HStack
              w={APP_WIDTH}
              space={'8px'}
              justifyContent={'center'}
              mt={'24px'}>
              <NoticeDashboard
                name={'새 알림'}
                count={10}
                icon={<NotificationIcon fill={colors.fussOrange[0]} />}
                onPress={() => navigation.navigate('MyPageNotice')}
              />
              <NoticeDashboard
                name={'저장'}
                count={1000}
                icon={<BookMarkFillIcon fill={colors.fussOrange[0]} />}
                onPress={() => navigation.navigate('MyPageSave')}
              />
              <NoticeDashboard
                name={'고마워요'}
                count={1000}
                icon={<HeartFillIcon fill={colors.fussOrange[0]} />}
                onPress={() => navigation.navigate('MyPageHeart')}
              />
            </HStack>
          </Stack>
        </Stack>

        {/* 내 정보 관리 */}
        <Stack
          px={'18px'}
          pt={'16px'}
          pb={'20px'}
          backgroundColor={colors.grayScale[0]}>
          <MenuSectionView title="내 정보 관리">
            <MenuButton
              buttonName={'회원등급'}
              rightElement={
                <Tag
                  name={'등급명'}
                  bgColor={colors.fussYellow[10]}
                  color={colors.grayScale[80]}
                />
              }
            />

            <MenuButton
              buttonName={'내 정보'}
              onPress={() => navigation.navigate('MyInfo')}
            />

            <MenuButton
              buttonName={'아이 정보'}
              onPress={() => navigation.navigate('MyPetInfo')}
            />
          </MenuSectionView>

          <MenuSectionView title="내 활동">
            <MenuButton
              buttonName={'내가 작성한 리뷰'}
              onPress={() => navigation.navigate('MyReview')}
              count={100}
            />

            <MenuButton
              buttonName={'내가 작성한 게시글'}
              onPress={() => navigation.navigate('MyCommunityContent')}
              count={100}
            />

            <MenuButton
              buttonName={'차단계정 관리'}
              onPress={() => navigation.navigate('BlockedAccounts')}
            />
          </MenuSectionView>

          <MenuSectionView title="서비스 문의">
            <MenuButton
              buttonName={'1:1 문의'}
              onPress={() => navigation.navigate('Inquiry')}
            />

            <MenuButton
              buttonName={'시설 소개/추천하기'}
              onPress={() => navigation.navigate('FacilityRecommendation')}
              rightElement={
                <Tag
                  name={'도움이 필요해요!'}
                  width={'91px'}
                  bgColor={colors.positive['-40']}
                  color={colors.positive[0]}
                />
              }
            />

            <MenuButton
              buttonName={'서비스 이용약관'}
              onPress={() => onPolicyModalOpen('ServicePolicy', true)}
            />

            <MenuButton
              buttonName={'개인정보 처리방침'}
              onPress={() => onPolicyModalOpen('PrivacyPolicy', true)}
            />
          </MenuSectionView>
        </Stack>
      </ScrollView>

      {/* 이용약관 모달 */}
      <ServicePolicyModal
        isOpen={policyModalOpen.isServicePolicyModalOpen}
        onClose={() => onPolicyModalOpen('ServicePolicy', false)}
      />

      {/* 개인정보 보호 모달 */}
      <PrivacyPolicyModal
        isOpen={policyModalOpen.isPrivacyPolicyModalOpen}
        onClose={() => onPolicyModalOpen('PrivacyPolicy', false)}
      />
    </>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayScale[0],
  },
});
