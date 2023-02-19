import {PostImage} from '~/../types/utils';
import {usePostImageUpload} from '~/api/image';

export default function useImageUpload() {
  const postImageUpload = usePostImageUpload();

  const upload = async (imageInfo: PostImage[], callback: () => void) => {
    try {
      for (let i = 0; i < imageInfo.length; i++) {
        const data = new FormData();
        data.append('file', imageInfo[i]);

        await postImageUpload.mutateAsync({data, fileName: imageInfo[i].name});
      }

      callback();
    } catch (error) {}
  };
  return {upload, postImageUpload};
}
