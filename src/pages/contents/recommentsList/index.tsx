import {Box, HStack, Pressable, ScrollView, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '~/assets/icon/back_icon.svg';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import Header from '~/components/hospital/review/register/Header';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import Popup from '~/components/common/popup/Popup';
import Comment from '~/components/common/comment';
import {APP_WIDTH} from '~/utils/dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/**
 *@description 컨텐츠 답글 리스트
 */
const ContentsRecommentsList = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [comment, setComment] = useState('');

  // 게시글 삭제할까요 팝업 on/off state
  const [isOpenDeletePopup, setOpenDeletePopup] = useState(false);

  // 댓글 인풋 높이
  const commentInputHeight = 102;

  // 답글 작성 여부 확인
  const [isRecommentWriting, setRecommentWriting] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <ScrollView
          bounces={false}
          bgColor={colors.grayScale['0']}
          minHeight="100%">
          <Header
            title={'답글 23'}
            leftButton={
              <HStack position="absolute" left={18} zIndex={1}>
                <BackIcon onPress={() => navigation.goBack()} />
              </HStack>
            }
          />

          <Popup
            title={'게시글을 삭제할까요?'}
            subText="삭제한 게시글의 내용은 복구할 수 없어요"
            isVisible={isOpenDeletePopup}
            setIsVisible={setOpenDeletePopup}
          />

          <Comment />

          {/* 댓글 리스트 */}
          <Box mb={`${commentInputHeight}px`}>
            {['', '', '', ''].map((item, i) => (
              <React.Fragment key={i.toString()}>
                <Comment
                  commentType="reply"
                  onRegisterRecomment={() => setRecommentWriting(true)}
                />
                <Comment
                  commentType="reply"
                  onRegisterRecomment={() => setRecommentWriting(true)}
                />
              </React.Fragment>
            ))}
          </Box>
        </ScrollView>

        {/* 댓글 입력 */}
        <Box
          w={APP_WIDTH}
          position="absolute"
          bottom={0}
          pt="6px"
          pb="40px"
          px="18px"
          borderTopWidth={1}
          borderTopColor={colors.grayScale['20']}
          bgColor={colors.grayScale['0']}
          zIndex={10}>
          {isRecommentWriting && (
            <HStack
              justifyContent={'space-between'}
              alignItems="center"
              w={APP_WIDTH}
              position={'absolute'}
              bottom={commentInputHeight}
              h="38px"
              px="18px"
              bgColor={colors.grayScale['90']}>
              <Text color={colors.fussOrange['0']} fontSize="13px">
                @닉네임 님에게 답글을 작성중이에요
              </Text>

              <Pressable onPress={() => setRecommentWriting(false)}>
                <Text color={colors.grayScale['60']} fontSize="13px">
                  취소
                </Text>
              </Pressable>
            </HStack>
          )}

          <VerificationForm
            placeholder={
              isRecommentWriting ? '답글을 남겨보세요' : '댓글을 남겨주세요'
            }
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ContentsRecommentsList;
