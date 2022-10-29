import {Center, HStack, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  title: string;
  rightButton?: JSX.Element;
  leftButton?: JSX.Element;
}
/**
 *@description 페이지 헤더
 *@param {JSX.Element} rightButton - 헤더 기준 좌쪽 위치 버튼
 *@param {JSX.Element} leftButton - 헤더 기준 우쪽 위치 버튼
 */
export default function Header({title, rightButton, leftButton}: Props) {
  return (
    <HStack style={styles.container}>
      {leftButton}

      <Center style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </Center>

      {rightButton}
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titleView: {
    flex: 1,
    paddingVertical: 17,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
});
