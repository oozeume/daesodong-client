import React, {useEffect, useState} from 'react';
import {NavigationHookProp, RootStackParamList} from '~/../types/navigator';
import {useNavigation} from '@react-navigation/native';
import {colors} from '~/theme/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostFacilityReviewData} from '~/../types/api/facility';
import {useMutationReviewRegister} from '~/api/facility/mutations';
import Popup from '~/components/common/popup/Popup';
import {useReviewRegister} from '~/store/useReviewRegisterContext';
import _ from 'lodash';
import {useTagContext, useTagRegister} from '~/store/useTagContext';
import {INIT_REVIEW_FORM} from '~/constants/facility/detail';
import ReviewForm from '../../../../../components/facility/review/ReviewForm';
import {ReviewType} from '~/../types/facility';
import useImageUpload from '~/hooks/useImagesUpload';
import {PostCloudImageData} from '~/../types/utils';
import useToastShow from '~/hooks/useToast';
import {RegisterImageData} from '~/../types/community';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'FacilityReviewRegister'
>;

/**
 *@description 시설 리뷰 작성 페이지
 */
function FacilityReviewRegister({route}: Props) {
  const {id, facilityName} = route.params;
  const navigation = useNavigation<NavigationHookProp>();

  const {toastShow} = useToastShow();

  const [active, setActive] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const [reviewForm, setReviewForm] =
    useState<PostFacilityReviewData>(INIT_REVIEW_FORM);

  const tags = useTagContext([]);
  const setTags = useTagRegister();
  const setIsReviewRegisterComplete = useReviewRegister();

  const {mutateAsync: mutateRegister} = useMutationReviewRegister(id);
  const uploadReviewForm = () => {
    mutateRegister({
      ...reviewForm,
      hospital_review_picture: images.map(item => item.cloudImageName),
    })
      .then(() => {
        setTagList([]);
        setTags([]);
        navigation.goBack();
        setIsReviewRegisterComplete({
          type: ReviewType.Register,
          isComplete: true,
        });
      })
      .catch(e => {
        toastShow('업로드에 실패했습니다.');
        console.log('error', e);
      });
  };

  const {onImageUpload} = useImageUpload();

  const [images, setImages] = useState<RegisterImageData[]>([]);

  const onSubmit = () => {
    onImageUpload(
      images.reduce<PostCloudImageData[]>((result, item) => {
        if (item.cloudData) {
          result.push(item.cloudData);
        }
        return result;
      }, []),
      uploadReviewForm,
    );
  };

  useEffect(() => {
    setTagList(tags);

    setReviewForm({
      ...reviewForm,
      tags: tags,
    });
  }, [tags]);

  useEffect(() => {
    if (
      // TODO : 코드 간소화
      reviewForm.score_facilities !== 0 &&
      reviewForm.score_kindness !== 0 &&
      reviewForm.score_price !== 0 &&
      reviewForm.score_treatment !== 0 &&
      reviewForm.cost !== 0 &&
      reviewForm.thoughts !== '' &&
      !_.isEmpty(reviewForm.tags)
    ) {
      setActive(true);
    }
  }, [reviewForm]);

  return (
    <>
      <ReviewForm
        facilityName={facilityName ?? ''}
        onClose={() => setIsOpenPopup(true)}
        reviewForm={reviewForm}
        setReviewForm={setReviewForm}
        tagList={tagList}
        onSubmit={onSubmit}
        active={active}
        images={images}
        setImages={setImages}
      />

      <Popup
        title={'정말 작성을 취소하시나요?'}
        subText={'입력하신 내용은 삭제되며 복구할 수 없습니다.'}
        isVisible={isOpenPopup}
        setIsVisible={setIsOpenPopup}
        cancelButtonName={'작성 취소'}
        successButtonName={'이어서 작성하기'}
        cancelButtonStyle={{flex: 1}}
        successButtonStyle={{
          flex: 2,
          backgroundColor: colors.fussOrange[0],
        }}
        onCancel={() => {
          setTags([]);
          navigation.goBack();
        }}
        onSuccess={() => setIsOpenPopup(false)}
      />
    </>
  );
}

export default FacilityReviewRegister;
