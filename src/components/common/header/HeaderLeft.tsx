import {Pressable} from 'native-base';
import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import BackIcon from '~/assets/icon/back_icon.svg';

interface Props {
  navigation: NavigationHookProp;
}

const HeaderLeft = ({navigation}: Props) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <BackIcon />
    </Pressable>
  );
};

export default HeaderLeft;
