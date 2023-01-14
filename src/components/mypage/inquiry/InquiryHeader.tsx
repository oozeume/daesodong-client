import {HStack, Stack, Text, View} from 'native-base';
import React from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 1:1 문의 헤더
 */

function InquiryHeader() {
  return (
    <>
      <HStack
        justifyContent={'space-between'}
        pt={'20px'}
        pb={'24px'}
        px={'18px'}>
        <Stack space={'8px'}>
          <Text color={colors.grayScale[70]}>상담시간</Text>
          <Text color={colors.grayScale[60]}>
            {'평일(월-금) 14:00 - 18:00 \n' + '토, 일, 공휴일 휴무'}
          </Text>
        </Stack>

        <Stack alignSelf={'flex-end'}>
          <Button
            width={'97px'}
            fontColors={{
              active: colors.grayScale[90],
            }}
            buttonColors={{
              active: colors.fussYellow[0],
            }}
            borderColors={{
              active: colors.grayScale[90],
            }}
            text={'1:1 문의하기'}
            active
            buttonStyle={{
              backgroundColor: colors.fussOrange['-40'],
              borderColor: colors.fussOrange[0],
            }}
            textStyle={{
              color: colors.fussOrange[0],
              fontWeight: '500',
            }}
            handlePress={() => {}}
          />
        </Stack>
      </HStack>
      <View
        height={'8px'}
        backgroundColor={colors.grayScale[10]}
        borderTopWidth={1}
        borderBottomWidth={1}
        borderTopColor={colors.grayScale[20]}
        borderBottomColor={colors.grayScale[20]}
      />
    </>
  );
}

export default InquiryHeader;
