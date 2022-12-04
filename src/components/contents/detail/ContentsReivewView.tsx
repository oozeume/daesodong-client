import {Box, Center, HStack, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import ContentDetailReviewImage from '~/assets/images/content_detail_review_image.svg';
import {colors} from '~/theme/theme';

/**
 *@description 컨텐츠 리뷰 뷰
 */
const ContentsReivewView = () => {
  const [contentReview, setContentReview] = useState(0);

  return (
    <Box mb="120px" px="18px">
      <Center>
        <ContentDetailReviewImage />

        <Text
          mt="20px"
          mb="12px"
          fontSize={'14px'}
          fontWeight={500}
          color={colors.grayScale['70']}>
          이번 콘텐츠 어땠나요?
        </Text>

        <HStack>
          <Pressable
            flex={1}
            h={'50px'}
            mr="8px"
            bgColor={
              contentReview === 1
                ? colors.fussOrange['-40']
                : colors.grayScale['0']
            }
            borderColor={
              contentReview === 1
                ? colors.fussOrange['0']
                : colors.grayScale['30']
            }
            borderWidth={'1px'}
            borderRadius={'8px'}
            onPress={() => setContentReview(1)}>
            <Text
              color={
                contentReview === 1
                  ? colors.fussOrange['0']
                  : colors.grayScale['50']
              }
              lineHeight={'52px'}
              textAlign={'center'}>
              {'도움이 되었어요'}
            </Text>
          </Pressable>

          <Pressable
            flex={1}
            h={'50px'}
            bgColor={
              contentReview === 2
                ? colors.fussOrange['-40']
                : colors.grayScale['0']
            }
            borderColor={
              contentReview === 2
                ? colors.fussOrange['0']
                : colors.grayScale['30']
            }
            borderWidth={'1px'}
            borderRadius={'8px'}
            onPress={() => setContentReview(2)}>
            <Text
              color={
                contentReview === 2
                  ? colors.fussOrange['0']
                  : colors.grayScale['50']
              }
              lineHeight={'52px'}
              textAlign={'center'}>
              {'조금 아쉬워요'}
            </Text>
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};

export default ContentsReivewView;
