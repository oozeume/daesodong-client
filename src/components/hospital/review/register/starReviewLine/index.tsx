import _ from 'lodash';
import {HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {ViewStyle} from 'react-native';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {RateName} from '~/../types/facility';
import StarRatingIcon from '~/assets/icons/star_rating.svg';
import {colors} from '~/theme/theme';

const STAR_RATE_COUNT = 5;

interface Props {
  text: string;
  lineStyle?: ViewStyle;
  setReviewForm: (form: PostFacilityReviewData) => void;
  reviewForm: PostFacilityReviewData;
  rateName: RateName;
}

/**
 *@description 병원 별점 라인 컴포넌트
 *@param {string} text - 별점 텍스트
 *@param {ViewStyle} lineStyle - 상단 컨테이너 스타일
 */
function StarReviewLine({
  text,
  lineStyle,
  setReviewForm,
  reviewForm,
  rateName,
}: Props) {
  const [starRating, setStartRating] = useState(reviewForm[`${rateName}`] ?? 0);

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
        {_.range(0, STAR_RATE_COUNT).map((__, index) => (
          <React.Fragment key={index.toString()}>
            <StarRatingIcon
              style={UNCHECKED_ICON_STYLE}
              onPress={() => {
                setStartRating(index + 1);
                setReviewForm({...reviewForm, [`${rateName}`]: index + 1});
              }}
              fill={
                starRating > index
                  ? colors.fussOrange['0']
                  : colors.grayScale['20']
              }
            />
          </React.Fragment>
        ))}
      </HStack>
    </HStack>
  );
}

export default StarReviewLine;
