import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Pressable,
  Spinner,
  Stack,
  Text,
  useToast,
} from 'native-base';
import {colors} from '~/theme/theme';
import {useGetVisitedFacility} from '~/api/facility/queries';
import {useMutationVisitedFacility} from '~/api/facility/mutations';
import {APP_WIDTH} from '~/utils/dimension';
import {MARGIN_X} from '~/constants/facility/detail';

interface Props {
  facilityId: string;
}

/**
 * 병원 시설 방문 기록 체크 및 확인 할 수 있는 컴포넌트
 */

function RecordVisitedExperience({facilityId}: Props) {
  const toast = useToast();
  const toastIdRef = useRef();

  const [visited, setIsVisited] = useState(false);
  const [petName, setPetName] = useState('');

  const {data, isLoading} = useGetVisitedFacility(facilityId);
  const {mutateAsync} = useMutationVisitedFacility();

  const onPress = () => {
    mutateAsync(facilityId)
      .then(() => {
        // TODO : response으로 pet name 받아서 petName 업데이트
        setIsVisited(true);
        showToast();
      })
      .catch(error =>
        // TODO: 에러처리
        console.log('error', error),
      );
  };

  useEffect(() => {
    if (data) {
      if (data.data.pet) {
        setPetName(data.data.pet.name ?? '');
        setIsVisited(true);
      }
    }
  }, [data, setPetName]);

  const closeToast = () => {
    if (toastIdRef.current) {
      setIsVisited(prev => !prev);
      toast.close(toastIdRef.current);
    }
  };

  const showToast = () => {
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
              color={colors.grayScale[0]}>
              방문 기록에 우리 아이가 추가되었어요
            </Text>
            <Pressable onPress={closeToast}>
              <Text
                fontSize={14}
                fontWeight={'700'}
                textAlign={'center'}
                color={colors.fussOrange[0]}>
                취소
              </Text>
            </Pressable>
          </Flex>
        );
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack flex={1}>
      {visited ? (
        <Box
          flex={1}
          w={APP_WIDTH - MARGIN_X * 2}
          h={'52px'}
          borderRadius={8}
          mt={'24px'}
          backgroundColor={colors.fussOrange['-40']}>
          <Center flex={1}>
            <Text color={colors.fussOrange[0]}>
              {petName}(이)와 함께 방문한 병원이에요
            </Text>
          </Center>
        </Box>
      ) : (
        <Box
          w={'339px'}
          px={'12px'}
          py={'20px'}
          mt={'24px'}
          backgroundColor={colors.grayScale[10]}>
          <Text
            fontSize={14}
            fontWeight={'400'}
            color={colors.grayScale[70]}
            textAlign={'center'}>
            이 시설을 이용한 경험이 있으신가요?
          </Text>
          <Text
            fontSize={14}
            fontWeight={'400'}
            color={colors.grayScale[70]}
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
              borderColor={colors.fussOrange[0]}
              backgroundColor={colors.fussOrange['-40']}
              style={{shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15}}
              onPress={onPress}>
              <Text color={colors.fussOrange[0]}>방문한 경험이 있어요</Text>
            </Button>
          </Center>
        </Box>
      )}
    </Stack>
  );
}

export default RecordVisitedExperience;
