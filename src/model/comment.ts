import _ from 'lodash';
import {CommentItem} from '~/../types/community';

/**
 *@description 댓글/ 답글 모델링 모듈
 */
class Comment {
  constructor(private readonly comment: CommentItem) {}

  get id() {
    return this.comment.id;
  }

  get userId() {
    return this.comment.userId;
  }

  get content() {
    return this.comment.content ?? '';
  }

  get thanks() {
    return this.comment.thanks ?? 0;
  }

  get parentCommentId() {
    return this.comment.comment1Id ?? null;
  }

  get postId() {
    return this.comment.postId;
  }

  get createdAt() {
    return this.comment.created_at;
  }

  get updatedAt() {
    return this.comment.updated_at ?? null;
  }

  get deletedAt() {
    return this.comment.delete_at ?? null;
  }

  get nickname() {
    return this.comment.user?.nickname ?? '';
  }

  get petInfo() {
    return _.isEmpty(this.comment.user.pets) ? null : this.comment.user.pets[0];
  }

  get recomments() {
    return (this.comment?.comment2 ?? []).map(item => new Comment(item));
  }

  get isBest() {
    return this.comment.best_score >= 20;
  }

  // 유저가 고마워요 눌렀는지 여부
  get isThank() {
    return (
      !_.isEmpty(this.comment.thanks_comment1_join) ||
      !_.isEmpty(this.comment.thanks_comment2_join)
    );
  }
}

export default Comment;
