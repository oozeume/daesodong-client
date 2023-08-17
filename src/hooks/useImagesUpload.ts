import {PostCloudImageData} from '~/../types/utils';
import {usePostImageUpload} from '~/api/image';
import {ErrorResponseTransform} from '../../types/api/common';
import useToastShow from './useToast';

/**
 *@description 이미지 업로드 api 훅 및 요청 핸들러 반환 커스텀 훅
 */
function useImageUpload() {
  const postImageUpload = usePostImageUpload();
  const {toastShow} = useToastShow();

  const onImageUpload = async (
    imageInfo: PostCloudImageData[],
    callback: () => void,
  ) => {
    try {
      for (let i = 0; i < imageInfo.length; i++) {
        const data = new FormData();
        data.append('file', imageInfo[i]);

        await postImageUpload.mutateAsync({data, fileName: imageInfo[i].name});
      }

      // 이미지 클라우드에 업로드 후, 콜백 실행
      callback();
    } catch (error) {
      const _error = error as ErrorResponseTransform;

      toastShow(_error.message);
    }
  };
  return {onImageUpload, postImageUpload};
}

export default useImageUpload;
