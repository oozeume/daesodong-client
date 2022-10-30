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

/**
 * 병원 시설 방문 기록 체크 및 확인 할 수 있는 컴포넌트
 * @TODO API 연동 후 이벤트 핸들링 수정
 */

function RecordVisitedExperience() {
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
          <Flex
            w={'339px'}
            h={'44px'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            py={'12px'}
            px={'14px'}
            borderRadius={8}
            backgroundColor={'rgba(26, 30, 39, 0.8)'}>
            <Text
              fontSize={14}
              fontWeight={'400'}
              textAlign={'center'}
              color={'#FFFFFF'}>
              방문 기록에 우리 아이가 추가되었어요
            </Text>
            <Pressable onPress={closeToast}>
              <Text
                fontSize={14}
                fontWeight={'700'}
                textAlign={'center'}
                color={'#FF6B00'}>
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
          w={'339px'}
          h={'52px'}
          borderRadius={8}
          mt={'12px'}
          px={'12px'}
          py={'16px'}
          backgroundColor={'#FFF5EF'}>
          <Center>
            <Text color={'#FF6B00'}>봉삼이와 함께 방문한 병원이에요</Text>
          </Center>
        </Box>
      ) : (
        <Box
          w={'339px'}
          px={'12px'}
          py={'20px'}
          mt={'24px'}
          backgroundColor={'#F6F7F7'}>
          <Text
            fontSize={14}
            fontWeight={'400'}
            color={'#5D626D'}
            textAlign={'center'}>
            이 시설을 이용한 경험이 있으신가요?
          </Text>
          <Text
            fontSize={14}
            fontWeight={'400'}
            color={'#5D626D'}
            textAlign={'center'}>
            방문 기록을 남기면 친구들에게 도움을 줄 수 있어요!
          </Text>
          <Center>
            <Button
              w={189}
              h={44}
              mt={'16px'}
              borderWidth={1}
              borderRadius={8}
              borderColor={'#FF6B00'}
              backgroundColor={'#FFF5EF'}
              style={{shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15}}
              onPress={showToast}>
              <Text color={'#FF6B00'}>방문한 경험이 있어요</Text>
            </Button>
          </Center>
        </Box>
      )}
    </>
  );
}

export default RecordVisitedExperience;
