import {GetCommunityPostResponse} from '~/../types/api/community';

class Post {
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
    return this.post?.thanks ?? 0;
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
    return this.post?.views ?? 0;
  }
}

export default Post;
