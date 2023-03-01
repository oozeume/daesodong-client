import _ from 'lodash';
import {Box} from 'native-base';
import React from 'react';
import {PostFeature, SetState} from '~/../types/common';
import {CommentInputType, OpenDeletePopup} from '~/../types/community';
import {useGetUser} from '~/api/user/queries';
import Comment from '~/components/common/comment';
import CommentModel from '~/model/comment';

interface Props {
  setSelectedComment: SetState<CommentModel | undefined>;
  setSelectedRecomment: SetState<CommentModel | undefined>;
  commentList: CommentModel[];
  setOpenDeletePopup: SetState<OpenDeletePopup>;
  setCommentInputType: SetState<CommentInputType>;
}

/**
 *@description 댓글 리스트 컴포넌트
 *@param setOpenDeletePopup - 댓글/답글 삭제 팝업창 on/off setState
 *@param setCommentInputType - 댓글/답글 입력, 수정 타입 설정 setState
 */
function CommentList({
  setSelectedComment,
  setSelectedRecomment,
  commentList,
  setOpenDeletePopup,
  setCommentInputType,
}: Props) {
  const user = useGetUser();

  return (
    <Box>
      {commentList.map((item, i) => (
        <React.Fragment key={i.toString()}>
          <Comment
            commentType={{
              type: 'default',
              isDelete: !_.isNull(item.deletedAt),
            }}
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

          {(item?.recomments).map((recomment, k) => (
            <React.Fragment key={k.toString()}>
              <Comment
                userId={user.data?.data?.id}
                commentType={{
                  type: 'reply',
                  isDelete: !_.isNull(recomment.deletedAt),
                }}
                data={recomment}
                onClickKekab={(type: PostFeature) => {
                  if (type === 'DELETE')
                    setOpenDeletePopup(prev => ({
                      ...prev,
                      recomment: true,
                    }));
                  else if (type === 'MODIFY')
                    setCommentInputType('PATCH_RECOMMENT');

                  setSelectedComment(item);
                  setSelectedRecomment(recomment);
                }}
                parentUserNickname={item.nickname}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default CommentList;
