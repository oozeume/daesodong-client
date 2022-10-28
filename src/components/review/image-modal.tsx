import {AspectRatio, Box, HStack, Modal, Text} from 'native-base';
import React from 'react';
import {Pressable} from 'react-native';
import PaginationButtonLeftIcon from '../../assets/icons/pagination_btn_left.svg';
import PaginationButtonRightIcon from '../../assets/icons/pagination_btn_right.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({isOpen, onClose}: Props) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        w={'100%'}
        onClose={onClose}
        size={'xl'}
        borderRadius={'none'}>
        <Modal.Content p={'18px'}>
          <AspectRatio ratio={339 / 339}>
            <HStack
              w={'100%'}
              h={'339px'}
              justifyContent={'space-between'}
              alignItems={'center'}
              backgroundColor={'white'}>
              <PaginationButtonLeftIcon />
              <PaginationButtonRightIcon />
            </HStack>
          </AspectRatio>
        </Modal.Content>
        <Modal.Footer
          position={'absolute'}
          bottom={0}
          backgroundColor={'grayScale.90'}
          w={'100%'}
          h={'92px'}>
          <HStack w={'100%'} justifyContent={'center'}>
            <Text fontSize={'15px'} color={'white'}>
              1/5
            </Text>
          </HStack>
          <Box position={'absolute'} top={'15px'} right={'18px'}>
            <Pressable onPress={onClose}>
              <Text color={'white'}>닫기</Text>
            </Pressable>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageModal;
