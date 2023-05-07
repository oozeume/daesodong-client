import {Actionsheet} from 'native-base';
import React from 'react';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import {colors} from '~/theme/theme';
import Header from '../header/Header';
import DeleteIcon from '~/assets/icons/delete.svg';
import WebView from 'react-native-webview';
import {HEADER_HEIGHT} from '~/constants/heights';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 *@description 서비스 이용약관 모달
 */
function ServicePolicyModal({isOpen, onClose}: Props) {
  const WEBVIEW_HEIGHT = APP_HEIGHT - HEADER_HEIGHT;
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        bgColor={colors.grayScale[0]}
        maxHeight={APP_HEIGHT}
        height={APP_HEIGHT}
        boxSize={'full'}>
        <Header
          isRemoveTopPosition
          title="서비스 이용약관"
          rightButton={<DeleteIcon onPress={onClose} />}
        />

        <WebView
          source={{
            uri: 'https://heyzugwon.notion.site/fd49dec01f944f55b4901892fa06347c',
          }}
          bounces={false}
          style={{
            flex: 1,
            width: APP_WIDTH,
            height: WEBVIEW_HEIGHT,
          }}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default ServicePolicyModal;
