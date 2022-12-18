import {
  FlatList,
  HStack,
  Pressable,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '~/theme/theme';
import RightIcon from '~/assets/icons/right.svg';
import HeartDescription from '~/components/mypage/heart/HeartDescription';
import PetInfoOneLine from '~/components/mypage/heart/PetInfo';

/**
 *@description 내 계정 - 고마워요
 */
function Index() {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <>
      <FlatList
        style={styles.container}
        data={['', '', '']}
        ListHeaderComponent={() => (
          <>
            <HStack
              py={'13px'}
              px={'18px'}
              alignItems={'center'}
              backgroundColor={colors.fussYellow['-40']}>
              <Stack space={'6px'} backgroundColor={'pink'} flex={1}>
                <Text
                  color={colors.grayScale[90]}
                  fontWeight={'500'}
                  fontSize={'13px'}>
                  친구들이 나에게 보낸 고마운 마음
                </Text>
                <HStack
                  space={'4px'}
                  alignItems={'flex-end'}
                  backgroundColor={'pink'}>
                  <Text
                    lineHeight={'35px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={colors.grayScale[90]}>
                    1,000
                  </Text>
                  <Text
                    fontSize={'16px'}
                    fontWeight={'500'}
                    color={colors.grayScale[90]}>
                    개
                  </Text>
                </HStack>
              </Stack>
              <Image
                source={require('../../../assets/images/mypage_heart_image.png')}
                style={styles.image}
              />
            </HStack>
            <Pressable onPress={onOpen}>
              <HStack
                flex={1}
                borderTopWidth={1}
                borderTopColor={colors.fussYellow['-30']}
                justifyContent={'space-between'}
                backgroundColor={colors.fussYellow['-40']}
                px={'18px'}
                py={'15px'}>
                <Text color={colors.fussYellow[30]} fontSize={'13px'}>
                  고마운 마음이 뭔가요?
                </Text>
                <RightIcon stroke={colors.fussYellow[30]} />
              </HStack>
            </Pressable>
          </>
        )}
        renderItem={__ => <PetInfoOneLine />}
      />

      <HeartDescription isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: 108,
    height: 82,
  },
});
