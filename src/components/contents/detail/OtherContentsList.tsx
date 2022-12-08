import {useNavigation} from '@react-navigation/native';
import {Box, Center, Pressable, Text} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationHookProp} from '~/../types/navigator';
import {colors} from '~/theme/theme';
import ContentItem from './ContentItem';

/**
 *@description 다른 컨텐츠 리스트
 */
const OtherContentsList = () => {
  const navigation = useNavigation<NavigationHookProp>();
  return (
    <Box
      mb="90px"
      pt="20px"
      px="18px"
      pb="40px"
      bgColor={colors.grayScale['10']}>
      {/* 콘텐츠 소제목 */}
      <Text
        mb="24px"
        fontSize={'18px'}
        fontWeight={700}
        color={colors.grayScale['80']}>
        이 시리즈의 다른 이야기
      </Text>

      <Box mb="24px">
        <FlatList
          nestedScrollEnabled
          data={['', '', '', '', '', '', '', '', '']}
          renderItem={ContentItem}
          keyExtractor={(item, index) => String(index)}
        />
      </Box>

      <Pressable
        h="44px"
        borderWidth={1}
        borderRadius={8}
        borderColor={colors.grayScale['60']}
        onPress={() => navigation.navigate('OtherContents')}>
        <Center w="100%" h="100%">
          <Text fontSize={'15px'} color={colors.grayScale['90']}>
            더보기
          </Text>
        </Center>
      </Pressable>
    </Box>
  );
};

export default OtherContentsList;
