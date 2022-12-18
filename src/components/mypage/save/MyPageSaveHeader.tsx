import _ from 'lodash';
import {HStack, Stack} from 'native-base';
import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {colors} from '~/theme/theme';
import TabElement from './TabElement';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

type Props = MaterialTopTabBarProps;

export const TABS = {
  ['Facility']: '시설',
  ['Contents']: '콘텐츠',
  ['Community']: '커뮤니티',
} as const;

/**
 *@description 내 계정 - 저장 Tab 헤더
 */

function MyPageSaveHeader(props: Props) {
  const navigation = props.navigation;
  const currentRoute = props.state.routeNames[props.state.index];
  const [tabsPosition, setTabsPosition] = React.useState(
    _.range(0, 2).map(__ => ({width: 0, x: 0})),
  );

  const [translateX] = React.useState(new Animated.Value(0));
  const translateTab = (i: number) => {
    Animated.spring(translateX, {
      toValue: tabsPosition[i].x,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(props.state.index);
  }, [props.state.index, tabsPosition]);

  const setActivePage = (page: keyof typeof TABS) => {
    navigation.navigate(page);
  };

  const setElementSize =
    (index: number) => (size: {width: number; x: number}) => {
      tabsPosition[index] = {
        width: size.width,
        x: size.x,
      };
      setTabsPosition(_.clone(tabsPosition));
    };

  return (
    <Stack
      backgroundColor={'white'}
      justifyContent={'center'}
      alignItems={'center'}
      borderColor={colors.grayScale[30]}
      borderBottomWidth={1}>
      <HStack style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.slidingTabContainer,
            {
              width: tabsPosition[props.state.index].width,
            },
          ]}>
          <Animated.View
            style={[
              styles.slidingTab,
              {
                width: tabsPosition[props.state.index].width,
                transform: [{translateX}],
              },
            ]}
          />
        </Animated.View>

        {Object.keys(TABS).map((tab, i) => (
          <TabElement
            key={tab}
            text={TABS[tab as keyof typeof TABS]}
            active={currentRoute === tab}
            onPress={() => setActivePage(tab as keyof typeof TABS)}
            onLayout={setElementSize(i)}
          />
        ))}
      </HStack>
    </Stack>
  );
}

export default MyPageSaveHeader;

const styles = StyleSheet.create({
  tabContainer: {
    height: 52,
    marginLeft: 18,
    marginRight: 18,
    alignItems: 'center',
    backgroundColor: colors.grayScale[0],
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  slidingTab: {
    height: 2,
    backgroundColor: colors.grayScale[80],
    top: 52,
  },
});
