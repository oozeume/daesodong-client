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
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeleteIcon from '~/assets/icons/delete.svg';
import ImageIcon from '~/assets/icons/image.svg';
import {colors} from '~/theme/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import VerificationForm from '~/components/common/VerificationForm';
import CommunitySelect from '~/components/community/register/CommunitySelect';
import SelectButtonForm from '~/components/community/register/SelectButtonForm';
import {FormState, FormType} from '~/../types/community';
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
import {PostImage} from '~/../types/utils';
import {usePostImageUpload} from '~/api/image';

/**
 *@description 커뮤니티 등록/수정
 */
const CommunityRegister = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const {mutateAsync} = usePostCummunityPost();
  const postImageUpload = usePostImageUpload();
  const {params} = useRoute() as {params: FormType};

  const {data} = useGetPetKinds(false);

  // 등록: REGISTER, 수정: MODIFY
  const formType = params?.type || 'REGISTER';
  const toast = useToast();

  // 초기 등록 폼 state
  const initFormState: FormState = {
    kind: '',
    title: '',
    content: '',
    tags: [],
    pictures: [],
  };

  const [tag, setTag] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 셀랙터 on/off 훅
  const [form, setForm] = useState(initFormState);

  const [isImageLoad, setImageLoad] = useState(false);

  // 불러온 이미지의 내부 이미지 경로
  const [imageInnerPathList, setImageInnerPathList] = useState<string[]>([]);

  // cloud flare r2에 저장된 이미지 이름들
  const [imageNameList, setImageNameList] = useState<string[]>([]);
  // cloud flare r2에 저장할 이미지 정보 state
  const [imageInfo, setImageInfo] = useState<PostImage[]>([]);

  const registerImageViewHeight = 84;

  // 폼 작성 완료 여부
  const isFormComplete =
    !_.isEmpty(form.title) && !_.isEmpty(form.content) && !_.isEmpty(form.kind);

  // 이미지 선택 핸들러
  const onImagePicker = () => {
    // 이미지가 업로드 중이면 핸들러 반환
    if (isImageLoad) return;
    setImageLoad(true);

    try {
      multipleImagePicker().then(response => {
        const _innerPathList: string[] = [];
        const _infoList: PostImage[] = [];
        const _nameList: string[] = [];
        console.log('@ imageInfo[0]');
        console.log(response[0]);

        response.forEach(item => {
          const tmp = item.path.split('/');
          const serverFilename = tmp[tmp.length - 1];

          const iosSourceURL = item.sourceURL ?? '';

          const imageInfoURI =
            Platform.OS === 'android' ? item.path : iosSourceURL;

          _innerPathList.push(
            Platform.OS === 'android' ? item.path : iosSourceURL,
          );
          _nameList.push(serverFilename);
          _infoList.push({
            uri: imageInfoURI,
            type: item.mime,
            name: serverFilename,
          });
        });

        setImageInfo(_infoList);
        setImageInnerPathList(_innerPathList);
        setImageNameList(_nameList);
        setImageLoad(false);
      });
    } catch (error) {
      setImageLoad(false);
      console.log(error);
    }
  };

  const onSubmit = async () => {
    if (!isFormComplete || isImageLoad) return;

    try {
      for (let i = 0; i < imageInfo.length; i++) {
        const data = new FormData();
        data.append('file', imageInfo[i]);

        await postImageUpload.mutateAsync({data, fileName: imageInfo[i].name});
      }

      const response = await mutateAsync({
        ...form,
        pictures: imageNameList,
      });

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

        navigation.reset({index: 0, routes: [{name: 'Commuity'}]});
      }
    } catch (error) {}
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeAreaView>
        <ScrollView
          bgColor={colors.grayScale['0']}
          minHeight={APP_HEIGHT - registerImageViewHeight}>
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
            list={data}
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

            <VerificationForm
              placeholder={`# 햄스터  # 케이지추천   # 꿀팁  # 나이트엔젤`}
              marginBottom={'36px'}
              onChangeText={setTag}
              value={tag}
            />

            <InputTopLabel text="내용" isNecessary />

            <ScrollView mt="14px" borderWidth={1} horizontal bounces={false}>
              <HStack>
                {imageInnerPathList.map((item, i) => (
                  <Stack key={i.toString()} mr="8px">
                    <Image
                      width={'96px'}
                      height="96px"
                      source={{uri: item}}
                      alt={'post_img'}
                    />
                  </Stack>
                ))}
              </HStack>
            </ScrollView>

            <TextArea
              mt="14px"
              mb="36px"
              h="264px"
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
            {`0 / 5`}
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CommunityRegister;
