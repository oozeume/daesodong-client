import React from 'react';
import {useToast} from 'native-base';
import ToastMessage from '~/components/common/toast/ToastMessage';

/**
 *@description toast 훅 생성
 */
function useToastShow() {
  const toast = useToast();

  const toastShow = (text: string) => {
    toast.show({
      render: () => {
        return <ToastMessage text={text} />;
      },
    });
  };

  return {toastShow};
}

export default useToastShow;
