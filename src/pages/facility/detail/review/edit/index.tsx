import {useToast} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {useMutationReviewEdit} from '~/api/facility/mutations';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/../types/navigator';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {useNavigation} from '@react-navigation/native';
import {useTagRegister, useTagContext} from '~/store/useTagContext';
import ToastMessage from '~/components/common/toast/ToastMessage';
import ReviewForm from '../../../../../components/facility/review/ReviewForm';
import _ from 'lodash';
import {useReviewRegister} from '~/store/useReviewRegisterContext';
import dayjs from 'dayjs';
import {ReviewType} from '~/../types/facility';

type Props = NativeStackScreenProps<RootStackParamList, 'FacilityReviewEdit'>;

/**
 *@description 시설 리뷰 수정 페이지
 */
function FacilityReviewEdit({route}: Props) {
  const {facilityId, reviewId, review, facilityName} = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const toast = useToast();

  const _reviewForm = useMemo(() => {
    return {
      visit_date: dayjs(`20${review.visitDate}`).format('YYYY-MM'),
      cost: review.cost,
      thoughts: review.reviewContent,
      score_treatment: review.starScore.treatment,
      score_price: review.starScore.price,
      score_facilities: review.starScore.kindness,
      score_kindness: review.starScore.kindness,
      expect_revisit: review.hasExpectRevisit,
      already_reviesit: review.isRevisit,
      tags: review.tags,
    };
  }, [review]);

  const [active, setActive] = useState(false);
  const [reviewForm, setReviewForm] =
    useState<PostFacilityReviewData>(_reviewForm);

  const [tagList, setTagList] = useState<string[]>(review.tags);
  const setTags = useTagRegister();
  const tags = useTagContext([]);

  const {mutateAsync} = useMutationReviewEdit(facilityId, reviewId);
  const setIsReviewResterComplete = useReviewRegister();

  const onSubmit = () => {
    mutateAsync(reviewForm)
      .then(() => {
        setTags([]);
        setIsReviewResterComplete({
          type: ReviewType.Edit,
          isComplete: true,
        });
        navigation.goBack();
        toast.show({
          render: () => <ToastMessage text={'내 후기를 수정했어요'} />,
        });
      })
      .catch(e => console.log('error->', e));
  };

  const onClose = () => {
    setTags([]);
    navigation.goBack();
  };

  useEffect(() => {
    if (_.isEqual(_reviewForm, reviewForm)) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [reviewForm, _reviewForm]);

  useEffect(() => {
    setTagList(tags);
  }, [tags]);

  useEffect(() => {
    if (!_.isEmpty(tagList)) {
      setTags(tagList);
      setTagList(tagList);
    }
  }, []);

  return (
    <ReviewForm
      facilityName={facilityName ?? ''}
      onClose={onClose}
      reviewForm={reviewForm}
      setReviewForm={setReviewForm}
      tagList={tagList}
      onSubmit={onSubmit}
      active={active}
    />
  );
}

export default FacilityReviewEdit;
