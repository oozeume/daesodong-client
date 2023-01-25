import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import AppIntroLayout from '~/components/appIntro/AppIntroLayout';
import IntroImage from '~/assets/images/init_intro2.svg';

/**
 *@description 초기 앱 인트로 설명 두번째 페이지
 */
function AppIntroSecond() {
  const {navigate} = useNavigation<NavigationHookProp>();

  const onMove = () => {
    navigate('AppIntroThird');
  };

  return (
    <AppIntroLayout
      title="유용한 정보를 얻을 수 있어요"
      description={`정보 얻기가 힘든 특수동물의 모든 것\n대소동에서 알려드려요`}
      pageNumber={1}
      onMove={onMove}
      imageElement={<IntroImage />}
    />
  );
}

export default AppIntroSecond;
