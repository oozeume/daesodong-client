import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationHookProp} from '~/../types/navigator';
import FlatList from '~/components/common/flatList/FlatList';
import Notice from '~/components/mypage/Notice';
import {colors} from '~/theme/theme';

/**
 *@description 내 계정 - 알림 index 페이지
 */

function MyPageNotice() {
  const navigation = useNavigation<NavigationHookProp>();
  return (
    <FlatList
      style={styles.container}
      data={[
        {category: '공지사항'},
        {category: '공지사항'},
        {category: '공지사항'},
        {category: '콘텐츠'},
        {category: '콘텐츠'},
        {category: '콘텐츠'},
        {category: '커뮤니티'},
        {category: '커뮤니티'},
      ]}
      renderItem={({item}) => (
        <Pressable onPress={() => navigation.navigate('MyPageNoticeDetail')}>
          <Notice notice={item} />
        </Pressable>
      )}
    />
  );
}

export default MyPageNotice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayScale[0],
    flex: 1,
  },
});
