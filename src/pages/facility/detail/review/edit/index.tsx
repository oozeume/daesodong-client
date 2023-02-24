import {useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useMutationReviewEdit} from '~/api/facility/mutations';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/../types/navigator';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {useNavigation} from '@react-navigation/native';
import {useTagRegister} from '~/store/useTagContext';
import ToastMessage from '~/components/common/toast/ToastMessage';
import ReviewForm from '../ReviewForm';
import _ from 'lodash';

type Props = NativeStackScreenProps<RootStackParamList, 'FacilityReviewEdit'>;

/**
 *@description 시설 리뷰 수정 페이지
 */
function FacilityReviewEdit({route}: Props) {
  const {facilityId, reviewId, review, facilityName} = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const toast = useToast();

  const [active, setActive] = useState(false);
  const [reviewForm, setReviewForm] = useState<PostFacilityReviewData>(
    review.review,
  );

  const [tagList, setTagList] = useState<string[]>(review.tags);
  const setTags = useTagRegister();

  const {mutateAsync} = useMutationReviewEdit(facilityId, reviewId);

  // TODO: 리뷰 수정 api - 수정 요청(불필요한 데이터 요구가 있음)
  const onSubmit = () => {
    mutateAsync(reviewForm)
      .then(() => {
        setTags([]);
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
    if (reviewForm !== review.review) {
      setActive(true);
    }
  }, [reviewForm]);

  useEffect(() => {
    if (!_.isEmpty(tagList)) {
      setTags(review.tags);
    }
  }, [tagList]);

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
