import {Button, HStack, Image, Pressable, ScrollView, Stack} from 'native-base';
import React, {useState} from 'react';
import AddImageIcon from '~/assets/icons/add_image.svg';
import {multipleImagePicker} from '~/utils/image';
import uuid from 'react-native-uuid';
import {RegisterImageData} from '~/../types/community';
import {Platform} from 'react-native';
import {config} from '~/utils/config';
import {colors} from '~/theme/theme';
import CircleDeleteIcon from '~/assets/icons/circle_delete.svg';
import {SetState} from '~/../types/common';

const MAX_IMAGE_COUNT = 5;

/**
 *@description 이미지 업로드 컴포넌트
 */

interface Props {
  images: RegisterImageData[];
  setImages: SetState<RegisterImageData[]>;
}

function ImageUploader({images, setImages}: Props) {
  const [isLoading, setLoading] = useState(false);

  const onDeleteImage = (index: number) => {
    setImages((prev: any[]) =>
      prev.filter((i: number, idx: number) => idx !== index),
    );
  };

  const onAddImages = () => {
    if (!isLoading) {
      setLoading(true);

      multipleImagePicker(MAX_IMAGE_COUNT - images.length)
        .then(response => {
          const _registerPageImageNames: RegisterImageData[] = [];

          response.forEach(item => {
            const cloudImageNameUUID = uuid.v4() as string;
            const iosSourceURL = item.sourceURL ?? '';
            let imageInfoURI =
              Platform.OS === 'android' ? item.path : iosSourceURL;

            const uriSplitDot = imageInfoURI.split('.');
            const ext = uriSplitDot[uriSplitDot.length - 1];

            const cloudImageName = `${cloudImageNameUUID}.${ext}`;

            _registerPageImageNames.push({
              registerPageImageName:
                Platform.OS === 'android' ? item.path : iosSourceURL,
              cloudImageName,
              cloudData: {
                uri: imageInfoURI,
                type: item.mime,
                name: cloudImageName,
              },
              type: 'UNREGISTERED',
            });
          });

          setImages(prev => [...prev, ..._registerPageImageNames]);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <ScrollView horizontal mb={'36px'} showsHorizontalScrollIndicator={false}>
      <HStack space={'6px'}>
        {images &&
          images.map((item, index) => (
            <Stack key={index.toString()}>
              <Image
                width={'96px'}
                height={'96px'}
                source={{
                  uri:
                    item.type === 'UNREGISTERED'
                      ? `${item.registerPageImageName}`
                      : `${config.IMAGE_BASE_URL}${item.cloudImageName}`,
                }}
                alt={'image'}
              />

              <Pressable
                onPress={() => onDeleteImage(index)}
                position={'absolute'}
                width="32px"
                height="32px"
                justifyContent={'center'}
                alignItems={'center'}
                top={0}
                right={0}>
                <CircleDeleteIcon fill={colors.grayScale[90]} />
              </Pressable>
            </Stack>
          ))}

        {images.length < MAX_IMAGE_COUNT && (
          <Button
            variant="unstyled"
            w="96px"
            h="96px"
            mb="36px"
            onPress={onAddImages}>
            <AddImageIcon />
          </Button>
        )}
      </HStack>
    </ScrollView>
  );
}

export default ImageUploader;
