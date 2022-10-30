import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Center, HStack, Text, View} from 'native-base';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

import HospitalDetail from './detail';
import HospitalReview from './review';
import ShareIcon from 'react-native-vector-icons/EvilIcons';
import LeftArrowIcon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

type TabType = 'Info' | 'Review';
type HospitalProps = NativeStackScreenProps<ParamListBase, 'Hospital'>;

const Hospital = ({navigation}: HospitalProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('Info');

  const onClickTab = (type: TabType) => {
    if (type === 'Info') {
      setSelectedTab('Info');
    } else {
      setSelectedTab('Review');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* 병원 상세 타이틀바 */}
        <HStack space={3} justifyContent="center">
          <Center h="60" w="30">
            <Pressable onPress={() => navigation.goBack()}>
              <LeftArrowIcon name={'arrow-left'} size={33} />
            </Pressable>
          </Center>
          <Center h="60" w="250">
            <Text style={styles.titleText}>병원 이름</Text>
          </Center>
          <Center h="60" w="30">
            <Pressable>
              <ShareIcon name={'share-google'} size={33} />
            </Pressable>
          </Center>
        </HStack>
        {/* 병원 상세 탭 */}
        <HStack space={2} justifyContent="center" paddingX={18}>
          <Center h="52" w="169.5">
            <Pressable
              style={[selectedTab === 'Info' && styles.tabHilight]}
              onPress={() => onClickTab('Info')}>
              <Text style={styles.tabText}>시설 정보</Text>
            </Pressable>
          </Center>
          <Center h="52" w="169.5">
            <Pressable
              style={[selectedTab === 'Review' && styles.tabHilight]}
              onPress={() => onClickTab('Review')}>
              <Text style={styles.tabText}>후기(00)</Text>
            </Pressable>
          </Center>
        </HStack>
        {/* 병원 상세 컨텐츠 */}
        {selectedTab === 'Info' ? <HospitalDetail /> : <HospitalReview />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 52,
    textAlign: 'center',
  },
  tabHilight: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
});

export default Hospital;
