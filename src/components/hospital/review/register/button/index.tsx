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
const BackButton = ({buttonStyle, iconStyle, onPress}: IconButtonProps) => {
  return (
    <Button onPress={onPress} style={[styles.backButton, buttonStyle]}>
      <BackIcon style={iconStyle} />
    </Button>
  );
};

/**
 *@description 페이지 닫기 버튼
 *@param {ViewStyle} buttonStyle - 버튼 추가 스타일
 *@param {ViewStyle} iconStyle - 아이콘 추가 스타일
 *@param {() => void)} onPress - 클릭 이벤트 함수
 */
const CloseButton = ({buttonStyle, iconStyle, onPress}: IconButtonProps) => {
  return (
    <Button onPress={onPress} style={[styles.closeButton, buttonStyle]}>
      <DeleteIcon style={iconStyle} />
    </Button>
  );
};

/**
 *@description 후기 작성 주의 사항 안내 버튼
 */
const ReviewPrecautionButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable style={styles.reviewPrecautionButton} onPress={onPress}>
      <Text style={styles.reviewPrecautionText}>후기 작성시 주의사항 안내</Text>
    </Pressable>
  );
};

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
      style={[styles.revisitCheckButton, checkedButtonStyle]}
      variant="outline"
      onPress={() => setCheck(isChecked === checkValue ? 0 : checkValue)}>
      <Center style={styles.innerCenter}>
        <Text style={[styles.revisitCheckText, checkedTextStyle]}>{text}</Text>
      </Center>
    </Pressable>
  );
};

/**
 *@description 이 병원을 여러번 방문할지 여부에 대한 버튼
 */
const MoreVisitCheckButton = ({
  isChecked,
  setCheck,
}: CheckedButtonProps<boolean>) => {
  return (
    <Button
      variant={'unstyled'}
      style={styles.moreVisitCheckButton}
      onPress={() => setCheck(!isChecked)}>
      <HStack style={styles.moreVisitCheckInnerView}>
        {isChecked ? (
          <CircleCheckIcon style={styles.moreVisitCheckIcon} />
        ) : (
          <CircleUncheckIcon style={styles.moreVisitCheckIcon} />
        )}
        <Text style={styles.moreVisitCheckText}>
          이 병원을 여러번 방문했어요
        </Text>
      </HStack>
    </Button>
  );
};

/**
 *@description 리뷰 등록 함수
 */
const ReviewRegisterButton = () => {
  return (
    <Button style={styles.reviewRegisterButton}>
      <Text style={styles.reviewRegisterText}>등록</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  innerCenter: {
    height: '100%',
  },

  // 뒤로가기 버튼
  backButton: {
    position: 'absolute',
    left: 8,
    backgroundColor: '#ffffff00',
  },

  // 닫기 버튼
  closeButton: {
    position: 'absolute',
    right: 8,
    backgroundColor: '#ffffff00',
  },

  // 후기 작성시 주의사항 버튼
  reviewPrecautionButton: {
    paddingVertical: 0,
    width: 150,
    height: 24,
    marginBottom: 36,
    borderColor: '#000',
  },
  reviewPrecautionText: {
    color: '#FF6B00',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  // 이 병원을 다시 방문하시겠습니까 버튼
  revisitCheckButton: {
    width: '48.5%',
    height: 50,
    borderRadius: 8,
    borderColor: '#E1E2E4',
    borderWidth: 1,
  },
  revisitCheckedButton: {
    width: '48.5%',
    height: 50,
    borderRadius: 8,
    borderColor: '#FF6B00',
  },
  revisitCheckText: {
    color: '#9EA1A8',
  },
  revisitCheckedText: {
    color: '#FF6B00',
  },

  // 이 병원을 여러 번 방문하셨습니까? 버튼
  moreVisitCheckButton: {
    marginBottom: 24,
  },
  moreVisitCheckInnerView: {
    alignItems: 'center',
  },
  moreVisitCheckIcon: {
    marginRight: 10,
  },
  moreVisitCheckText: {
    fontSize: 15,
    color: '#7F838C',
  },

  // 리뷰 등록 버튼
  reviewRegisterButton: {
    marginBottom: 40,
    borderRadius: 8,
    height: 52,
    backgroundColor: '#FFEADC',
    borderColor: '#9EA1A8',
    borderWidth: 1,
  },
  reviewRegisterText: {
    fontSize: 16,
    color: '#9EA1A8',
    textAlignVertical: 'auto',
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
