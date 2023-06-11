import _ from 'lodash';
import {Box, Center, HStack, Image, Pressable, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PostFeature} from '~/../types/common';
import {usePostCommentThank} from '~/api/comment/mutation';
import {usePostRecommentThank} from '~/api/recomment/mutation';
import AvatarIcon from '~/assets/icons/avartar.svg';
import ReplyIcon from '~/assets/icons/reply.svg';
import KekabMenu from '~/components/common/kekab/KekabMenu';
import useToastShow from '~/hooks/useToast';
import CommentModel from '~/model/comment';
import {colors} from '~/theme/theme';
import {config} from '~/utils/config';
import {getProgressTime} from '~/utils/time';
import ProfileImage from '../profileImage/ProfileImage';

interface Props {
  commentType?: {
    type: 'default' | 'reply';
    isDelete: boolean;
  };
  onRegisterRecomment?: () => void;
  onClickKekab: (type: PostFeature) => void;
  data?: CommentModel;
  parentUserNickname?: string;
  userId?: string;
}

/**
 *@description 게시글 댓글
 *@param commentType - 댓글 유형 (type: 댓글 | 답글, isDelete: 삭제 여부)
 *@param parentUserNickname - 답글일 경우, 상위 댓글의 유저 닉네임
 */
const Comment = ({
  onRegisterRecomment,
  onClickKekab,
  data,
  parentUserNickname,
  userId,
  commentType = {
    type: 'default',
    isDelete: false,
  },
}: Props) => {
  const postCommentThank = usePostCommentThank();
  const postRecommentThank = usePostRecommentThank();

  const [isThank, setThank] = useState(data?.isThank);
  const [thankCount, setThankCount] = useState(data?.thanks ?? 0);
  const {toastShow} = useToastShow();

  /**
   *@description 댓글 고마워요/취소
   */
  const onThank = () => {
    setThank(!isThank);
    // 현재 isThank state가 true => 고마워요 취소 실행
    setThankCount(prev => {
      if (isThank && prev === 0) return 0;

      return isThank ? prev - 1 : prev + 1;
    });

    if (data?.postId && commentType.type === 'default') {
      postCommentThank.mutateAsync({
        postId: data?.postId,
        commentId: data.id,
        isOn: !isThank,
      });
    } else if (data?.parentCommentId && commentType.type === 'reply') {
      postRecommentThank.mutateAsync({
        commentId: data.parentCommentId,
        recommentId: data.id,
        isOn: !isThank,
      });
    }
  };

  /**
   *@description 삭제된 댓글에 답글 달기 버튼 클릭 이벤트
   */
  const onRecommentByDeletedComment = () => {
    toastShow('삭제된 댓글에는 답글을 남길 수 없어요!');
  };

  return (
    <Box
      px="18px"
      py="14px"
      bgColor={
        commentType.isDelete ? colors.grayScale['10'] : colors.grayScale['0']
      }
      flexDir="row"
      borderBottomWidth={1}
      borderBottomColor={colors.grayScale['10']}>
      {/* 답글 표시 아이콘 */}
      {commentType.type === 'reply' && <ReplyIcon style={{marginRight: 12}} />}

      <Box flex={1}>
        <HStack justifyContent={'space-between'} alignItems="center">
          <HStack alignItems={'center'}>
            <ProfileImage
              imageName={data?.petInfo?.pet_picture_url}
              width={20}
              height={20}
              imageStyle={{marginRight: 8}}
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

          {!commentType.isDelete && (
            <KekabMenu
              firstButtonName={data?.userId === userId ? '수정' : '신고'}
              secondButtonName={data?.userId === userId ? '삭제' : '차단'}
              handleFirstButton={() => onClickKekab('MODIFY')}
              handleSecondButton={() => onClickKekab('DELETE')}
              top={Platform.OS === 'android' ? '36px' : '12px'}
              left={Platform.OS === 'android' ? '-22px' : '-12px'}
            />
          )}
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
            commentType.isDelete
              ? colors.grayScale['50']
              : colors.grayScale['80']
          }>
          {data?.isBest && !commentType.isDelete && (
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

          {data?.isBest && !commentType.isDelete && <Text>{`  `}</Text>}

          {/* 답글 대상 유저 닉네임 */}
          {commentType.type === 'reply' && !commentType.isDelete && (
            <Text color={colors.fussOrange['0']} mr="28px">
              {data?.toUserNickname} <Text>{`  `}</Text>
            </Text>
          )}

          <Text>
            {commentType.isDelete
              ? `삭제된 ${commentType.type === 'reply' ? '답글' : '댓글'}입니다`
              : data?.content ?? ''}
          </Text>
        </Text>

        <HStack ml="28px">
          {!commentType.isDelete && (
            <Pressable
              borderColor={
                isThank ? colors.fussOrange['0'] : colors.grayScale['20']
              }
              bgColor={colors.grayScale['0']}
              borderWidth={1}
              pl="10px"
              pr="8px"
              py="4px"
              mr="6px"
              borderRadius={4}
              onPress={onThank}>
              <HStack>
                <Text
                  color={
                    isThank ? colors.fussOrange['0'] : colors.grayScale['60']
                  }
                  fontSize="13px">
                  {`고마워요 ${thankCount}`}
                </Text>
              </HStack>
            </Pressable>
          )}

          {commentType.type === 'default' &&
            commentType.isDelete &&
            !_.isEmpty(data?.recomments) && (
              <Pressable
                borderColor={colors.grayScale['20']}
                bgColor={colors.grayScale['0']}
                borderWidth={1}
                pl="10px"
                pr="8px"
                py="4px"
                mr="6px"
                borderRadius={4}
                onPress={onRecommentByDeletedComment}>
                <HStack>
                  <Text color={colors.grayScale[40]} fontSize="13px">
                    {`답글 ${data?.recomments.length}`}
                  </Text>
                </HStack>
              </Pressable>
            )}

          {!commentType.isDelete && (
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
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default Comment;
