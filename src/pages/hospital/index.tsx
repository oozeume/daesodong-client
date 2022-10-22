import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'native-base';

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
        <View style={styles.topWrapper}>
          <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
            <LeftArrowIcon name={'arrow-left'} size={33} />
          </Pressable>
          <View style={styles.title}>
            <Text style={styles.titleText}>병원 이름</Text>
          </View>
          <Pressable style={[styles.icon, styles.shareIcon]}>
            <ShareIcon name={'share-google'} size={33} />
          </Pressable>
        </View>
        {/* 병원 상세 탭 */}
        <View style={styles.tabWrapper}>
          <Pressable
            style={[styles.tab, selectedTab === 'Info' && styles.tabHilight]}
            onPress={() => onClickTab('Info')}>
            <Text style={styles.tabText}>시설 정보</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === 'Review' && styles.tabHilight]}
            onPress={() => onClickTab('Review')}>
            <Text style={styles.tabText}>후기(00)</Text>
          </Pressable>
        </View>
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
  },
  topWrapper: {
    width: '100%',
    height: 68,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabWrapper: {
    width: '100%',
    height: 52,
    paddingVertical: 0,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 2,
  },
  icon: {
    flex: 1,
  },
  shareIcon: {
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    textAlign: 'center',
  },
  tab: {
    height: 52,
    flex: 1,
    alignContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 52,
    textAlign: 'center',
  },
  tabHilight: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
});

export default Hospital;
