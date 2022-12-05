import {Box, HStack, ScrollView} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeleteIcon from '~/assets/icons/delete.svg';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import Header from '~/components/hospital/review/register/Header';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import Popup from '~/components/common/popup/Popup';
import Comment from '~/components/common/comment';
import {APP_WIDTH} from '~/utils/dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/**
 *@description 컨텐츠 댓글 리스트
 */
const ContentsCommentsList = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [comment, setComment] = useState('');

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  const commentInputHeight = 98;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeAreaView>
        <ScrollView bgColor={colors.grayScale['0']} minHeight="100%">
          <Header
            title={'댓글 23'}
            rightButton={
              <HStack position="absolute" right={18} zIndex={1}>
                <DeleteIcon onPress={() => navigation.goBack()} />
              </HStack>
            }
          />

          <Popup
            title={'게시글을 삭제할까요?'}
            subText="삭제한 게시글의 내용은 복구할 수 없어요"
            isVisible={isOpenDeletePopup}
            setIsVisible={setIsOpenDeletePopup}
          />

          {/* 댓글 리스트 */}
          <Box mb={`${commentInputHeight}px`}>
            {['', '', '', ''].map((item, i) => (
              <React.Fragment key={i.toString()}>
                <Comment
                  isBest
                  onRegisterRecomment={() =>
                    navigation.navigate('ContentsRecommentsList')
                  }
                />
                <Comment
                  commentType="delete"
                  onRegisterRecomment={() =>
                    navigation.navigate('ContentsRecommentsList')
                  }
                />
              </React.Fragment>
            ))}
          </Box>
        </ScrollView>

        {/* 댓글 입력 */}
        <Box
          w={APP_WIDTH}
          position="absolute"
          bottom={0}
          pt="6px"
          pb="40px"
          px="18px"
          borderTopWidth={1}
          borderTopColor={colors.grayScale['20']}
          bgColor={colors.grayScale['0']}
          zIndex={10}>
          <VerificationForm
            placeholder="댓글을 남겨주세요"
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ContentsCommentsList;
