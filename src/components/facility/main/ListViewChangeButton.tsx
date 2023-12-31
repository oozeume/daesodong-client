import {Center, Pressable, Text} from 'native-base';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {TAB_BAR_HEIGHT} from '~/navigator/tab/tabNavigator';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  onPress: () => void;
  icon: JSX.Element;
  name: string;
}

/**
 *@description 시설 메인 > 지도보기, 목록 보기 버튼
 */
function ListViewChangeButton({icon, onPress, name}: Props) {
  const buttonLeftValue = 49;

  return (
    <Pressable
      onPress={onPress}
      backgroundColor={colors.grayScale[0]}
      borderRadius={'26px'}
      px={'16px'}
      py="8px"
      position={'absolute'}
      bottom={Platform.OS === 'ios' ? TAB_BAR_HEIGHT + 16 : TAB_BAR_HEIGHT + 36}
      style={styles.shadow}
      left={Math.floor(APP_WIDTH * 0.5 - buttonLeftValue)}
      bgColor={colors.grayScale[0]}>
      <Center flexDir={'row'}>
        {icon}

        <Text
          ml="5px"
          fontSize={'14px'}
          color={colors.grayScale[70]}
          fontWeight={500}>
          {name}
        </Text>
      </Center>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      // 안드로이드에서 안됨
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84, // 안드로이드에서 안됨
    elevation: 3,
  },
});

export default ListViewChangeButton;
