import {Button, HStack, Image, Pressable, ScrollView, Stack} from 'native-base';
import React, {useEffect, useState} from 'react';
import AddImageIcon from '~/assets/icons/add_image.svg';
import {multipleImagePicker} from '~/utils/image';
import uuid from 'react-native-uuid';
import {RegisterImageData} from '~/../types/community';
import {Platform} from 'react-native';
import {config} from '~/utils/config';
import {colors} from '~/theme/theme';
import CircleDeleteIcon from '~/assets/icons/circle_delete.svg';

const MAX_IMAGE_COUNT = 5;

interface Props {
  reviewForm: any;
  setReviewForm: any;
  images: RegisterImageData[];
  setImages: React.Dispatch<React.SetStateAction<RegisterImageData[]>>;
}

/**
 *@description 이미지 업로더 버튼
 */
function ImageUploader({reviewForm, setReviewForm, images, setImages}: Props) {
  const onDeleteImage = (index: number) => {
    setImages(prev => prev.filter((i, idx) => idx !== index));
  };

  const [isLoading, setLoading] = useState(false);

  const onPress = () => {
    if (!isLoading) {
      setLoading(true);
      multipleImagePicker(MAX_IMAGE_COUNT - images.length)
        .then(response => {
          const _registerPageImageNames: RegisterImageData[] = [];

          response.forEach(item => {
            const cloudImageName = uuid.v4() as string;
            const iosSourceURL = item.sourceURL ?? '';
            const iamgeInfoURI =
              Platform.OS === 'android' ? item.path : iosSourceURL;

            _registerPageImageNames.push({
              registerPageImageName:
                Platform.OS === 'android' ? item.path : iosSourceURL,
              cloudImageName,
              cloudData: {
                uri: iamgeInfoURI,
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

  useEffect(() => {
    setReviewForm({
      ...reviewForm,
      hospital_review_picture: images,
    });
  }, [images]);

  return (
    <>
      <ScrollView horizontal mb={'36px'} showsHorizontalScrollIndicator={false}>
        <HStack space={'6px'}>
          {images &&
            images.map((item, index) => (
              <Stack key={index.toString()}>
                <Image
                  width={'96px'}
                  height={'96px'}
                  source={{
                    uri: `${
                      item.type === 'REGISTERED' ? config.IMAGE_BASE_URL : ''
                    }${item.registerPageImageName}`,
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
              onPress={onPress}>
              <AddImageIcon />
            </Button>
          )}
        </HStack>
      </ScrollView>
    </>
  );
}

export default ImageUploader;
