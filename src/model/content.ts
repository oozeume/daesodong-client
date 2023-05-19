import {ContentsResponse} from '~/../types/api/contents';

class Content {
  constructor(private readonly content: ContentsResponse) {}

  get id() {
    return this.content.id ?? '';
  }

  get representiveImage() {
    return this.content.content_picture[0].picture_url;
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
