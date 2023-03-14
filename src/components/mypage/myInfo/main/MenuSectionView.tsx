import {Box, Text} from 'native-base';
import React, {ReactElement} from 'react';
import {colors} from '~/theme/theme';

interface Props {
  children: React.ReactNode;
  title: string;
}

/**
 *@description 내 계정 - 메인 > 내 정보관리, 내활동, 서비스 문의
 */

function MenuSectionView({children, title}: Props) {
  return (
    <Box mb={'28px'}>
      <Text fontSize={'13px'} py={'14px'} color={colors.grayScale[40]}>
        {title}
      </Text>
      {children}
    </Box>
  );
}

export default MenuSectionView;
