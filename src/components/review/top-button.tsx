import {Pressable, Text} from 'native-base';
import React from 'react';
import TopIcon from '../../assets/icons/top.svg';

function TopButton() {
  return (
    <Pressable
      w={'52px'}
      h={'52px'}
      borderRadius={'100px'}
      backgroundColor={'grayScale.90'}
      justifyContent={'center'}
      alignItems={'center'}
      shadow={'0px 0px 4px rgba(0, 0, 0, 0.16)'}>
      <TopIcon />
      <Text color={'white'} fontSize={'10px'}>
        Top
      </Text>
    </Pressable>
  );
}

export default TopButton;
