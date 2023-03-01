import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import Header from '~/components/common/header/Header';
import {HStack, Pressable} from 'native-base';
import BackIcon from '~/assets/icon/back_icon.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import BookmarLineIcon from '~/assets/icons/bookmark_line.svg';
import BookmarFillIcon from '~/assets/icons/bookmark_fill.svg';
import {colors} from '~/theme/theme';
import {Platform} from 'react-native';
import {usePostCummunityPostBookmark} from '~/api/community/mutation';

/**
 *@description 커뮤니티 상세 댓글 헤더 설정 및 북마크, 삭제 팝업 state 초기 설정 훅
 */
function useSetDetailHeader(postId: string, isBookmarkServerState?: boolean) {
  const navigation = useNavigation<NavigationHookProp>();
  const [isBookmark, setBookmark] = useState(isBookmarkServerState);
  const {mutateAsync, isLoading} = usePostCummunityPostBookmark();

  // 삭제 여부 팝업 오픈 state
  const [isOpenDeletePopup, setOpenDeletePopup] = useState({
    post: false,
    comment: false,
    recomment: false,
  });

  const onBookmark = () => {
    if (!postId && isLoading) return;
    mutateAsync({
      id: postId,
      isOn: !isBookmark,
    });

    setBookmark(prev => !prev);
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={''}
          leftButton={
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon />
            </Pressable>
          }
          rightButton={
            <HStack>
              {isBookmark ? (
                <BookmarFillIcon
                  fill={colors.fussOrange['0']}
                  style={{marginRight: 16}}
                  onPress={onBookmark}
                />
              ) : (
                <BookmarLineIcon
                  fill={colors.grayScale['0']}
                  style={{marginRight: 16}}
                  onPress={onBookmark}
                />
              )}

              <KekabMenu
                top={Platform.OS === 'android' ? '28px' : '20px'}
                left={'-20px'}
                handleFirstButton={() =>
                  navigation.navigate('CommunityRegister', {postId})
                }
                handleSecondButton={() =>
                  setOpenDeletePopup(prev => ({...prev, post: true}))
                }
              />
            </HStack>
          }
        />
      ),
    });
  }, [navigation, isBookmark]);

  return {
    navigation,
    isOpenDeletePopup,
    setOpenDeletePopup,
  };
}

export default useSetDetailHeader;
