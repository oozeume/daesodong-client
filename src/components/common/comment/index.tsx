import {Box, Center, HStack, Pressable, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, Platform} from 'react-native';
import AvatarIcon from '~/assets/icons/avartar.svg';
import ReplyIcon from '~/assets/icons/reply.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import {colors} from '~/theme/theme';

interface Props {
  commentType?: 'default' | 'reply' | 'delete';
  onRegisterRecomment?: () => void;
  isBest?: boolean;
}

/**
 *@description 게시글 댓글
 *@param {'default' | 'reply' | 'delete' | undefined} commentType - 댓글 유형 (reply: 답글, delete: 삭제된 댓글)
 *@param {boolean} isBest - BEST 댓글일 경우
 */
const Comment = ({
  onRegisterRecomment,
  isBest,
  commentType = 'default',
}: Props) => {
  const commentWidth = Dimensions.get('screen').width - 36;

  // 답글 내용 길이 값
  const recommentWidth = commentWidth - 28;

  return (
    <Box
      px="18px"
      py="14px"
      bgColor={
        commentType === 'delete'
          ? colors.grayScale['10']
          : colors.grayScale['0']
      }
      flexDir="row"
      borderBottomWidth={1}
      borderBottomColor={colors.grayScale['10']}>
      {/* 답글 표시 아이콘 */}
      {commentType === 'reply' && <ReplyIcon style={{marginRight: 12}} />}

      <Box width={commentType === 'reply' ? recommentWidth : commentWidth}>
        <HStack justifyContent={'space-between'} alignItems="center">
          <HStack alignItems={'center'}>
            <AvatarIcon
              width={20}
              height={20}
              fill={colors.grayScale['30']}
              style={{marginRight: 8}}
            />

            {/* 닉네임, 이름, 동물, 나이 뷰 라인 */}
            <HStack alignItems="center">
              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                닉네임
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                이름
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                동물
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                나이
              </Text>
            </HStack>
          </HStack>

          <KekabMenu
            handleFirstButton={() => {}}
            handleSecondButton={() => {}}
            top={Platform.OS === 'android' ? '0px' : '12px'}
            left={Platform.OS === 'android' ? '0px' : '-12px'}
          />
        </HStack>

        {/* 최초 작성 시간 / 수정됨 뷰 라인 */}
        <HStack mb="8px" ml="28px" alignItems={'center'}>
          <Text fontSize={'12px'} color={colors.grayScale['50']}>
            최초 작성 시간
          </Text>

          <Text color={colors.grayScale['30']}>{' ∙ '}</Text>

          <Text fontSize={'12px'} color={colors.grayScale['50']}>
            수정됨
          </Text>
        </HStack>

        {/* 댓글 내용 */}
        <Text
          mb="12px"
          ml="28px"
          mr="32px"
          fontSize="14px"
          color={
            commentType === 'delete'
              ? colors.grayScale['50']
              : colors.grayScale['80']
          }>
          {isBest && (
            <Center
              px="6px"
              py="2px"
              borderRadius={4}
              bgColor={colors.fussOrange['-30']}>
              <Text
                color={colors.fussOrange['0']}
                fontSize="11px"
                fontWeight={500}>
                BEST
              </Text>
            </Center>
          )}

          {isBest && <Text>{`  `}</Text>}

          {commentType === 'reply' && (
            <Text color={colors.fussOrange['0']} mr="28px">
              {`닉네임`} <Text>{`  `}</Text>
            </Text>
          )}
          <Text>
            {commentType === 'delete'
              ? '삭제된 댓글입니다'
              : '지나고 그러나 그리워 다 같이 봅니다. 잔디가 나는 위에 무엇인지 아무 듯합니다. 피어나듯이 불러 당신은 내 말 위에도 부끄러운 했던 계십니다'}
          </Text>
        </Text>

        <HStack ml="28px">
          <Pressable
            borderColor={colors.grayScale['20']}
            bgColor={colors.grayScale['0']}
            borderWidth={1}
            pl="10px"
            pr="8px"
            py="4px"
            mr="6px"
            borderRadius={4}>
            <HStack>
              <Text color={colors.grayScale['60']} fontSize="13px" mr="2px">
                고마워요
              </Text>
              <Text color={colors.grayScale['60']} fontSize="13px">
                00
              </Text>
            </HStack>
          </Pressable>

          <Pressable
            borderColor={colors.grayScale['20']}
            bgColor={colors.grayScale['0']}
            borderWidth={1}
            pl="10px"
            pr="8px"
            py="4px"
            mr="6px"
            borderRadius={4}
            onPress={onRegisterRecomment}>
            <Text color={colors.grayScale['60']} fontSize="13px">
              답글달기
            </Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
};

export default Comment;
