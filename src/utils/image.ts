import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

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

export function imagePicker(): Promise<ImageOrVideo> {
  return ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  });
}
