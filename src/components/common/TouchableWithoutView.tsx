import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

/**
 * 키보드 on 상태에서 키보드를 제외하고 다른 부분을 터치하면 키보드가 off 되도록 하는 공통 컴포넌트
 */

function TouchableWithoutView({
  children,
  ...props
}: React.PropsWithChildren<TouchableWithoutFeedbackProps>) {
  return (
    <TouchableWithoutFeedback {...props}>{children}</TouchableWithoutFeedback>
  );
}

export default TouchableWithoutView;
