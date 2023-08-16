import {Box, HStack, Text, TextArea, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import {colors} from '~/theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Label from '~/components/hospital/review/register/label';
import VerificationForm from '~/components/common/VerificationForm';
import MapFilter from '~/components/facility/main/MapFilter';
import _ from 'lodash';
import SelectButtonForm from '~/components/signup/petInfo/SelectButtonForm';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import AddressChange from '~/components/mypage/myInfo/AddressChange';
import Popup from '~/components/common/popup/Popup';
import ImageUploader from '~/components/common/ImageUploader';
import {FacilityType} from '~/../types/api/facility';
import {usePostRecommandFacility} from '~/api/facility/mutations';
import useImageUpload from '~/hooks/useImagesUpload';
import {PostCloudImageData} from '~/../types/utils';
import {PostImageData} from '~/../types/api/common';
import useToastShow from '~/hooks/useToast';
import {FACILITY_TYPE_LIST} from '~/constants/myinfo/facilityRecommendation';

/**
 * 내 계정 > 시설 소개/추천
 */
function FacilityRecommendation() {
  const navigation = useNavigation<NavigationHookProp>();

  const {
    isOpen: isFacilityTypeOpen,
    onOpen: onFacilityTypeOpen,
    onClose: onFacilityTypeClose,
  } = useDisclose();

  const [images, setImages] = useState<PostImageData>([]);

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isAddReviewPopupOpen, setAddReviewPopupOpen] = useState(false);

  const initForm = {
    type: '',
    facilityName: '',
    address: '',
    reason: '',
    site: '',
  };
  const {toastShow} = useToastShow();

  const [form, setForm] = useState(initForm);
  const {mutateAsync: recommandFacility} = usePostRecommandFacility();

  const reasonPlaceholderText = `이 시설을 추천/제보하시는 이유를 알려주세요\n\n#너무 친절했어요\n#진료가 꼼꼼하고 사려깊어요`;

  const {onImageUpload} = useImageUpload();
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const successImageUpload = () => {
    setSubmitLoading(false);
    navigation.reset({index: 0, routes: [{name: 'tab'}]});
  };

  const onSubmit = () => setSubmitLoading(true);
  const onRecommand = () => {
    recommandFacility({
      ...form,
      images: images.map(item => item.cloudImageName),
    })
      .then()
      .catch(() => toastShow('시설 추천 작성에 실패했습니다'))
      .finally(successImageUpload);
  };

  useEffect(() => {
    if (isSubmitLoading) {
      onImageUpload(
        images.reduce<PostCloudImageData[]>((result, item) => {
          if (item.cloudData) {
            result.push(item.cloudData);
          }
          return result;
        }, []),
        onRecommand,
      ).catch(() => {
        toastShow('이미지 등록에 실패했습니다');
        successImageUpload();
      });
    }
  }, [isSubmitLoading]);

  return (
    <SafeAreaView style={{backgroundColor: colors.grayScale[0], flex: 1}}>
      <KeyboardAwareScrollView style={{}}>
        <Box px="18px" py="16px" mb="32px" bgColor={colors.grayScale[10]}>
          <Text color={colors.grayScale[60]}>
            다른 친구들이 믿고 방문할 수 있도록 방문 경험이 있는 시설을
            추천/제보해주세요
          </Text>
        </Box>

        <Box px="18px">
          <HStack>
            <Label text="분류" />
            <Label text=" (필수)" color={colors.negative['-10']} />
          </HStack>

          <SelectButtonForm
            onPress={onFacilityTypeOpen}
            value={form.type}
            placeholder="분양, 병원, 장례 중 선택해주세요"
          />

          <HStack mt="36px">
            <Label text="시설명" />
            <Label text=" (필수)" color={colors.negative['-10']} />
          </HStack>

          <VerificationForm
            placeholder={'시설명을 입력해주세요'}
            marginBottom={'8px'}
            onChangeText={text =>
              setForm(prev => ({
                ...prev,
                facilityName: text,
              }))
            }
            value={form.facilityName}
          />

          <HStack mt="36px">
            <Label text="위치" />
            <Label text=" (필수)" color={colors.negative['-10']} />
          </HStack>

          <SelectButtonForm
            onPress={() => setAddressModalOpen(true)}
            placeholder="선택"
            value={form.address}
          />

          <HStack mt="36px" mb="8px">
            <Label text="추천/제보 이유" />
            <Label text=" (필수)" color={colors.negative['-10']} />
          </HStack>

          <TextArea
            px="14px"
            py="16px"
            borderWidth={1}
            borderColor={colors.grayScale[30]}
            borderRadius={8}
            h="160px"
            fontSize={'15px'}
            lineHeight={'22px'}
            autoCompleteType={false}
            value={form.reason}
            placeholder={reasonPlaceholderText}
            placeholderTextColor={colors.grayScale[40]}
            onChangeText={text => setForm(prev => ({...prev, reason: text}))}
          />

          <HStack mt="36px">
            <Label text="사이트" />
          </HStack>

          <VerificationForm
            placeholder={'인스타그램 아이디, 홈페이지/블로그 주소 등'}
            marginBottom={'8px'}
            onChangeText={text =>
              setForm(prev => ({
                ...prev,
                site: text,
              }))
            }
            value={form.site}
          />

          <HStack mt="36px" mb="8px">
            <Label text="사진 첨부(최대 5개)" />
          </HStack>

          <ImageUploader images={images} setImages={setImages} />

          <RedActiveLargeButton
            active={
              !_.isEmpty(form.address) &&
              !_.isEmpty(form.facilityName) &&
              !_.isEmpty(form.reason) &&
              !_.isEmpty(form.site) &&
              !_.isEmpty(form.type) &&
              !_.isEmpty(images)
            }
            text={'제보'}
            handlePress={onSubmit}
          />
        </Box>
      </KeyboardAwareScrollView>

      <MapFilter
        isOpen={isFacilityTypeOpen}
        onClose={onFacilityTypeClose}
        value={form.type}
        title="분류"
        filters={FACILITY_TYPE_LIST.map(i => i.text)}
        onPress={(value: any) =>
          setForm(prev => ({...prev, type: FACILITY_TYPE_LIST[value].text}))
        }
      />

      <AddressChange
        isOpen={isAddressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onPress={address => {
          setForm(prev => ({...prev, address}));
        }}
      />

      {/* NOTE: 임시 주석 - api 수정 요청 */}
      {/* <Popup
        title={'후기도 남겨주시겠어요?'}
        subText="후기를 남기면 제보 검토 시간이 줄어들고 회원점수 30점을 적립받아요."
        successButtonName="제보만 할게요"
        cancelButtonName="후기 작성할게요"
        isVisible={isAddReviewPopupOpen}
        setIsVisible={setAddReviewPopupOpen}
      /> */}
    </SafeAreaView>
  );
}

export default FacilityRecommendation;
