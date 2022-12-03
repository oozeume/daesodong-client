import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer';
import DownIcon from '~/assets/icons/down.svg';
import _ from 'lodash';
import Tag from '~/components/common/Tag';

interface Props {
  handlePage: () => void;
  onPress: () => void;
  petType: {id: string; title: string};
}

/**
 *@description 집사정보등록 - 반려동물 종
 */

function PetTypeSelector({handlePage, onPress, petType}: Props) {
  return (
    <LayoutContainer buttonPress={handlePage}>
      <Pressable
        borderColor={colors.grayScale[30]}
        borderBottomWidth={1}
        flexDirection="row"
        backgroundColor="#fff"
        onPress={onPress}>
        <HStack
          width="100%"
          paddingBottom="15px"
          justifyContent="space-between"
          alignItems="center">
          <HStack alignItems={'center'} space={'8px'}>
            {!_.isEmpty(petType.title) && (
              <Tag
                bgColor={colors.fussOrange['-30']}
                color={colors.fussOrange[0]}
                tagName="설치류"
              />
            )}
            <Text
              fontSize={15}
              color={
                _.isEmpty(petType.title)
                  ? colors.grayScale[40]
                  : colors.grayScale[80]
              }>
              {_.isEmpty(petType.title) ? '종을 선택해주세요' : petType.title}
            </Text>
          </HStack>

          <DownIcon
            style={{
              left: 1,
            }}
          />
        </HStack>
      </Pressable>
    </LayoutContainer>
  );
}

export default PetTypeSelector;
