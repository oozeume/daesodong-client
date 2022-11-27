import {HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';
import DownIcon from '~/assets/icons/down.svg';
import _ from 'lodash';
import Tag from '~/components/common/Tag';

interface Props {
  handlePage: () => void;
  onPress: () => void;
  petType: {id: string; title: string};
}

function PetTypeSelector({handlePage, onPress, petType}: Props) {
  return (
    <LayoutContainer>
      <Pressable
        borderColor="#E1E2E4"
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

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active={!_.isEmpty(petType.title)}
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default PetTypeSelector;
