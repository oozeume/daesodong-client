import React from 'react';
import {useToast} from 'native-base';
import ToastMessage from '~/components/common/toast/ToastMessage';

/**
 *@description toast 훅 생성
 */
function useToastShow() {
  const toast = useToast();

  const toastShow = (text: string, leftElement?: JSX.Element) => {
    toast.show({
      render: () => {
        return <ToastMessage text={text} leftElement={leftElement} />;
      },
      duration: 3000,
    });
  };

  return {toastShow};
}

export default useToastShow;
