import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import AppIntroLayout from '~/components/appIntro/AppIntroLayout';
import IntroImage from '~/assets/images/init_intro1.svg';

/**
 *@description 초기 앱 인트로 설명 첫 페이지
 */
function AppIntroFirst() {
  const {navigate} = useNavigation<NavigationHookProp>();

  const onMove = () => {
    navigate('AppIntroSecond');
  };

  return (
    <AppIntroLayout
      title="특수동물 진료 병원을 찾고 계신가요?"
      description={`내 반료동물을 진료해주는\n우리집에서 가장 가까운 병원을 알려드릴게요`}
      pageNumber={0}
      onMove={onMove}
      imageElement={<IntroImage />}
    />
  );
}

export default AppIntroFirst;
