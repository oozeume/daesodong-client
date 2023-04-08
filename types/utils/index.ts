export interface NativeConfig {
  BASE_URL: string;
  GOOGLE_OAUTH_IOS_CLIENT_ID: string;
  GOOGLE_OAUTH_ANDROID_CLIENT_ID: string;
  IMAGE_BASE_URL: string;
  ACCESS_TOKEN_NAME: string;
  REFRESH_TOKEN_NAME: string;
}

export interface PostCloudImageData {
  uri: string;
  type: string;
  name: string;
}

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
