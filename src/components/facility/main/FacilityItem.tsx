import React from 'react';
import {HStack, Pressable, Text, View, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '~/theme/theme';
import {APP_WIDTH} from '~/utils/dimension';
import StarFillIcon from '~/assets/icons/star_fill.svg';
import MessageFillIcon from '~/assets/icons/message_fill.svg';
import Facility from '~/model/facility';

interface Props {
  facility: Facility;
}

function FacilityItem({facility}: Props) {
  const {navigate} = useNavigation<NativeStackNavigationProp<any>>();

  const onPress = () => {
    navigate('FacilityDetail', {
      id: facility.id,
    });
  };

  return (
    <Pressable
      py="16px"
      onPress={onPress}
      px="18px"
      backgroundColor={colors.grayScale[0]}
      borderBottomWidth={1}
      borderBottomColor={colors.grayScale[20]}>
      <HStack
        pb="12px"
        mb="12px"
        w={`${APP_WIDTH - 36}px`}
        borderBottomWidth={1}
        borderBottomColor={colors.grayScale[10]}
        justifyContent={'space-between'}>
        <VStack>
          <HStack alignItems={'center'}>
            <Text
              color={colors.grayScale[80]}
              fontSize={'16px'}
              fontWeight={500}
              mr="8px">
              {facility.name}
            </Text>

            <Text
              color={colors.grayScale[50]}
              fontSize={'12px'}
              fontWeight={400}>
              시설종류
            </Text>
          </HStack>

          <Text
            noOfLines={1}
            color={colors.grayScale[50]}
            fontSize={'13px'}
            fontWeight={400}>
            {facility.intro}
          </Text>

          <HStack alignItems={'center'}>
            <HStack alignItems={'center'} mr="8px">
              <StarFillIcon
                width={12}
                height={12}
                fill={colors.fussOrange[0]}
              />
              <Text
                ml="5px"
                fontSize={'13px'}
                fontWeight={500}
                color={colors.fussOrange[0]}>
                {facility.averageScore}
              </Text>
            </HStack>

            <View w="1px" h="8px" bgColor={colors.grayScale[40]} />

            <HStack alignItems={'center'} px="8px">
              <MessageFillIcon width={10} height={10} fill={'#D9D9D9'} />
              <Text
                ml="4px"
                fontSize={'13px'}
                fontWeight={500}
                color={colors.grayScale[50]}>
                {facility.reviewCount}
              </Text>
            </HStack>

            <View w="1px" h="8px" bgColor={colors.grayScale[40]} />

            <Text
              ml="8px"
              fontSize={'13px'}
              fontWeight={500}
              color={colors.grayScale[50]}>
              {facility.phoneNumber}
            </Text>
          </HStack>
        </VStack>

        {/* TODO: 병원 이미지 */}
        <View w="70px" h="70px" bgColor={colors.grayScale[20]} />
      </HStack>

      {/* TODO: 내 동물종 */}
      <Text fontSize={'13px'} fontWeight={500} color={colors.grayScale[60]}>
        24마리의 [내 동물종] 친구들이 방문했어요
      </Text>
    </Pressable>
  );
}

export default FacilityItem;
