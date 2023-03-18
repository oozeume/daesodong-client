import {Box, HStack, Pressable, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import {usePatchRecomment, usePostRecomment} from '~/api/recomment/mutation';
import {usePatchComment, usePostComment} from '~/api/comment/mutation';
import {SetState} from '~/../types/common';
import {CommentInputType} from '~/../types/community';
import {Keyboard, TextInput} from 'react-native';
import CommentModel from '~/model/comment';

interface Props {
  postId: string;
  setCommentInputType: SetState<CommentInputType>;
  commentInputType: CommentInputType;
  onEnrollCallback: () => void;
  selectedComment?: CommentModel;
  selectedRecomment?: CommentModel;
}

/**
 *@description 댓글 등록 인풋 컴포넌트
 *@param ommentInputType -  댓글 입력 타입 (추가, 답글, 수정)
 *@param onEnrollCallback - 등록 후, 콜백함수
 */
function CommentInput({
  postId,
  setCommentInputType,
  commentInputType,
  onEnrollCallback,
  selectedComment,
  selectedRecomment,
}: Props) {
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const postComment = usePostComment();
  const postRecomment = usePostRecomment();
  const patchComment = usePatchComment();
  const patchRecomment = usePatchRecomment();

  const onSendComment = () => {
    let isError = false;
    let func: any;
    let data: any = null;

    switch (commentInputType) {
      case 'POST_COMMENT':
        func = postComment;
        data = {postId, content: commentText};
        break;

      case 'PATCH_COMMENT':
        func = patchComment;
        data = {
          postId,
          commentId: selectedComment?.id || '',
          content: commentText,
        };
        break;

      case 'POST_RECOMMENT':
        func = postRecomment;
        data = {commentId: selectedComment?.id || '', content: commentText};
        break;

      case 'PATCH_RECOMMENT':
        func = patchRecomment;
        data = {
          commentId: selectedRecomment?.parentCommentId || '',
          recommentId: selectedRecomment?.id || '',
          content: commentText,
        };

        break;
    }

    func
      .mutateAsync(data)
      .then((response: {data: boolean}) => {
        if (response.data) {
          onEnrollCallback();
          setCommentText('');
          setCommentInputType('POST_COMMENT');
        }
      })
      .catch((error: any) => console.log(error));
  };

  const onRecommentInputCancel = () => {
    Keyboard.dismiss();
    setCommentText('');
    setCommentInputType('POST_COMMENT');
  };

  useEffect(() => {
    if (commentInputType.includes('PATCH')) {
      inputRef.current?.focus();
      setCommentText(selectedComment?.content || '');
    }
  }, [commentInputType, selectedComment]);

  return (
    <Box>
      {commentInputType === 'POST_RECOMMENT' && (
        <HStack
          justifyContent={'space-between'}
          alignItems="center"
          w="100%"
          h="38px"
          px="18px"
          bgColor={colors.grayScale['90']}>
          <Text color={colors.fussOrange['0']} fontSize="13px">
            {`@${selectedComment?.nickname ?? ''} 님에게 답글을 작성중이에요`}
          </Text>

          <Pressable onPress={onRecommentInputCancel}>
            <Text color={colors.grayScale['60']} fontSize="13px">
              취소
            </Text>
          </Pressable>
        </HStack>
      )}

      <Box
        pt="15px"
        pb="43px"
        px="18px"
        bgColor={colors.grayScale[0]}
        borderTopWidth={1}
        borderTopColor={colors.grayScale['20']}>
        <VerificationForm
          inputRef={inputRef}
          placeholder={`${
            commentInputType === 'POST_RECOMMENT' ? '답글' : '댓글'
          }을 남겨보세요`}
          value={commentText}
          onChangeText={text => setCommentText(text)}
          noBorderBottom
          inputRightElement={
            <Button
              width="53px"
              text={commentInputType.includes('POST') ? '등록' : '수정'}
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
              active={commentText.length !== 0}
              handlePress={onSendComment}
            />
          }
        />
      </Box>
    </Box>
  );
}

export default CommentInput;
