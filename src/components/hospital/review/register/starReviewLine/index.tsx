import {HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {ViewStyle} from 'react-native';
import StarRatingIcon from '~/assets/icons/star_rating.svg';
import {colors} from '~/theme/theme';

interface Props {
  text: string;
  lineStyle?: ViewStyle;
}

/**
 *@description 병원 별점 라인 컴포넌트
 *@param {string} text - 별점 텍스트
 *@param {ViewStyle} lineStyle - 상단 컨테이너 스타일
 */
function StarReviewLine({text, lineStyle}: Props) {
  const [starRating, setStartRating] = useState(0);

  const UNCHECKED_ICON_STYLE = {
    marginRight: 6,
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      mb="21px"
      style={lineStyle}>
      <HStack>
        <Text fontSize="15px" mr="24px">
          {text}
        </Text>
        <Text fontSize="15px" color={colors.fussOrange['0']}>
          {starRating}
        </Text>
      </HStack>

      <HStack>
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(1)}
          fill={
            starRating > 0 ? colors.fussOrange['0'] : colors.grayScale['20']
          }
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(2)}
          fill={
            starRating > 1 ? colors.fussOrange['0'] : colors.grayScale['20']
          }
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(3)}
          fill={
            starRating > 2 ? colors.fussOrange['0'] : colors.grayScale['20']
          }
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(4)}
          fill={
            starRating > 3 ? colors.fussOrange['0'] : colors.grayScale['20']
          }
        />
        <StarRatingIcon
          style={{
            marginRight: 0,
          }}
          onPress={() => setStartRating(5)}
          fill={
            starRating > 4 ? colors.fussOrange['0'] : colors.grayScale['20']
          }
        />
      </HStack>
    </HStack>
  );
}

export default StarReviewLine;
