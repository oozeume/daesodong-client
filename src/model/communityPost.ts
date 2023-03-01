import _ from 'lodash';
import {GetCommunityPostResponse} from '~/../types/api/community';

/**
 *@description 커뮤니티 게시글 모델링
 */
class CommunityPost {
  constructor(private readonly post: GetCommunityPostResponse) {}

  get id() {
    return this.post.id;
  }

  get title() {
    return this.post.title ?? '';
  }

  get content() {
    return this.post.content ?? '';
  }

  get kind() {
    return this.post.kind;
  }

  get kindId() {
    return this.post.kindId;
  }

  get images() {
    return (this.post?.post_picture ?? []).map(({postId, picture_url}) => ({
      postId,
      url: picture_url,
    }));
  }

  get imageNameList() {
    return (this.post?.post_picture ?? []).map(
      ({picture_url}) => picture_url ?? '',
    );
  }

  get tagNameList() {
    return (this.post?.post_tag_join ?? []).map(
      ({post_tag}) => post_tag?.name ?? '',
    );
  }

  get tags() {
    return this.post?.post_tag_join ?? [];
  }

  get thanks() {
    return this.post.thanks;
  }

  get createdAt() {
    return this.post.created_at;
  }

  get updatedAt() {
    return this.post.updated_at;
  }

  get userId() {
    return this.post.userId;
  }

  get views() {
    return this.post.views;
  }

  get writerNickname() {
    return this.post?.user?.nickname ?? '';
  }

  get writerPetInfo() {
    const petInfos = this.post?.user?.pets;
    const initPetInfo = {
      age: 0,
      name: '',
      pet_picture_url: undefined,
      specie: {name: ''},
    };

    return petInfos ? petInfos[0] : initPetInfo;
  }

  get commentsCount() {
    return this.post.comments;
  }

  get isThank() {
    return !_.isEmpty(this.post.thanks_post_join);
  }
}

export default CommunityPost;
