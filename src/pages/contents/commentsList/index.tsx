import {Box, FlatList} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme/theme';
import VerificationForm from '~/components/common/VerificationForm';
import Button from '~/components/common/button';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import Popup from '~/components/common/popup/Popup';
import Comment from '~/components/common/comment';
import {APP_WIDTH} from '~/utils/dimension';
import useGetKeyboardHeight from '~/hooks/useGetKeyboardHeight';

/**
 *@description 컨텐츠 댓글 리스트
 */
const ContentsCommentsList = () => {
  const keyobardHeight = useGetKeyboardHeight();
  const [androidKeyboardHeight, setAndroiKeyboardHeight] = useState(0);

  const navigation = useNavigation<NavigationHookProp>();
  const [comment, setComment] = useState('');

  // 게시글 삭제 팝업 on/off state
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  const flatListMarginBottom = 90;

  return (
    <SafeAreaView>
      <Popup
        title={'게시글을 삭제할까요?'}
        subText="삭제한 게시글의 내용은 복구할 수 없어요"
        isVisible={isOpenDeletePopup}
        setIsVisible={setIsOpenDeletePopup}
      />

      <FlatList
        ListFooterComponent={() => <Box></Box>}
        ListFooterComponentStyle={{marginBottom: flatListMarginBottom}}
        scrollIndicatorInsets={{bottom: 264}}
        bgColor={colors.grayScale['0']}
        minHeight="100%"
        data={['', '', '', '', '', '', '', '', '', '', '']}
        keyExtractor={(item, index) => String(index)}
        renderItem={info => (
          <Comment
            isBest={info.index === 0 || info.index === 10}
            commentType={info.index % 2 === 0 ? 'default' : 'delete'}
            onRegisterRecomment={() =>
              navigation.navigate('ContentsRecommentsList')
            }
          />
        )}
      />

      <Box
        w={APP_WIDTH}
        position="absolute"
        bottom={keyobardHeight || `${androidKeyboardHeight}px`}
        pt="6px"
        pb="28px"
        px="18px"
        borderTopWidth={1}
        borderTopColor={colors.grayScale['20']}
        bgColor={colors.grayScale['0']}
        zIndex={9999}>
        <VerificationForm
          placeholder="댓글을 남겨주세요"
          value={comment}
          onChangeText={text => setComment(text)}
          noBorderBottom
          onFocus={e => {
            setAndroiKeyboardHeight(270);
          }}
          onBlur={() => {
            setAndroiKeyboardHeight(0);
          }}
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
  );
};

export default ContentsCommentsList;
