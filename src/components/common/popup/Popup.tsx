import React from 'react';
import {Center, Modal, Pressable, Text} from 'native-base';
import {colors} from '~/theme/theme';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {APP_WIDTH} from '~/utils/dimension';

const MODAL_PADDING_X = 18;

interface Props {
  title: string;
  subText?: string;
  bodyElement?: JSX.Element;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  cancelButtonName?: string;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonNameStyle?: StyleProp<TextStyle>;
  successButtonName?: string;
  successButtonStyle?: StyleProp<ViewStyle>;
  successButtonNameStyle?: StyleProp<TextStyle>;
  invisibleCancelButton?: boolean;
}

/**
 * 공통 popup 컴포넌트
 * @param {string} title popup 제목
 * @param {string} subText 제목 하단 내용
 * @param {JSX.Element} bodyElement modal body 부분에 추가할 input이나 다른 컴포넌트
 * @param {string} cancelButtonName 커스텀 취소 버튼 이름 (default: 취소)
 * @param {string} successButtonName 성공 버튼 이름 (ex: 삭제, 신고, default: 삭제)
 */
function Popup({
  title,
  subText,
  bodyElement,
  isVisible,
  setIsVisible,
  onCancel,
  onSuccess,
  invisibleCancelButton = false,
  cancelButtonName = '취소',
  cancelButtonStyle,
  cancelButtonNameStyle,
  successButtonName = '삭제',
  successButtonStyle,
  successButtonNameStyle,
}: Props) {
  const _onCancel = () => {
    if (onCancel) onCancel();
    setIsVisible(false);
  };

  const _onSuccess = () => {
    if (onSuccess) onSuccess();
    setIsVisible(false);
  };
  return (
    <Modal isOpen={isVisible} onClose={() => setIsVisible(false)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal.Content
          style={styles.container}
          borderWidth={1}
          borderColor={colors.grayScale['90']}>
          <Modal.Header py="28px" px="20px" borderBottomWidth={0}>
            <Text fontSize={'16px'} mb={'8px'} color={colors.grayScale['80']}>
              {title}
            </Text>
            {subText && (
              <Text color={colors.grayScale['60']} fontSize="14px">
                {subText}
              </Text>
            )}
          </Modal.Header>

          {bodyElement && (
            <Modal.Body px="20px" mb="28px">
              {bodyElement}
            </Modal.Body>
          )}

          <Modal.Footer
            p="0"
            borderTopWidth={1}
            borderColor={colors.grayScale['90']}>
            {!invisibleCancelButton && (
              <Pressable
                flex="1"
                onPress={_onCancel}
                bgColor={colors.grayScale['10']}
                style={cancelButtonStyle}>
                <Center h="52px">
                  <Text
                    fontSize={'16px'}
                    color={colors.grayScale['90']}
                    style={cancelButtonNameStyle}>
                    {cancelButtonName}
                  </Text>
                </Center>
              </Pressable>
            )}

            <Pressable
              flex="1"
              borderLeftWidth={invisibleCancelButton ? 0 : 1}
              borderColor={colors.grayScale['90']}
              backgroundColor={colors.negative['0']}
              style={successButtonStyle}
              onPress={_onSuccess}>
              <Center h="52px">
                <Text
                  fontSize={'16px'}
                  color={colors.grayScale['90']}
                  style={successButtonNameStyle}>
                  {successButtonName}
                </Text>
              </Center>
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default Popup;

const styles = StyleSheet.create({
  container: {
    width: APP_WIDTH - MODAL_PADDING_X * 2,
    backgroundColor: 'white',
  },
});
