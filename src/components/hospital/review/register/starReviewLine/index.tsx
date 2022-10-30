import {HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {ViewStyle} from 'react-native';
import StarRatingIcon from '~/assets/icons/star_rating.svg';

interface Props {
  text: string;
  lineStyle?: ViewStyle;
}
function StarReviewLine({text, lineStyle}: Props) {
  const [starRating, setStartRating] = useState(0);

  const UNCHECKED_ICON_STYLE = {
    marginRight: 6,
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom="21px"
      style={lineStyle}>
      <HStack>
        <Text fontSize="15px" marginRight="6px">
          {text}
        </Text>
        <Text fontSize="15px" color="#FF6B00">
          {starRating}
        </Text>
      </HStack>

      <HStack>
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(1)}
          fill={starRating > 0 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(2)}
          fill={starRating > 1 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(3)}
          fill={starRating > 2 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={UNCHECKED_ICON_STYLE}
          onPress={() => setStartRating(4)}
          fill={starRating > 3 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={{
            marginRight: 0,
          }}
          onPress={() => setStartRating(5)}
          fill={starRating > 4 ? '#FF6B00' : '#ECECEE'}
        />
      </HStack>
    </HStack>
  );
}

export default StarReviewLine;
