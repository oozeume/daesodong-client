import {Button, Center, HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {GestureResponderEvent, StyleProp, StyleSheet} from 'react-native';
import CircleCheckIcon from '~/assets/icons/circle_check.svg';
import CircleUncheckIcon from '~/assets/icons/circle_uncheck.svg';
import BackIcon from '~/assets/icons/back.svg';
import DeleteIcon from '~/assets/icons/delete.svg';
import {ViewStyle} from 'react-native';

interface IconButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 *@description 뒤로가기 버튼
 *@param {ViewStyle} buttonStyle - 버튼 추가 스타일
 *@param {ViewStyle} iconStyle - 아이콘 추가 스타일
 *@param {() => void)} onPress - 클릭 이벤트 함수
 */
function BackButton({buttonStyle, iconStyle, onPress}: IconButtonProps) {
  return (
    <Button
      position="absolute"
      left="8px"
      backgroundColor="#ffffff00"
      onPress={onPress}
      style={buttonStyle}>
      <BackIcon style={iconStyle} />
    </Button>
  );
}

/**
 *@description 페이지 닫기 버튼
 *@param {ViewStyle} buttonStyle - 버튼 추가 스타일
 *@param {ViewStyle} iconStyle - 아이콘 추가 스타일
 *@param {() => void)} onPress - 클릭 이벤트 함수
 */
function CloseButton({buttonStyle, iconStyle, onPress}: IconButtonProps) {
  return (
    <Button
      onPress={onPress}
      position="absolute"
      right="8px"
      backgroundColor="#ffffff00"
      style={buttonStyle}>
      <DeleteIcon style={iconStyle} />
    </Button>
  );
}

/**
 *@description 후기 작성 주의 사항 안내 버튼
 */
function ReviewPrecautionButton({onPress}: {onPress: () => void}) {
  return (
    <Pressable
      paddingY={0}
      width="150px"
      height="24px"
      marginBottom="36px"
      borderColor="#000"
      onPress={onPress}>
      <Text color="#FF6B00" fontSize="13px" textDecorationLine="underline">
        후기 작성시 주의사항 안내
      </Text>
    </Pressable>
  );
}

interface CheckedButtonProps<T extends number | boolean> {
  isChecked: T;
  setCheck: (isChecked: T) => void;
}

interface RevisitCheckButtonProps<T extends number | boolean>
  extends CheckedButtonProps<T> {
  text: string;
  checkValue: number;
}

/**
 *@description 이 병원을 다시 방문하시겠습니까? 체크 버튼
 *@param {string} text - 버튼 텍스트
 *@param {number} checkValue - 체크 여부 숫자 해당 prop과 isChecked과 일치하면 체크, 불일치 미체크
 *@param {string} isChecked - 체크 여부 state
 *@param {string} setCheck - 체크 state 변경 이벤트 함수
 */
const RevisitCheckButton = ({
  text,
  checkValue,
  isChecked,
  setCheck,
}: RevisitCheckButtonProps<number>) => {
  const checkedButtonStyle =
    isChecked === checkValue ? styles.revisitCheckedButton : undefined;
  const checkedTextStyle =
    isChecked === checkValue ? styles.revisitCheckedText : undefined;
  return (
    <Pressable
      style={checkedButtonStyle}
      width="48.5%"
      height="50px"
      borderRadius={8}
      borderColor="#E1E2E4"
      borderWidth="1px"
      variant="outline"
      onPress={() => setCheck(isChecked === checkValue ? 0 : checkValue)}>
      <Center height="100%">
        <Text color="#9EA1A8" style={checkedTextStyle}>
          {text}
        </Text>
      </Center>
    </Pressable>
  );
};

/**
 *@description 이 병원을 여러번 방문할지 여부에 대한 버튼
 */
function MoreVisitCheckButton({
  isChecked,
  setCheck,
}: CheckedButtonProps<boolean>) {
  return (
    <Button
      variant={'unstyled'}
      marginBottom="24px"
      onPress={() => setCheck(!isChecked)}>
      <HStack alignItems="center">
        {isChecked ? (
          <CircleCheckIcon style={styles.moreVisitCheckIcon} />
        ) : (
          <CircleUncheckIcon style={styles.moreVisitCheckIcon} />
        )}
        <Text fontSize="15px" color="#7F838C">
          이 병원을 여러번 방문했어요
        </Text>
      </HStack>
    </Button>
  );
}

/**
 *@description 리뷰 등록 함수
 */
function ReviewRegisterButton() {
  return (
    <Button
      marginBottom="40px"
      borderRadius={8}
      height="52px"
      backgroundColor="#FFEADC"
      borderColor="#9EA1A8"
      borderWidth={1}>
      <Text fontSize="16px" color="#9EA1A8">
        등록
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  // 닫기 버튼
  closeButton: {
    position: 'absolute',
    right: 8,
    backgroundColor: '#ffffff00',
  },

  revisitCheckedButton: {
    width: '48.5%',
    height: 50,
    borderRadius: 8,
    borderColor: '#FF6B00',
  },
  revisitCheckedText: {
    color: '#FF6B00',
  },

  moreVisitCheckIcon: {
    marginRight: 10,
  },
});

export {
  BackButton,
  CloseButton,
  ReviewPrecautionButton,
  RevisitCheckButton,
  MoreVisitCheckButton,
  ReviewRegisterButton,
};
