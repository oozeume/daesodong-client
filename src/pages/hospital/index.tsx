import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Center, HStack, Text, View} from 'native-base';
import {ParamListBase} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import HospitalInfo from './info';
import {theme} from '~/theme/theme';
import HospitalReview from './review';
import HospitalInfoFooter from '~/components/hospital/info/HospitalInfoFooter';

import BackIcon from '../../assets/icon/back_icon.svg';
import ShareIcon from '../../assets/icon/share_line_icon.svg';

type TabType = 'Info' | 'Review';
type Props = NativeStackScreenProps<ParamListBase, 'Hospital'>;

/**
 * 병원 시설 정보, 후기 페이지
 */

function Hospital({navigation}: Props) {
  const [selectedTab, setSelectedTab] = useState<TabType>('Info');

  const onClickTab = (type: TabType) => {
    setSelectedTab(type === 'Info' ? 'Info' : 'Review');
  };

  return (
    <SafeAreaView>
      <View w={'100%'} backgroundColor={theme.colors.grayScale[0]} h={'100%'}>
        {/* 병원 상세 타이틀바 */}
        <HStack space={3} height={'7%'} justifyContent="center">
          <Center h="60" w="30">
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon />
            </Pressable>
          </Center>
          <Center h="60" w="250">
            <Text
              fontSize={18}
              fontWeight={'500'}
              lineHeight={'26px'}
              textAlign={'center'}>
              병원 이름
            </Text>
          </Center>
          <Center h="60" w="30">
            <Pressable>
              <ShareIcon />
            </Pressable>
          </Center>
        </HStack>

        {/* 병원 상세 탭 */}
        <HStack space={2} height={'7%'} justifyContent="center" paddingX={18}>
          <Center h="52" w="169.5">
            <Pressable
              style={[
                selectedTab === 'Info' && {
                  width: '100%',
                  borderBottomWidth: 2,
                  borderBottomColor: '#000000',
                },
              ]}
              onPress={() => onClickTab('Info')}>
              <Text
                fontSize={16}
                fontWeight={'500'}
                lineHeight={'52px'}
                textAlign={'center'}>
                시설 정보
              </Text>
            </Pressable>
          </Center>
          <Center h="52" w="169.5">
            <Pressable
              style={[
                selectedTab === 'Review' && {
                  width: '100%',
                  borderBottomWidth: 2,
                  borderBottomColor: '#000000',
                },
              ]}
              onPress={() => onClickTab('Review')}>
              <Text
                fontSize={16}
                fontWeight={'500'}
                lineHeight={'52px'}
                textAlign={'center'}>
                후기(00)
              </Text>
            </Pressable>
          </Center>
        </HStack>

        {/* 병원 상세 컨텐츠 */}
        <HStack
          height={'74%'}
          mt={0.5}
          style={[selectedTab !== 'Info' && {height: '86%'}]}>
          {selectedTab === 'Info' ? <HospitalInfo /> : <HospitalReview />}
        </HStack>

        {/* 병원 시설 정보 푸터 버튼 바 */}
        {selectedTab === 'Info' && <HospitalInfoFooter />}
      </View>
    </SafeAreaView>
  );
}

export default Hospital;
