import {IStackProps, KeyboardAvoidingView, Stack} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import React, {PropsWithChildren, useState} from 'react';
import {Platform} from 'react-native';

interface Props {
  props?: IViewProps;
}

/**
 *@description: 커뮤니티 컨텐츠 keyboardavoidview 안드로이드 호환으로 표시안되서 분기처리
 */
function PageContainer({children, props}: PropsWithChildren<Props>) {
  const COMMENT_INPUT_VIEW_HEIGHT = 60;

  if (Platform.OS === 'android') {
    return (
      <Stack flex={1} {...props}>
        {children}
      </Stack>
    );
  } else {
    return (
      <KeyboardAvoidingView
        flex={1}
        {...props}
        keyboardVerticalOffset={COMMENT_INPUT_VIEW_HEIGHT}
        behavior={'padding'}>
        {children}
      </KeyboardAvoidingView>
    );
  }
}

export default PageContainer;
