import {Box, Center, HStack, Pressable, Text, useDisclose} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {
  useDeleteReactedContents,
  useReactedContents,
} from '~/api/contents/mutation';
import {useGetUser} from '~/api/user/queries';
import ContentDetailReviewImage from '~/assets/images/content_detail_review_image.svg';
import Content from '~/model/content';
import {colors} from '~/theme/theme';
import ReviewPopup from './ReviewPopup';

interface Props {
  content: Content;
}

/**
 *@description 컨텐츠 리뷰 뷰
 */
const ContentsReivewView = ({content}: Props) => {
  const {data: userData} = useGetUser();
  const {isOpen, onOpen, onClose} = useDisclose();

  const [isHelpful, setHelpful] = useState<boolean | undefined>(undefined);

  const userId = useMemo(() => {
    if (userData) {
      return userData.id;
    } else {
      return '';
    }
  }, [userData]);

  const {mutateAsync: reactContents} = useReactedContents(content.id);
  const {mutateAsync: cancelReactContents} = useDeleteReactedContents(
    content.id,
  );

  const reactHelpful = () => {
    reactContents({
      isHelp: true,
      reason: '',
    }).then(() => setHelpful(true));
  };

  const onHelpful = () => {
    if (isHelpful === false) {
      cancelReactContents(isHelpful).then(() => {
        reactHelpful();
      });
    } else {
      reactHelpful();
    }
  };

  const reactDisappoint = (text: string) => {
    reactContents({
      isHelp: false,
      reason: text,
    }).then(() => {
      setHelpful(false);
    });
  };

  const onDisappoint = (text: string) => {
    if (isHelpful) {
      cancelReactContents(isHelpful).then(() => {
        reactDisappoint(text);
      });
    } else {
      reactDisappoint(text);
    }
  };

  useEffect(() => {
    if (userId) {
      content.hasEstimation(userId)
        ? setHelpful(content.isHelpful(userId))
        : setHelpful(undefined);
    }
  }, [userId, content]);

  return (
    <Box mb="120px" px="18px">
      <ReviewPopup
        visible={isOpen}
        onOK={onDisappoint}
        onCancel={onClose}
        title={'무엇이 아쉬우셨나요?🥲'}
        exampleTextList={[
          '소개한 내용의 예시를 더 자세히 알고 싶어요!',
          '다른 동물에 관련된 정보고 알고 싶어요!',
        ]}
        placeholder={
          '콘텐츠를 읽으면서 궁금했던 점을 알려주시면 대소동팀이 더 열심히 공부해서 알려드릴게요.'
        }
      />

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
              isHelpful ? colors.fussOrange['-40'] : colors.grayScale['0']
            }
            borderColor={
              isHelpful ? colors.fussOrange['0'] : colors.grayScale['30']
            }
            borderWidth={'1px'}
            borderRadius={'8px'}
            disabled={isHelpful}
            onPress={onHelpful}>
            <Text
              color={
                isHelpful ? colors.fussOrange['0'] : colors.grayScale['50']
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
              isHelpful === false
                ? colors.fussOrange['-40']
                : colors.grayScale['0']
            }
            borderColor={
              isHelpful === false
                ? colors.fussOrange['0']
                : colors.grayScale['30']
            }
            borderWidth={'1px'}
            borderRadius={'8px'}
            disabled={isHelpful === false}
            onPress={onOpen}>
            <Text
              color={
                isHelpful === false
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
