import {Box, HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {PostFeature, SetState} from '~/../types/common';
import {
  CommentInputType,
  CommentItem,
  OpenDeletePopup,
} from '~/../types/community';
import {useGetUser} from '~/api/user/queries';
import Comment from '~/components/common/comment';
import {colors} from '~/theme/theme';

interface Props {
  setSelectedComment: SetState<CommentItem | undefined>;
  selectedComment?: CommentItem;
  setSelectedRecomment: SetState<CommentItem | undefined>;
  commentList: CommentItem[];
  setOpenDeletePopup: SetState<OpenDeletePopup>;
  setCommentInputType: SetState<CommentInputType>;
  commentInputType: CommentInputType;
}

/**
 *@description 댓글 리스트 컴포넌트
 *@param setOpenDeletePopup - 댓글/답글 삭제 팝업창 on/off setState
 *@param setCommentInputType - 댓글/답글 입력, 수정 타입 설정 setState
 *@param commentInputType - 댓글/답글 입력, 수정 타입 설정 state
 */
export default function CommentList({
  setSelectedComment,
  selectedComment,
  setSelectedRecomment,
  commentList,
  setOpenDeletePopup,
  setCommentInputType,
  commentInputType,
}: Props) {
  const user = useGetUser();

  return (
    <Box>
      {commentList.map((item, i) => (
        <React.Fragment key={i.toString()}>
          <Comment
            userId={user.data?.data?.id}
            data={item}
            onClickKekab={(type: PostFeature) => {
              if (type === 'DELETE')
                setOpenDeletePopup(prev => ({...prev, comment: true}));
              else if (type === 'MODIFY') setCommentInputType('PATCH_COMMENT');

              setSelectedComment(item);
            }}
            onRegisterRecomment={() => {
              setSelectedComment(item);
              setCommentInputType('POST_RECOMMENT');
            }}
          />

          {(item?.comment2 ?? []).map((recomment, k) => (
            <React.Fragment key={k.toString()}>
              <Comment
                userId={user.data?.data?.id}
                commentType="reply"
                data={recomment}
                onClickKekab={(type: PostFeature) => {
                  if (type === 'DELETE')
                    setOpenDeletePopup(prev => ({
                      ...prev,
                      recomment: true,
                    }));

                  setSelectedComment(item);
                  setSelectedRecomment(recomment);
                }}
                parentUserInfo={item.user}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      {commentInputType === 'POST_RECOMMENT' && (
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
            {`@${
              selectedComment?.user?.nickname ?? ''
            } 님에게 답글을 작성중이에요`}
          </Text>

          <Pressable onPress={() => setCommentInputType('POST_COMMENT')}>
            <Text color={colors.grayScale['60']} fontSize="13px">
              취소
            </Text>
          </Pressable>
        </HStack>
      )}
    </Box>
  );
}
