export interface NativeConfig {
  BASE_URL: string;
  GOOGLE_OAUTH_IOS_CLIENT_ID: string;
  GOOGLE_OAUTH_ANDROID_CLIENT_ID: string;
  IMAGE_BASE_URL: string;
}

export interface PostCloudImageData {
  uri: string;
  type: string;
  name: string;
}
