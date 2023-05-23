import {FlatList, Stack, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingButtonImage from '~/assets/images/floating_button_image.svg';
import TooltipImage from '~/assets/images/tooltip_image.svg';
import {colors} from '~/theme/theme';
import {Platform, StyleSheet} from 'react-native';
import ContentItem from '~/components/contents/detail/ContentItem';
import ReviewPopup from '~/components/contents/detail/ReviewPopup';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import ContentsImages from '~/components/contents/main/ContentsImages';
import {useGetContents} from '~/api/contents/queries';
import Content from '~/model/content';

/**
 *@description 컨텐츠 메인 페이지
 */
const ContentsMain = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [isTooltipOpen, setTooltipOpen] = useState(true);
  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 '무엇이 아쉬웠나요' 리뷰 모달 on/off 훅

  const {data} = useGetContents({skip: 0, take: 10});
  const [contentsList, setContentsList] = useState<Content[]>([]);

  useEffect(() => {
    if (data?.pages) {
      setContentsList(
        data.pages.flatMap(item => item.data).map(i => new Content(i)),
      );
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      // 4초 후, 다음 콘텐츠로 보고 싶은 내용이 있다면 알려주세요 툴팁 지워짐
      setTooltipOpen(false);
    }, 4000);
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{flex: 1}}>
      {/* '다음 콘텐츠로 보고싶은 내용이 있나요?' 팝업 */}
      <ReviewPopup
        visible={isOpen}
        onOK={onClose}
        onCancel={onClose}
        title={'다음 콘텐츠로 보고싶은 내용이 있나요?'}
        exampleTextList={[
          '햄스터를 키우려면 어떤 걸 준비해야 하나요?',
          '설치류는 포유류인가요?',
        ]}
        placeholder={
          '궁금했던 이야기를 알려주시면 대소동팀이 열심히 알아볼게요!'
        }
      />

      {/* 다른 컨텐츠 리스트 뷰 */}
      <FlatList
        bgColor={colors.grayScale[0]}
        ListHeaderComponent={() => (
          <ContentsImages images={contentsList.map(i => i.representiveImage)} />
        )}
        nestedScrollEnabled
        data={contentsList}
        renderItem={({item, index}) => {
          return (
            <ContentItem
              onPress={() =>
                navigation.navigate('ContentsDetail', {id: item.id})
              }
              item={item}
              style={{
                marginBottom: index === contentsList.length - 1 ? 20 : 8,
                marginTop: index === 0 ? 20 : 0,
              }}
            />
          );
        }}
        keyExtractor={(item, index) => String(index)}
      />

      {isTooltipOpen && <TooltipImage style={styles.tooltipImage} />}
      <FloatingButtonImage
        onPress={onOpen}
        style={styles.floatingButtonImage}
        fill={colors.fussOrange[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButtonImage: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 52,
    right: 18,
    zIndex: 99,
  },

  tooltipImage: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 78 : 110,
    right: 24,
    zIndex: 99,
  },

  searchIcon: {
    marginLeft: 12,
  },
});

export default ContentsMain;
