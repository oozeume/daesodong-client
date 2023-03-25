import {Platform} from 'react-native';
import ImagePicker, {
  Image,
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';

import uuid from 'react-native-uuid';
import {PostCloudImageData} from '~/../types/utils';

/**
 * @description 모바일에서 이미지 선택 및 자르기 함수
 * @result
 * "cropRect" : {
 *  "height": 825,
 *  "width": 618,
 *  "x": 155,
 *  "y": 574,
 *  }
 *  "height": 400,
 *  "mime": "image/jpeg",
 *  "modificationDate": "1673063242000"
 *  "path": "file:///storage/emulated/0/Android/data/com.daesodong/files/Pictures/b79e161f-a206-4713-98dd-7640727a7f5b.jpg",
 *  "size": 87458,
 *  "width": 300
 * }
 */

const option: Options = {
  width: 300,
  height: 400,
  cropping: true,
  mediaType: 'photo',
};

export function imagePicker() {
  return ImagePicker.openPicker(option);
}

export function multipleImagePicker(maxFiles = 1) {
  return ImagePicker.openPicker({
    ...option,
    multiple: true,
    maxFiles,
  });
}

/**
 *@description 이미지 선택 핸들러
 *@return appLocalImageName: 저장된 이미지 로컬 주소
 *@return cloudImageName: 클라우드에 저장된 이미지, 서버에 등록 시, 필요
 *@return cloudData: 클라우드 이미지 등록 시, 전송 데이터
 *@return {"REGISTERED" | "UNREGISTERED"} type: 이미지가 현재 클라우드에 저장된 상태 기본값 UNREGISTERED 반환
 */
export const onImagePicker = (): Promise<{
  appLocalImageName: string;
  cloudImageName: string;
  cloudData: PostCloudImageData;
  type: 'REGISTERED' | 'UNREGISTERED';
}> => {
  return imagePicker()
    .then(response => {
      const cloudImageName = uuid.v4() as string;
      const iosSourceURL = response.sourceURL ?? '';
      const imageInfoURI =
        Platform.OS === 'android' ? response.path : iosSourceURL;

      return {
        appLocalImageName:
          Platform.OS === 'android' ? response.path : iosSourceURL,
        cloudImageName,
        cloudData: {
          uri: imageInfoURI,
          type: response.mime,
          name: cloudImageName,
        },
        type: 'UNREGISTERED',
      };
    })
    .catch(error => {
      return error;
    });
};
