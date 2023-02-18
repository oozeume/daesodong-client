import _ from 'lodash';
import {Box, Center, HStack, Pressable, Text, View} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {PostFeature} from '~/../types/common';
import {CommentUserInfo} from '~/../types/community';
import AvatarIcon from '~/assets/icons/avartar.svg';
import ReplyIcon from '~/assets/icons/reply.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import CommentModel from '~/model/comment';
import {colors} from '~/theme/theme';
import {getProgressTime} from '~/utils/time';

interface Props {
  commentType?: 'default' | 'reply' | 'delete';
  onRegisterRecomment?: () => void;
  onClickKekab: (type: PostFeature) => void;
  isBest?: boolean;
  data?: CommentModel;
  parentUserNickname?: string;
  userId?: string;
}

/**
 *@description 게시글 댓글
 *@param {'default' | 'reply' | 'delete' | undefined} commentType - 댓글 유형 (reply: 답글, delete: 삭제된 댓글)
 *@param {boolean} isBest - BEST 댓글일 경우
 *@param {CommentUserInfo} parentUserInfo - 답글일 경우, 상위 댓글의 유저 정보
 */
const Comment = ({
  onRegisterRecomment,
  isBest,
  onClickKekab,
  data,
  parentUserNickname,
  userId,
  commentType = 'default',
}: Props) => {
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

      <Box flex={1}>
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
                {data?.nickname}
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                {(!_.isEmpty(data?.petInfo) && data?.petInfo?.name) || ''}
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                {(!_.isEmpty(data?.petInfo) && data?.petInfo?.specie?.name) ||
                  ''}
              </Text>

              <View
                backgroundColor={colors.grayScale['30']}
                h="8px"
                w="1px"
                mx="4px"
              />

              <Text fontSize={'12px'} color={colors.grayScale['60']}>
                {(!_.isEmpty(data?.petInfo) && data?.petInfo?.age) || ''}
                개월
              </Text>
            </HStack>
          </HStack>

          <KekabMenu
            firstButtonName={data?.userId === userId ? '수정' : '신고'}
            secondButtonName={data?.userId === userId ? '삭제' : '차단'}
            handleFirstButton={() => onClickKekab('MODIFY')}
            handleSecondButton={() => onClickKekab('DELETE')}
            top={Platform.OS === 'android' ? '36px' : '12px'}
            left={Platform.OS === 'android' ? '-22px' : '-12px'}
          />
        </HStack>

        {/* 최초 작성 시간 / 수정됨 뷰 라인 */}
        <HStack mb="8px" ml="28px" alignItems={'center'}>
          <Text fontSize={'12px'} color={colors.grayScale['50']}>
            {getProgressTime(data?.createdAt, data?.updatedAt || undefined)}
          </Text>

          <Text color={colors.grayScale['30']}>{' ∙ '}</Text>

          <Text fontSize={'12px'} color={colors.grayScale['50']}>
            {data?.createdAt === data?.updatedAt ? '' : '수정됨'}
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
              {parentUserNickname ?? ''} <Text>{`  `}</Text>
            </Text>
          )}
          <Text>
            {commentType === 'delete'
              ? '삭제된 댓글입니다'
              : data?.content ?? ''}
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
                {data?.thanks ?? 0}
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
