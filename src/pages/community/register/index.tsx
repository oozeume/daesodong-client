import {
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  TextArea,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeleteIcon from '~/assets/icons/delete.svg';
import ImageIcon from '~/assets/icons/image.svg';
import CircleDeleteIcon from '~/assets/icons/circle_delete.svg';

import {colors} from '~/theme/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp, RouteHookProp} from '~/../types/navigator';
import VerificationForm from '~/components/common/VerificationForm';
import CommunitySelect from '~/components/community/register/CommunitySelect';
import SelectButtonForm from '~/components/community/register/SelectButtonForm';
import {FormState, RegisterImageData} from '~/../types/community';
import {APP_HEIGHT} from '~/utils/dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '~/components/common/header/Header';
import InputTopLabel from '~/components/common/input/InputTopLabel';
import {useGetPetKinds} from '~/api/kind/queries';
import {usePostCummunityPost} from '~/api/community/mutation';
import _ from 'lodash';
import ToastMessage from '~/components/common/toast/ToastMessage';
import {multipleImagePicker} from '~/utils/image';
import {Platform} from 'react-native';
import {PostCloudImageData} from '~/../types/utils';
import uuid from 'react-native-uuid';
import useImageUpload from '~/hooks/useImagesUpload';
import {useGetCommunityPost} from '~/api/community/queries';
import {config} from '~/utils/config';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useTagContext, useTagRegister} from '~/store/useTagContext';

/**
 *@description 커뮤니티 등록/수정
 *@todo 병원 후기 등록 부분 태그 등록 올라오면 적용 예정
 *@logic 등록 버튼 클릭 > onSubmit > isSubmitLoading: true > 이미지 업로드 > 서버에 게시글 등록 폼 전송
 */
const CommunityRegister = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const {params} = useRoute<RouteHookProp<'CommunityRegister'>>();
  const statusbarHeight = getStatusBarHeight();

  const {mutateAsync: communityPostRegister} = usePostCummunityPost(
    params?.postId,
  );
  const {onImageUpload} = useImageUpload();
  const getCommunityPost = useGetCommunityPost(params?.postId ?? '');
  const {data: petKinds} = useGetPetKinds(false);

  // 등록: REGISTER, 수정: MODIFY
  const formType = params?.postId ? 'MODIFY' : 'REGISTER';

  const toast = useToast();

  // 초기 등록 폼 state
  const initFormState: FormState = {
    kind: '',
    title: '',
    content: '',
    // tags: [],
    pictures: [],
  };

  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 셀랙터 on/off 훅
  const [form, setForm] = useState(initFormState);
  const tags = useTagContext([]);
  const setTags = useTagRegister();

  // 앱에서 이미지 로드 중인 여부 state
  const [isImageLoad, setImageLoad] = useState(false);
  // 폼 제출 여부 state
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  // 이미지 리스트
  const [imageDatas, setImageDatas] = useState<RegisterImageData[]>([]);

  const registerImageViewHeight = 84;

  // 최대 이미지 등록 가능 수
  const MAX_IMAGE_COUNT = 5;

  // 폼 작성 완료 여부
  const isFormComplete =
    !_.isEmpty(form.title) && !_.isEmpty(form.content) && !_.isEmpty(form.kind);

  // 이미지 선택 핸들러
  const onImagePicker = () => {
    // 이미지가 업로드 중이면 핸들러 반환
    if (isImageLoad && isSubmitLoading) return;
    setImageLoad(true);

    multipleImagePicker(MAX_IMAGE_COUNT - imageDatas.length)
      .then(response => {
        const _registerPageImageNames: RegisterImageData[] = [];

        response.forEach(item => {
          const cloudImageNameUUID = uuid.v4() as string;
          const iosSourceURL = item.sourceURL ?? '';
          let imageInfoURI =
            Platform.OS === 'android' ? item.path : iosSourceURL;

          // 이미지 이름에 확장자 추가
          const uriSplitDot = imageInfoURI.split('.');
          const ext = uriSplitDot[uriSplitDot.length - 1];

          const cloudImageName = `${cloudImageNameUUID}.${ext}`;

          _registerPageImageNames.push({
            registerPageImageName:
              Platform.OS === 'android' ? item.path : iosSourceURL,
            cloudImageName, // 서버 db에 등록될 이미지 이름
            cloudData: {
              uri: imageInfoURI,
              type: item.mime,
              name: cloudImageName,
            }, // cloud s3에 등록될 파일 내용
            type: 'UNREGISTERED',
          });
        });

        setImageDatas(prev => [...prev, ..._registerPageImageNames]);
        setImageLoad(false);
      })
      .catch(error => {
        setImageLoad(false);
        console.log(error);
      });
  };
  /**
   *@description 등록 이벤트 핸들러
   */
  const onSubmit = () => {
    if (!isFormComplete || (isImageLoad && isSubmitLoading)) return;

    setSubmitLoading(true);
  };

  /**
   *@description 이미지 리스트에서 제거 핸들러
   */
  const onDeleteImage = (index: number) => {
    if (isImageLoad && isSubmitLoading) return;

    setImageDatas(prev => prev.filter((_, k) => k !== index));
  };

  /**
   *@description 서버에 게시글 폼 등록 요청 이벤트 핸들러
   */
  const registerForm = () => {
    communityPostRegister({
      ...form,
      tags,
      pictures: imageDatas.map(item => item.cloudImageName),
    })
      .then(response => {
        if (response.data) {
          toast.show({
            render: () => (
              <ToastMessage
                text={`게시글을 ${
                  formType === 'REGISTER' ? '등록' : '수정'
                }했어요`}
              />
            ),
          });

          setSubmitLoading(false);

          navigation.reset({
            index: 0,
            routes: [{name: 'tab', state: {routes: [{name: 'Commuity'}]}}],
          });
        }
      })
      .catch(error => {
        toast.show({
          render: () => (
            <ToastMessage
              text={`게시글을 ${
                formType === 'REGISTER' ? '등록' : '수정'
              }하는 과정에서 오류가 발생했습니다.`}
            />
          ),
        });
      });
  };

  useEffect(() => {
    if (isSubmitLoading) {
      // 클라우드에 이미지 업로드 후, 콜백으로 서버에 게시글 등록
      onImageUpload(
        imageDatas.reduce<PostCloudImageData[]>((result, item) => {
          if (item.cloudData) {
            result.push(item.cloudData);
          }

          return result;
        }, []),
        registerForm,
      ).catch(error => {
        // 이미지 클라우드 등록 실패 시, 에러
        toast.show({
          render: () => (
            <ToastMessage
              text={`이미지 업로드하는 과정에서 오류가 발생했습니다.`}
            />
          ),
        });
      });
    }
  }, [isSubmitLoading]);

  useEffect(() => {
    // 수정하기로 내용을 조회하는 로직
    if (params?.postId && getCommunityPost.data) {
      const {kind, title, content, tagNameList, imageNameList} =
        getCommunityPost.data;

      setForm({
        kind: kind?.name ?? '',
        title: title ?? '',
        content: content ?? '',
        pictures: imageNameList ?? [],
      });

      setTags(tagNameList);

      setImageDatas(
        (imageNameList ?? []).map(item => ({
          type: 'REGISTERED',
          registerPageImageName: item,
          cloudImageName: item,
          cloudData: undefined,
        })),
      );
    }
  }, []);

  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeAreaView>
        <ScrollView
          bgColor={colors.grayScale['0']}
          minHeight={APP_HEIGHT - registerImageViewHeight - statusbarHeight}>
          <Header
            isRemoveTopPosition
            title={`게시글 ${formType === 'REGISTER' ? '작성' : '수정'}`}
            leftButton={
              <Pressable onPress={() => navigation.goBack()}>
                <DeleteIcon />
              </Pressable>
            }
            rightButton={
              <Pressable onPress={onSubmit}>
                <Text
                  color={colors.fussOrange[isFormComplete ? '0' : '-20']}
                  fontSize="16px">
                  완료
                </Text>
              </Pressable>
            }
          />

          <CommunitySelect
            list={petKinds}
            isOpen={isOpen}
            onClose={onClose}
            setValue={value => setForm(prev => ({...prev, kind: value}))}
            value={form.kind}
          />

          <VStack px="18px" mt="20px">
            <InputTopLabel text="커뮤니티" isNecessary />

            <SelectButtonForm
              onOpen={onOpen}
              value={form.kind}
              placeholder={'커뮤니티를 선택해주세요'}
              buttonStyle={{marginBottom: 36}}
            />

            <InputTopLabel text="글 제목" isNecessary />

            <VerificationForm
              placeholder={'제목을 입력해주세요'}
              marginBottom={'36px'}
              onChangeText={(text: string) =>
                setForm(prev => ({...prev, title: text}))
              }
              value={form.title}
            />

            <InputTopLabel text="태그" />

            <Pressable
              onPress={() => {
                navigation.navigate('TagRegister');
              }}>
              <HStack
                height={'52px'}
                flex={1}
                space={'10px'}
                borderBottomWidth={1}
                py={'15px'}
                mb={'8px'}
                borderBottomColor={colors.grayScale[30]}>
                {_.isEmpty(tags) ? (
                  <>
                    {['햄스터', '케이지추천', '꿀팁', '나이트엔젤'].map(tag => (
                      <Text
                        key={tag}
                        fontSize={'15px'}
                        color={colors.grayScale[40]}>
                        #{tag}
                      </Text>
                    ))}
                  </>
                ) : (
                  <>
                    {tags.map(tag => (
                      <Text key={tag} fontSize={'15px'}>
                        {tag}
                      </Text>
                    ))}
                  </>
                )}
              </HStack>
            </Pressable>

            <InputTopLabel text="내용" isNecessary />

            <ScrollView mt="14px" horizontal bounces={false}>
              <HStack>
                {imageDatas.map((item, i) => (
                  <Stack key={i.toString()} mr="8px">
                    <Image
                      width={'96px'}
                      height="96px"
                      source={{
                        uri: `${
                          item.type === 'REGISTERED'
                            ? config.IMAGE_BASE_URL
                            : ''
                        }${item.registerPageImageName}`,
                      }}
                      alt={'post_img'}
                    />

                    <Pressable
                      onPress={() => onDeleteImage(i)}
                      position={'absolute'}
                      width="32px"
                      height="32px"
                      justifyContent={'center'}
                      alignItems={'center'}
                      top={0}
                      right={0}>
                      <CircleDeleteIcon fill={colors.grayScale[90]} />
                    </Pressable>
                  </Stack>
                ))}
              </HStack>
            </ScrollView>

            <TextArea
              mt="14px"
              mb="36px"
              h="124px"
              fontSize="15px"
              lineHeight="22px"
              p={0}
              borderWidth={0}
              placeholder={'궁금한 점, 공유하고 싶은 내용을 적어주세요'}
              autoCompleteType
              placeholderTextColor={colors.grayScale['40']}
              bgColor={colors.grayScale['0']}
              onChangeText={(text: string) =>
                setForm(prev => ({...prev, content: text}))
              }
              value={form.content}
            />
          </VStack>
        </ScrollView>

        <Pressable
          onPress={onImagePicker}
          width="100%"
          pt="12px"
          pb="52px"
          pl="18px"
          h={`${registerImageViewHeight}px`}
          bgColor={colors.grayScale['0']}
          borderTopWidth={1}
          borderTopColor={colors.grayScale['30']}>
          <ImageIcon style={{marginRight: 10}} />

          <Text color={colors.grayScale['80']} fontSize="13px">
            {`${imageDatas.length} / 5`}
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CommunityRegister;
