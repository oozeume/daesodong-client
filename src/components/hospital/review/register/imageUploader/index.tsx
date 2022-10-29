import {Button} from 'native-base';
import React from 'react';
import AddImageIcon from '~/assets/icons/add_image.svg';

function ImageUploader() {
  return (
    <Button variant="unstyled" width="96px" height="96px" marginBottom="36px">
      <AddImageIcon />
    </Button>
  );
}

export default ImageUploader;
