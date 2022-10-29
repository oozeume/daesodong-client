import React, {useRef, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Pressable,
  Text,
  useToast,
} from 'native-base';

import styles from './styles';

/**
 * 병원 시설 방문 기록 체크 및 확인 할 수 있는 컴포넌트
 * @TODO API 연동 후 이벤트 핸들링 수정
 */

const RecordVisitedExperience = () => {
  const toast = useToast();
  const toastIdRef = useRef();
  const [visited, setIsVisited] = useState(false);

  const closeToast = () => {
    if (toastIdRef.current) {
      setIsVisited(prev => !prev);
      toast.close(toastIdRef.current);
    }
  };

  const showToast = () => {
    setIsVisited(prev => !prev);
    toastIdRef.current = toast.show({
      render: () => {
        return (
          <Flex style={styles.toastBox}>
            <Text style={[styles.text, {color: '#FFFFFF'}]}>
              방문 기록에 우리 아이가 추가되었어요
            </Text>
            <Pressable onPress={closeToast}>
              <Text
                style={[styles.text, {fontWeight: '700', color: '#FF6B00'}]}>
                취소
              </Text>
            </Pressable>
          </Flex>
        );
      },
    });
  };

  return (
    <>
      {visited ? (
        <Box
          style={[
            styles.visitHistoryBox,
            {height: 52, backgroundColor: '#FFF5EF'},
          ]}>
          <Center>
            <Text color={'#FF6B00'}>봉삼이와 함께 방문한 병원이에요</Text>
          </Center>
        </Box>
      ) : (
        <Box
          style={[
            styles.visitHistoryBox,
            {marginTop: 24, paddingVertical: 20},
          ]}>
          <Text style={styles.text}>이 시설을 이용한 경험이 있으신가요?</Text>
          <Text style={styles.text}>
            방문 기록을 남기면 친구들에게 도움을 줄 수 있어요!
          </Text>
          <Center>
            <Button style={styles.visitButton} onPress={showToast}>
              <Text color={'#FF6B00'}>방문한 경험이 있어요</Text>
            </Button>
          </Center>
        </Box>
      )}
    </>
  );
};

export default RecordVisitedExperience;
