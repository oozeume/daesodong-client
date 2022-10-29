import {Button} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import AddImageIcon from '~/assets/icons/add_image.svg';

function ImageUploader() {
  return (
    <Button variant="unstyled" style={styles.addImageButton}>
      <AddImageIcon />
    </Button>
  );
}

const styles = StyleSheet.create({
  addImageButton: {
    width: 96,
    height: 96,
    marginBottom: 36,
  },
});

export default ImageUploader;
