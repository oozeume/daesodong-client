import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Pressable} from 'native-base';
import React from 'react';
import BackIcon from '~/assets/icon/back_icon.svg';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const HeaderLeft = ({navigation}: Props) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <BackIcon />
    </Pressable>
  );
};

export default HeaderLeft;
