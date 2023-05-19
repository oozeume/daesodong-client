export interface ContentsResponse {
  id: string;
  title: string;
  content: string;
  views: number;
  expose: boolean;
  created_at: string;
  updated_at: string;
  tag: Tag[];
  it_help: any[];
  it_doesnt_help: any[];
  save_content: any[];
  content_picture: ContentPicture[];
}

export interface Tag {
  contentId: string;
  contenttagId: string;
  content_tag: ContentTag;
}

export interface ContentTag {
  id: string;
  name: string;
}

export interface ContentPicture {
  picture_url: string;
}
