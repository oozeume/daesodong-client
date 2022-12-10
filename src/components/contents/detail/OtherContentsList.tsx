import {useNavigation} from '@react-navigation/native';
import {Box, Center, Pressable, Text} from 'native-base';
import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import {colors} from '~/theme/theme';
import ContentItem from './ContentItem';

/**
 *@description 다른 컨텐츠 리스트
 */
const OtherContentsList = () => {
  const navigation = useNavigation<NavigationHookProp>();

  return (
    <Box mb="90px" pt="24px" pb="40px" bgColor={colors.grayScale['10']}>
      {/* 콘텐츠 소제목 */}
      <Text
        pl="18px"
        mb="24px"
        fontSize={'18px'}
        fontWeight={700}
        color={colors.grayScale['80']}>
        이 시리즈의 다른 이야기
      </Text>

      <Box mb="24px">
        {['', '', ''].map((item, index) => (
          <React.Fragment key={index}>
            <ContentItem
              item={{}}
              onPress={() => {}}
              detailViewBackgroundColor={colors.grayScale['0']}
            />
          </React.Fragment>
        ))}
      </Box>

      <Box px="18px">
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
    </Box>
  );
};

export default OtherContentsList;
