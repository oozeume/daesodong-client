import {Button} from 'native-base';
import React from 'react';
import AddImageIcon from '~/assets/icons/add_image.svg';

/**
 *@description 이미지 업로더 버튼
 */
function ImageUploader() {
  return (
    <Button variant="unstyled" w="96px" h="96px" mb="36px">
      <AddImageIcon />
    </Button>
  );
}

export default ImageUploader;
