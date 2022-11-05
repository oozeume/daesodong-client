import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AvoidKeyboardView: React.FC<{children: JSX.Element}> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAwareScrollView {...props}>{children}</KeyboardAwareScrollView>
  );
};

export default AvoidKeyboardView;
