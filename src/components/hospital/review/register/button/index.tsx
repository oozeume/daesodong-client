import {Center, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {GestureResponderEvent, StyleProp} from 'react-native';
import CircleCheckIcon from '~/assets/icons/circle_check.svg';
import BackIcon from '~/assets/icons/back.svg';
import DeleteIcon from '~/assets/icons/delete.svg';
import {ViewStyle} from 'react-native';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import {PostFacilityReviewData} from '~/../types/api/facility';

interface IconButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 *@description 뒤로가기 버튼
 *@param {ViewStyle} buttonStyle - 버튼 추가 스타일
 *@param {ViewStyle} iconStyle - 아이콘 추가 스타일
 *@param {() => void} onPress - 클릭 이벤트 함수
 */
function BackButton({buttonStyle, iconStyle, onPress}: IconButtonProps) {
  return (
    <Pressable
      position="absolute"
      zIndex={1}
      left="14px"
      backgroundColor="#ffffff00"
      onPress={onPress}
      style={buttonStyle}>
      <BackIcon style={iconStyle} />
    </Pressable>
  );
}

/**
 *@description 페이지 닫기 버튼
 *@param {ViewStyle} buttonStyle - 버튼 추가 스타일
 *@param {ViewStyle} iconStyle - 아이콘 추가 스타일
 *@param {() => void} onPress - 클릭 이벤트 함수
 */
function CloseButton({buttonStyle, iconStyle, onPress}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      position="absolute"
      right="8px"
      backgroundColor="#ffffff00"
      style={buttonStyle}>
      <DeleteIcon style={iconStyle} />
    </Pressable>
  );
}

interface ReviewPrecautionButtonProps {
  onPress: () => void;
}
/**
 *@description 후기 작성 주의 사항 안내 버튼
 */
function ReviewPrecautionButton({onPress}: ReviewPrecautionButtonProps) {
  return (
    <Pressable
      paddingY={0}
      w="150px"
      h="24px"
      mb="36px"
      borderColor="#000"
      onPress={onPress}>
      <Text
        color={colors.grayScale['60']}
        fontSize="13px"
        textDecorationLine={'underline'}
        textDecorationColor={colors.grayScale['60']}>
        후기 작성시 주의사항 안내
      </Text>
    </Pressable>
  );
}

interface CheckButtonProps {
  setReviewForm: React.Dispatch<React.SetStateAction<PostFacilityReviewData>>;
  reviewForm: PostFacilityReviewData;
}

interface CheckedButtonProps extends CheckButtonProps {}
interface RevisitCheckButtonProps extends CheckButtonProps {}

/**
 *@description 이 병원을 다시 방문하시겠습니까? 체크 버튼
 *@param {boolean} active - 버튼 활성화 여부
 */
const RevisitCheckButton = ({
  reviewForm,
  setReviewForm,
}: RevisitCheckButtonProps) => {
  const [isRevisit, setIsRevisit] = useState(reviewForm.expect_revisit);

  const onPress = () => {
    setIsRevisit(prev => !prev);
    setReviewForm({...reviewForm, expect_revisit: !isRevisit});
  };

  return (
    <Pressable
      w={'100%'}
      h={'50px'}
      backgroundColor={
        isRevisit ? colors.fussOrange['-40'] : colors.grayScale['0']
      }
      borderWidth={'1px'}
      borderRadius={'8px'}
      borderColor={isRevisit ? colors.fussOrange['0'] : colors.grayScale['30']}
      onPress={onPress}>
      <Text
        lineHeight={'50px'}
        textAlign={'center'}
        color={isRevisit ? colors.fussOrange['0'] : colors.grayScale['50']}
        fontSize="14px">
        네, 방문할래요!
      </Text>
    </Pressable>
  );
};

/**
 *@description 이 병원을 여러번 방문할지 여부에 대한 버튼
 */
function MoreVisitCheckButton({setReviewForm, reviewForm}: CheckedButtonProps) {
  const [isChecked, setCheck] = useState(false);

  const onPress = () => {
    setCheck(!isChecked);
    setReviewForm({...reviewForm, already_reviesit: !isChecked});
  };

  return (
    <Pressable variant={'unstyled'} mb="24px" onPress={onPress}>
      <Center flexDirection={'row'}>
        <CircleCheckIcon
          style={{marginRight: 10}}
          fill={isChecked ? colors.fussOrange['0'] : colors.grayScale['30']}
        />
        <Text
          fontSize="15px"
          color={isChecked ? colors.grayScale['80'] : colors.grayScale['60']}>
          이 병원을 여러번 방문했어요
        </Text>
      </Center>
    </Pressable>
  );
}

interface ReviewRegisterButtonProps {
  handlePress: () => void;
  active: boolean;
}

/**
 *@description 리뷰 등록 함수
 */
function ReviewRegisterButton({
  handlePress,
  active,
}: ReviewRegisterButtonProps) {
  return (
    <Button
      handlePress={handlePress}
      buttonColors={{
        active: colors.fussOrange['0'],
        disabled: colors.fussOrange['-30'],
      }}
      fontColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['50'],
      }}
      borderColors={{
        active: colors.grayScale['90'],
        disabled: colors.grayScale['50'],
      }}
      large
      text="등록"
      active={active}
      textStyle={{fontSize: 16}}
    />
  );
}

export {
  BackButton,
  CloseButton,
  ReviewPrecautionButton,
  RevisitCheckButton,
  MoreVisitCheckButton,
  ReviewRegisterButton,
};
