import {HStack, Text} from 'native-base';
import {useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import StarRatingIcon from '~/assets/icons/star_rating.svg';

interface Props {
  txt: string;
  lineStyle?: ViewStyle;
}
export default function StarReviewLine({txt, lineStyle}: Props) {
  const [starRating, setStartRating] = useState(0);

  return (
    <HStack style={[styles.line, lineStyle]}>
      <HStack>
        <Text style={styles.titleText}>{txt}</Text>
        <Text style={styles.scoreText}>{starRating}</Text>
      </HStack>

      <HStack>
        <StarRatingIcon
          style={styles.uncheckedStarRatingIcon}
          onPress={() => setStartRating(1)}
          fill={starRating > 0 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={styles.uncheckedStarRatingIcon}
          onPress={() => setStartRating(2)}
          fill={starRating > 1 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={styles.uncheckedStarRatingIcon}
          onPress={() => setStartRating(3)}
          fill={starRating > 2 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={styles.uncheckedStarRatingIcon}
          onPress={() => setStartRating(4)}
          fill={starRating > 3 ? '#FF6B00' : '#ECECEE'}
        />
        <StarRatingIcon
          style={styles.uncheckedStarRatingLastIcon}
          onPress={() => setStartRating(5)}
          fill={starRating > 4 ? '#FF6B00' : '#ECECEE'}
        />
      </HStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  line: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 21,
  },
  titleText: {
    fontSize: 15,
    marginRight: 6,
  },
  scoreText: {
    fontSize: 15,
    color: '#FF6B00',
  },
  uncheckedStarRatingIcon: {
    marginRight: 6,
  },
  uncheckedStarRatingLastIcon: {
    marginRight: 0,
  },
});
