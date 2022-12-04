import {
  Box,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BookmarLineIcon from '~/assets/icons/bookmark_line.svg';
import BookmarFillIcon from '~/assets/icons/bookmark_fill.svg';
import BackIcon from '~/assets/icon/back_icon.svg';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import CommunityContent from '~/components/community/detail/Content';
import Header from '~/components/hospital/review/register/Header';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import Popup from '~/components/common/popup/Popup';
import Comment from '~/components/common/comment';

/**
 *@description 커뮤니티 상세 + 댓글 페이지
 */
const CommunityDetail = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [comment, setComment] = useState('');
  const [isBookmark, setIsBookmark] = useState(false);

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <SafeAreaView>
        <ScrollView bgColor={colors.grayScale['0']} minHeight="100%">
          <Header
            title={''}
            leftButton={
              <Pressable
                position="absolute"
                left="18px"
                zIndex={1}
                onPress={() => navigation.goBack()}>
                <BackIcon />
              </Pressable>
            }
            rightButton={
              <HStack position="absolute" right={18} zIndex={1}>
                {isBookmark ? (
                  <BookmarFillIcon
                    fill={colors.fussOrange['0']}
                    style={{marginRight: 16}}
                    onPress={() => setIsBookmark(prev => !prev)}
                  />
                ) : (
                  <BookmarLineIcon
                    fill={colors.grayScale['0']}
                    style={{marginRight: 16}}
                    onPress={() => setIsBookmark(prev => !prev)}
                  />
                )}

                <KekabMenu
                  bottom={Platform.OS === 'android' ? '88px' : '110px'}
                  handleFirstButton={() =>
                    navigation.navigate('CommunityRegister', {type: 'MODIFY'})
                  }
                  handleSecondButton={() => setIsOpenDeletePopup(true)}
                />
              </HStack>
            }
          />

          <Popup
            title={'게시글을 삭제할까요?'}
            subText="삭제한 게시글의 내용은 복구할 수 없어요"
            isVisible={isOpenDeletePopup}
            setIsVisible={setIsOpenDeletePopup}
          />

          {/* 컨텐츠 */}
          <CommunityContent />

          <Box height="8px" bgColor={colors.grayScale['10']}></Box>

          {/* 댓글 리스트 */}
          <Box>
            <Comment />
            <Comment commentType="reply" />
            <Comment commentType="delete" />
            <Comment commentType="reply" />

            {comment.length !== 0 && (
              <HStack
                justifyContent={'space-between'}
                alignItems="center"
                w="100%"
                position={'absolute'}
                bottom={0}
                h="38px"
                px="18px"
                bgColor={colors.grayScale['90']}>
                <Text color={colors.fussOrange['0']} fontSize="13px">
                  @닉네임 님에게 답글을 작성중이에요
                </Text>

                <Pressable>
                  <Text color={colors.grayScale['60']} fontSize="13px">
                    취소
                  </Text>
                </Pressable>
              </HStack>
            )}
          </Box>

          {/* 댓글 입력 */}
          <Box
            pt="15px"
            pb="43px"
            px="18px"
            borderTopWidth={1}
            borderTopColor={colors.grayScale['0']}>
            <VerificationForm
              placeholder="댓글을 남겨보세요"
              value={comment}
              onChangeText={text => setComment(text)}
              noBorderBottom
              inputRightElement={
                <Button
                  width="53px"
                  text={'등록'}
                  large={false}
                  fontColors={{
                    active: colors.grayScale['90'],
                    disabled: colors.grayScale['40'],
                  }}
                  buttonColors={{
                    active: colors.fussOrange['0'],
                    disabled: colors.fussOrange['-30'],
                  }}
                  borderColors={{
                    active: colors.grayScale['90'],
                    disabled: colors.grayScale['40'],
                  }}
                  active={comment.length !== 0}
                />
              }
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommunityDetail;
