import {Actionsheet, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '~/components/common/header/Header';

import {colors} from '~/theme/theme';
import {APP_HEIGHT} from '~/utils/dimension';
import DeleteIcon from '~/assets/icons/delete.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 *@description 내 계정 - 고마워요 설명
 */

function HeartDescription({isOpen, onClose}: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        maxHeight={APP_HEIGHT}
        height={APP_HEIGHT}
        backgroundColor={colors.grayScale[0]}>
        <SafeAreaView>
          <>
            <Header
              rightButton={
                <Pressable onPress={onClose}>
                  <DeleteIcon />
                </Pressable>
              }
              removeTopPosition
            />

            <Stack px={'18px'} py={'16px'} space={'6px'}>
              <Text
                color={colors.fussOrange[0]}
                fontSize={'14px'}
                fontWeight={'500'}>
                Q. 고마운 마음이 뭔가요?
              </Text>
              <Text fontSize={'14px'} color={colors.grayScale[60]}>
                {'내가 작성한 후기, 게시글에 도움을 받은 친구들은 나에게 고마운 마음을 전달할 수 있어요. \n' +
                  '\n' +
                  '내가 받은 “고마워요” 수는 내가 도움을 준 친구들의 숫자와 같아요. 후기와 게시글을 자주 남겨 많은 친구들에게 도움을 줄 수록 고마운 마음을 더 많이 받을 수 있어요!'}
              </Text>
            </Stack>
            <Stack px={'18px'} py={'16px'} space={'6px'}>
              <Text
                color={colors.fussOrange[0]}
                fontSize={'14px'}
                fontWeight={'500'}>
                Q. 고마운 마음을 받으면 어떤 혜택이 있나요?
              </Text>

              <Text fontSize={'14px'} color={colors.grayScale[60]}>
                곧 회원등급 제도가 운영될 예정이에요. 친구들에게 도움을 주고
                고마운 마음을 많이 모으면{' '}
                <Text color={colors.grayScale[80]}>
                  회원등급을 올리는데 도움
                </Text>
                {'이 됩니다. \n'}
              </Text>

              <Text fontSize={'14px'} color={colors.grayScale[60]}>
                <Text color={colors.grayScale[80]}>
                  등급이 높다는 것은 친구들에게 많은 도움을 주었다는 뜻
                </Text>{' '}
                이에요. 대소동팀에서 이분들을 위한 혜택을 마련하고 있어요-!
              </Text>
            </Stack>
          </>
        </SafeAreaView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default HeartDescription;
