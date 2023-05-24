export interface NativeConfig {
  BASE_URL: string;
  GOOGLE_OAUTH_IOS_CLIENT_ID: string;
  GOOGLE_OAUTH_ANDROID_CLIENT_ID: string;
  IMAGE_BASE_URL: string;
  ACCESS_TOKEN_NAME: string;
  REFRESH_TOKEN_NAME: string;
  KAKAO_TOKEN: string;
  NAVER_CLIENT_KEY: string;
  NAVER_SECRET_CLIENT_KEY: string;
}

export interface PostCloudImageData {
  uri: string;
  type: string;
  name: string;
}
