import _ from 'lodash';
import {GetContentsResponse} from '~/../types/api/contents';

class Content {
  constructor(private readonly content: GetContentsResponse) {}

  get id() {
    return this.content.id ?? '';
  }

  get representiveImage() {
    if (!_.isEmpty(this.content.content_picture)) {
      return this.content.content_picture[0].picture_url;
    } else {
      return '';
    }
  }

  get categoryName() {
    return '';
  }

  get title() {
    return this.content.title ?? '';
  }

  get viewCount() {
    return this.content.views ?? 0;
  }

  get bookmarkCount() {
    return this.content.save_content.length ?? 0;
  }
}

export default Content;
