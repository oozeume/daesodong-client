import {Actionsheet} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import Header from '../header/Header';
import DeleteIcon from '~/assets/icons/delete.svg';
import WebView from 'react-native-webview';
import {HEADER_HEIGHT} from '~/constants/heights';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 *@description 개인정보 처리방침 모달
 */
function PrivacyPolicyModal({isOpen, onClose}: Props) {
  const WEBVIEW_HEIGHT = APP_HEIGHT - HEADER_HEIGHT;

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        bgColor={colors.grayScale[0]}
        maxHeight={APP_HEIGHT}
        height={APP_HEIGHT}
        boxSize={'full'}>
        <Header
          title="개인정보 처리방침"
          isRemoveTopPosition
          rightButton={<DeleteIcon onPress={onClose} />}
        />

        <WebView
          source={{
            uri: 'https://heyzugwon.notion.site/86c5c600888045b2af449186575dadb6',
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

export default PrivacyPolicyModal;
