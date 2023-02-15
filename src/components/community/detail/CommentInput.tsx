import {Box} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';
import Button from '~/components/common/button';
import {usePatchRecomment, usePostRecomment} from '~/api/recomment/mutation';
import {usePatchComment, usePostComment} from '~/api/comment/mutation';
import {SetState} from '~/../types/common';
import {CommentInputType, CommentItem} from '~/../types/community';
import {TextInput} from 'react-native';

interface Props {
  postId: string;
  setCommentInputType: SetState<CommentInputType>;
  commentInputType: CommentInputType;
  onEnrollCallback: () => void;
  selectedComment?: CommentItem;
}
export default function CommentInput({
  postId,
  setCommentInputType,
  commentInputType,
  onEnrollCallback,
  selectedComment,
}: Props) {
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const postComment = usePostComment();
  const postRecomment = usePostRecomment();
  const patchComment = usePatchComment();
  const patchRecomment = usePatchRecomment();

  const onSendComment = () => {
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
          commentId: selectedComment?.comment1Id || '',
          recommentId: selectedComment?.id || '',
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

  useEffect(() => {
    if (commentInputType.includes('PATCH')) {
      inputRef.current?.focus();
      setCommentText(selectedComment?.content || '');
    }
  }, [commentInputType, selectedComment]);

  return (
    <Box
      pt="15px"
      pb="43px"
      px="18px"
      borderTopWidth={1}
      borderTopColor={colors.grayScale['0']}>
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
  );
}
