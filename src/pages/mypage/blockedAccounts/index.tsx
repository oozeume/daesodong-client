import {FlatList, HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AvatarIcon from '~/assets/icons/avartar.svg';
import useToastShow from '~/hooks/useToast';

/**
 *@description 내 계정 > 차단 계정 관리 페이지
 */
function BlockedAccounts() {
  const {toastShow} = useToastShow();

  const onBlockedAccountCancel = () => {
    toastShow(
      '[닉네임]님을 차단 해제했어요',
      <Pressable height="32px">
        <Text color={colors.fussOrange[0]} fontWeight={700} lineHeight={'32px'}>
          취소
        </Text>
      </Pressable>,
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.grayScale[0],
        flex: 1,
        paddingHorizontal: 18,
      }}>
      <FlatList
        data={['', '']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <HStack
            py="12px"
            justifyContent={'space-between'}
            alignItems={'center'}
            borderBottomWidth={1}
            borderBottomColor={colors.grayScale[10]}>
            <HStack alignItems={'center'}>
              <AvatarIcon
                width={'32px'}
                height={'32px'}
                fill={colors.grayScale['30']}
              />
              <Text color={colors.grayScale[80]} fontSize={'14px'} ml="12px">
                닉네임
              </Text>
            </HStack>

            <Pressable
              borderWidth={1}
              borderRadius={4}
              borderColor={colors.grayScale[20]}
              px="12px"
              py="4px"
              onPress={onBlockedAccountCancel}>
              <Text color={colors.grayScale[90]} fontSize={'13px'}>
                차단 해제
              </Text>
            </Pressable>
          </HStack>
        )}
      />
    </SafeAreaView>
  );
}

export default BlockedAccounts;
