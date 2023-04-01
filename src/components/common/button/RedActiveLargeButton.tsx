import {StyleProp, TextStyle} from 'react-native';
import {ActiveButtonProps} from '~/../types/login';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';

/**
 *@description 활성화/비활성화 빨간색 큰 버튼 (ex. 확인, 가입완료 버튼)
 */
function RedActiveLargeButton({
  handlePress,
  active,
  buttonStyle,
  textStyle,
  text,
}: ActiveButtonProps) {
  const defaultButtonTextStyle = {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 52,
  } as unknown as StyleProp<TextStyle>;
  return (
    <Button
      text={text}
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
      active={active}
      large
      shadow
      buttonStyle={buttonStyle}
      textStyle={[defaultButtonTextStyle, textStyle]}
    />
  );
}

export default RedActiveLargeButton;
