import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import Popup from '~/components/common/popup/Popup';
import Comment from '~/components/common/comment';
import {APP_WIDTH} from '~/utils/dimension';
import useGetKeyboardHeight from '~/hooks/useGetKeyboardHeight';

/**
 *@description 컨텐츠 답글 리스트
 */
const ContentsRecommentsList = () => {
  const keyobardHeight = useGetKeyboardHeight();

  const [androidKeyboardHeight, setAndroiKeyboardHeight] = useState(0);
  const [comment, setComment] = useState('');

  // 게시글 삭제할까요 팝업 on/off state
  const [isOpenDeletePopup, setOpenDeletePopup] = useState(false);

  // 댓글 인풋 높이
  const flatListMarginBottom = 90;

  // 답글 작성 여부 확인
  const [isRecommentWriting, setRecommentWriting] = useState(false);

  return (
    <SafeAreaView>
      <Popup
        title={'게시글을 삭제할까요?'}
        subText="삭제한 게시글의 내용은 복구할 수 없어요"
        isVisible={isOpenDeletePopup}
        setIsVisible={setOpenDeletePopup}
      />

      <FlatList
        ListFooterComponent={() => <Box></Box>}
        ListFooterComponentStyle={{marginBottom: flatListMarginBottom}}
        bgColor={colors.grayScale['0']}
        minHeight="100%"
        data={['', '', '', '', '', '', '', '', '', '', '']}
        ListHeaderComponent={() => <Comment />}
        keyExtractor={(item, index) => String(index)}
        renderItem={info => (
          <Comment
            isBest={info.index === 0 || info.index === 10}
            commentType="reply"
            onRegisterRecomment={() => setRecommentWriting(true)}
          />
        )}
      />

      {/* 댓글 입력 */}
      <Box
        w={APP_WIDTH}
        position="absolute"
        bottom={keyobardHeight || `${androidKeyboardHeight}px`}
        pt="6px"
        pb="28px"
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
            bottom={flatListMarginBottom}
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
          onFocus={e => {
            setAndroiKeyboardHeight(270);
          }}
          onBlur={() => {
            setAndroiKeyboardHeight(0);
          }}
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
  );
};

export default ContentsRecommentsList;
