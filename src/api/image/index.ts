import {useMutation} from '@tanstack/react-query';
import {PostImageUploadBody} from '~/../types/image';
import {apiCall, imageApiCall} from '../common';

/**
 *@description 이미지 업로드 api 요청
 *@param {string} fileName - 이미지 이름
 *@param {string} bucketName - 저장할 R2버킷 이름
 */
const postImageUpload = async ({
  fileName,
  data,
  bucketName = 'daesodong',
}: PostImageUploadBody) => {
  return imageApiCall<{status: number}>({
    url: `aws/aws/upload/client/file?uploadFileName=${fileName}`,
    data,
  });
};

/**
 *@description 이미지 업로드 api 요청 hook
 *@param {string} fileName - 이미지 이름
 *@param {string} bucketName - 저장할 R2버킷 이름
 */
export const usePostImageUpload = () => {
  return useMutation((data: PostImageUploadBody) => postImageUpload(data));
};
