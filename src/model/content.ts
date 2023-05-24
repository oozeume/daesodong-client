import dayjs from 'dayjs';
import _ from 'lodash';
import {ContentsResponse} from '~/../types/api/contents';

class Content {
  constructor(private readonly content?: ContentsResponse) {}

  get id() {
    return this.content?.id ?? '';
  }

  get representiveImage() {
    return this.content?.content_picture[0].picture_url ?? '';
  }

  get bookmarksCount() {
    return this.content?.save_content.length ?? 0;
  }

  get tags() {
    return this.content?.tag.map(i => i.content_tag.name) ?? [];
  }

  get images() {
    return (
      this.content?.content_picture
        .filter((i, index) => index !== 0)
        .map(i => i.picture_url) ?? []
    );
  }

  get categoryName() {
    return '';
  }

  get title() {
    return this.content?.title ?? '';
  }

  get viewCount() {
    return this.content?.views ?? 0;
  }

  get createdAt() {
    if (this.content) {
      return dayjs(this.content.created_at).format('YYYY.MM.DD');
    } else {
      return '';
    }
  }

  get description() {
    if (this.content) {
      const contentList = this.content.content
        .split(`'`)
        .filter(i => i.length > 1);

      return contentList[0];
    } else {
      return '';
    }
  }

  get subTitle() {
    if (this.content) {
      const contentList = this.content.content
        .split(`'`)
        .filter(i => i.length > 1);

      return contentList[1] ?? '';
    } else {
      return '';
    }
  }

  get subDescription() {
    if (this.content) {
      const contentList = this.content.content
        .split(`'`)
        .filter(i => i.length > 1);

      return contentList[contentList.length - 1] ?? '';
    } else {
      return '';
    }
  }

  isBookmark(userId?: string) {
    if (userId) {
      return (
        this.content?.save_content.map(i => i.userId).includes(userId) ?? false
      );
    } else {
      return false;
    }
  }

  hasEstimation(userId: string) {
    if (this.content) {
      return (
        this.content.it_doesnt_help.filter(i => i.id === userId).length > 0 ||
        this.content.it_help.filter(i => i.id === userId).length > 0
      );
    } else {
      return false;
    }
  }

  isHelpful(userId: string) {
    if (this.content) {
      return this.content?.it_help.filter(i => i.id === userId).length > 0;
    } else {
      return false;
    }
  }
}

export default Content;
