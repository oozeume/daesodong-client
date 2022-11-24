import {
  Box,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BookmarLineIcon from '~/assets/icons/bookmark_line.svg';
import BookmarFillIcon from '~/assets/icons/bookmark_fill.svg';
import BackIcon from '~/assets/icon/back_icon.svg';
import {colors} from '~/theme/theme';
import CommunityComment from '~/components/community/detail/Comment';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import CommunityContent from '~/components/community/detail/Content';
import Header from '~/components/hospital/review/register/Header';
import KebabMenuIcon from '~/assets/icons/kebabMenu.svg';
import {Platform} from 'react-native';

const CommunityDetail = () => {
  const [comment, setComment] = useState('');
  const [isBookmark, setIsBookmark] = useState(false);
  const [isKebabClick, setKebabClick] = React.useState(false);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <SafeAreaView>
        <ScrollView bgColor={colors.grayScale['0']} minHeight="100%">
          <Header
            title={''}
            rightButton={<BackIcon style={{position: 'absolute', left: 18}} />}
            leftButton={
              <HStack position="absolute" right={18} zIndex={1}>
                {isBookmark ? (
                  <BookmarFillIcon
                    fill={colors.fussOrange['0']}
                    style={{marginRight: 16}}
                    onPress={() => setIsBookmark(prev => !prev)}
                  />
                ) : (
                  <BookmarLineIcon
                    fill={colors.grayScale['0']}
                    style={{marginRight: 16}}
                    onPress={() => setIsBookmark(prev => !prev)}
                  />
                )}

                <Pressable onPress={() => setKebabClick(prev => !prev)}>
                  <KebabMenuIcon fill={colors.grayScale['70']} />
                </Pressable>
              </HStack>
            }
          />

          {/* 컨텐츠 */}
          <CommunityContent />

          {isKebabClick && (
            <VStack
              position={'absolute'}
              right={0}
              top={10}
              zIndex={99}
              borderRadius={'8px'}
              space={'20px'}
              borderColor={'black'}
              backgroundColor={'white'}
              p={'16px'}
              shadow={'1'}>
              <Text>수정</Text>
              <Text>삭제</Text>
            </VStack>
          )}

          <Box height="8px" bgColor={colors.grayScale['10']}></Box>

          {/* 댓글 리스트 */}
          <Box>
            <CommunityComment />
            <CommunityComment commentType="reply" />
            <CommunityComment commentType="delete" />
            <CommunityComment commentType="reply" />

            {comment.length !== 0 && (
              <HStack
                justifyContent={'space-between'}
                alignItems="center"
                w="100%"
                position={'absolute'}
                bottom={0}
                h="38px"
                px="18px"
                bgColor={colors.grayScale['90']}>
                <Text color={colors.fussOrange['0']} fontSize="13px">
                  @닉네임 님에게 답글을 작성중이에요
                </Text>

                <Pressable>
                  <Text color={colors.grayScale['60']} fontSize="13px">
                    취소
                  </Text>
                </Pressable>
              </HStack>
            )}
          </Box>

          {/* 댓글 입력 */}
          <Box
            pt="15px"
            pb="43px"
            px="18px"
            borderTopWidth={1}
            borderTopColor={colors.grayScale['0']}>
            <VerificationForm
              placeholder="댓글을 남겨보세요"
              value={comment}
              onChangeText={text => setComment(text)}
              noBorderBottom
              inputRightElement={
                <Button
                  width="53px"
                  text={'등록'}
                  large={false}
                  fontColors={{
                    active: colors.grayScale['90'],
                    disabled: colors.grayScale['40'],
                  }}
                  buttonColors={{
                    active: colors.fussOrange['0'],
                    disabled: colors.fussOrange['-30'],
                  }}
                  borderColors={{
                    active: colors.grayScale['90'],
                    disabled: colors.grayScale['40'],
                  }}
                  active={comment.length !== 0}
                />
              }
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommunityDetail;
