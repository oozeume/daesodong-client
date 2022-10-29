import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import DownIcon from '~/assets/icons/down.svg';
import {BackButton} from '../button';

interface Props {
  headerText?: string;
  itemList?: {value: any; txt: string}[];
  onSelect: (index: number) => void;
  selectedIndex: number;
}

/**
 *@description 셀렉터, 하단에 드롭박스 띄우는 컴포넌트
 *@param {string} headerText - 셀렉터 컨텐트 헤더 텍스트
 *@param {Array<{value: any; txt: string}>} itemList - 셀렉터 컨텐트 목록itemList
 *@param onSelect - 셀렉터 선택 이벤트 핸들러
 *@param {number} selectedIndex - 선택된 아이템 index state
 */
function Selector({headerText, itemList, onSelect, selectedIndex}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();

  /**
   *@description 아이템 클릭 이벤트 핸들러
   */
  const onClickItem = (index: number) => {
    onSelect(index);
    onClose();
  };

  return (
    <Center>
      <Pressable style={styles.openButton} onPress={onOpen}>
        <HStack style={styles.openButtonInnerView}>
          <Text style={styles.openButtonText}>
            {itemList ? itemList[selectedIndex]?.txt : ''}
          </Text>

          <DownIcon style={styles.openButtonIcon} />
        </HStack>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content>
          <Center style={styles.header}>
            <BackButton
              onPress={onClose}
              buttonStyle={styles.headerBackButton}
            />
            <Text style={styles.headerText}>{headerText || ''}</Text>
          </Center>

          <ScrollView style={styles.itemListScrollView}>
            {itemList?.map((val, i) => (
              <Actionsheet.Item key={i} onPress={() => onClickItem(i)}>
                <HStack style={styles.itemView}>
                  <Center style={styles.itemIcon}>
                    {selectedIndex === i && (
                      <Box style={styles.selectedItemIcon}></Box>
                    )}
                  </Center>

                  <Text style={styles.itemTxt}>{val.txt}</Text>
                </HStack>
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

const styles = StyleSheet.create({
  openButton: {
    borderColor: '#E1E2E4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  openButtonInnerView: {
    width: '100%',
    paddingBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openButtonIcon: {
    left: 1,
  },
  openButtonText: {
    color: '#383E4A',
    fontSize: 15,
  },

  header: {
    alignItems: 'center',
    width: '100%',
    height: 26,
    marginTop: 24,
    marginBottom: 36,
  },
  headerBackButton: {
    width: 16,
    height: 16,
    left: '2%',
  },
  headerText: {
    fontSize: 18,
    color: '#383E4A',
    lineHeight: 24,
  },

  itemListScrollView: {
    width: '100%',
  },
  itemIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 22,
    borderColor: '#E1E2E4',
  },
  selectedItemIcon: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#bbbbbb',
  },
  itemView: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  itemTxt: {
    color: '#7F838C',
    fontSize: 16,
    marginBottom: 1.2,
  },
});

export default Selector;
