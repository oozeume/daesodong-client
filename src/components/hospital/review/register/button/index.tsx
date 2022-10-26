import {Button, HStack, Pressable, Text} from 'native-base';
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
const BackButton = ({buttonStyle, iconStyle, onPress}: IconButtonProps) => {
  return (
    <Button onPress={onPress} style={[styles.backButton, buttonStyle]}>
      <BackIcon style={iconStyle} />
    </Button>
  );
};

const CloseButton = ({buttonStyle, iconStyle, onPress}: IconButtonProps) => {
  return (
    <Button onPress={onPress} style={[styles.closeButton, buttonStyle]}>
      <DeleteIcon style={iconStyle} />
    </Button>
  );
};

const ReviewPrecautionButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable style={styles.reviewPrecautionButton} onPress={onPress}>
      <Text style={styles.reviewPrecautionText}>후기 작성시 주의사항 안내</Text>
    </Pressable>
  );
};

interface CheckedButtonProps<T> {
  isChecked: T;
  setCheck: (isChecked: T) => void;
}

interface RevisitCheckButtonProps<T> extends CheckedButtonProps<T> {
  text: string;
  checkValue: number;
}

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
    <Button
      style={[styles.revisitCheckButton, checkedButtonStyle]}
      variant="outline"
      onPress={() => setCheck(isChecked === checkValue ? 0 : checkValue)}>
      <Text style={[styles.revisitCheckText, checkedTextStyle]}>{text}</Text>
    </Button>
  );
};

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

const ReviewRegisterButton = () => {
  return (
    <Button style={styles.reviewRegisterButton}>
      <Text style={styles.reviewRegisterText}>등록</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 8,
    backgroundColor: '#ffffff00',
  },

  closeButton: {
    position: 'absolute',
    right: 8,
    backgroundColor: '#ffffff00',
  },

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

  revisitCheckButton: {
    width: '48.5%',
    height: 50,
    borderRadius: 8,
    borderColor: '#E1E2E4',
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
