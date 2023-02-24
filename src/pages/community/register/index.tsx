import {
  HStack,
  Pressable,
  ScrollView,
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
import Header from '~/components/hospital/review/register/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';
import VerificationForm from '~/components/common/VerificationForm';
import CommunitySelect from '~/components/community/register/CommunitySelect';
import SelectButtonForm from '~/components/community/register/SelectButtonForm';
import {FormState, FormType} from '~/../types/community';
import {APP_HEIGHT, APP_WIDTH} from '~/utils/dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/**
 *@description 커뮤니티 등록/수정
 */
const CommunityRegister = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const {params} = useRoute() as {params: FormType};

  // 등록: REGISTER, 수정: MODIFY
  const formType = params?.type || 'REGISTER';
  const toast = useToast();

  // 초기 등록 폼 state
  const initFormState: FormState = {
    community: undefined,
    title: '',
    content: '',
  };

  const [tag, setTag] = useState('');
  const {isOpen, onOpen, onClose} = useDisclose(); // 커뮤니티 셀랙터 on/off 훅
  const [form, setForm] = useState(initFormState);

  // 폼 작성 완료 여부
  const isFormComplete =
    form.community && form.title.length !== 0 && form.content.length !== 0;

  const registerImageViewHeight = 84;

  const paddingX = 36;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeAreaView>
        <ScrollView
          bgColor={colors.grayScale['0']}
          minHeight={APP_HEIGHT - registerImageViewHeight}>
          <Header
            title={`게시글 ${formType === 'REGISTER' ? '작성' : '수정'}`}
            leftButton={
              <Pressable
                position="absolute"
                left="18px"
                zIndex={1}
                onPress={() => navigation.goBack()}>
                <DeleteIcon />
              </Pressable>
            }
            rightButton={
              <Pressable
                position="absolute"
                right="18px"
                zIndex={1}
                onPress={() => {
                  toast.show({
                    render: () => (
                      <HStack
                        justifyContent={'center'}
                        alignItems="center"
                        borderRadius={8}
                        w={APP_WIDTH - paddingX}
                        h="44px"
                        bgColor={'#1A1E27CC'}>
                        <Text fontSize={'14px'} color={colors.grayScale['0']}>
                          {`게시글을 ${
                            formType === 'REGISTER' ? '등록' : '수정'
                          }했어요`}
                        </Text>
                      </HStack>
                    ),
                  });
                  navigation.navigate('CommunityDetail', {id: ''});
                }}>
                <Text
                  color={colors.fussOrange[isFormComplete ? '0' : '-20']}
                  fontSize="16px">
                  완료
                </Text>
              </Pressable>
            }
          />

          <CommunitySelect
            isOpen={isOpen}
            onClose={onClose}
            setValue={value => setForm(prev => ({...prev, community: value}))}
            value={form.community || ''}
          />

          <VStack px="18px" mt="20px">
            <Text>
              커뮤니티 <Text color={colors.negative['-10']}>(필수)</Text>
            </Text>

            <SelectButtonForm
              onOpen={onOpen}
              value={form.community}
              placeholder={'커뮤니티를 선택해주세요'}
              buttonStyle={{marginBottom: 36}}
            />

            <Text>
              글 제목 <Text color={colors.negative['-10']}>(필수)</Text>
            </Text>

            <VerificationForm
              placeholder={'제목을 입력해주세요'}
              marginBottom={'36px'}
              onChangeText={(text: string) =>
                setForm(prev => ({...prev, title: text}))
              }
              value={form.title}
            />

            <Text>태그</Text>

            <VerificationForm
              placeholder={`# 햄스터  # 케이지추천   # 꿀팁  # 나이트엔젤`}
              marginBottom={'36px'}
              onChangeText={setTag}
              value={tag}
            />

            <Text>
              내용 <Text color={colors.negative['-10']}>필수</Text>
            </Text>

            <TextArea
              mt="14px"
              mb="36px"
              h="204px"
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

        <HStack
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
        </HStack>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CommunityRegister;
