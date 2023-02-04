import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import {setData} from '~/utils/storage';
import AppIntroLayout from '~/components/appIntro/AppIntroLayout';
import IntroImage from '~/assets/images/init_intro3.svg';

/**
 *@description 초기 앱 인트로 설명 세번째 페이지
 */
function AppIntroThird() {
  const {reset} = useNavigation<NavigationHookProp>();

  const onMove = async () => {
    try {
      await setData('firstOpen', 'firstOpen');
      reset({index: 0, routes: [{name: 'InitialLogin'}]});
    } catch (e) {
      // error
    }
  };

  return (
    <AppIntroLayout
      title="내 경험을 공유해보세요"
      description={`내가 겪은 경험을 공유하고 다른 동물들을 도와\n고마운 마음을 모아보세요`}
      pageNumber={1}
      onMove={onMove}
      imageElement={<IntroImage />}
    />
  );
}

export default AppIntroThird;
