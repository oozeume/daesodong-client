import React from 'react';
import {View} from 'native-base';

import {IconNameType} from '~/../types/hospital';

import ChatFillIcon from '../../../assets/icon/chat_fill.svg';
import CallFillIcon from '../../../assets/icon/call_fill.svg';
import InfoFillIcon from '../../../assets/icon/info_fill.svg';
import ClockFillIcon from '../../../assets/icon/clock_fill.svg';
import LocationFillIcon from '../../../assets/icon/location_fill.svg';

interface Props {
  iconName: IconNameType;
}

/**
 * 아이콘 이름을 통해 아이콘을 반환하는 컴포넌트
 * @param {string} iconName 아이콘 이름
 */

function IconView({iconName}: Props) {
  const getIcon = (name: IconNameType) => {
    switch (name) {
      case 'chat_fill':
        return <ChatFillIcon fill={'#ECECEE'} />;
      case 'call_fill':
        return <CallFillIcon fill={'#ECECEE'} />;
      case 'info_fill':
        return <InfoFillIcon fill={'#ECECEE'} />;
      case 'clock_fill':
        return <ClockFillIcon fill={'#ECECEE'} />;
      case 'location_fill':
        return <LocationFillIcon fill={'#ECECEE'} />;
      default:
        return null;
    }
  };

  return <View style={{marginRight: 20}}>{getIcon(iconName)}</View>;
}

export default IconView;
