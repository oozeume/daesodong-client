import _ from 'lodash';
import {Circle, HStack, Stack, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {colors} from '~/theme/theme';

function PetType() {
  const petTypes = _.range(0, 9);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
      <HStack space={'16px'} px={'18px'} pt={'24px'} pb={'12px'}>
        {petTypes.map((item, index) => (
          <Stack key={index.toString()} alignItems={'center'} space={'6px'}>
            <Circle
              width={'60px'}
              height={'60px'}
              backgroundColor={colors.fussOrange['-30']}
            />
            <Text>전체</Text>
          </Stack>
        ))}
      </HStack>
    </ScrollView>
  );
}

export default PetType;
