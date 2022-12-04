import {
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeleteIcon from '~/assets/icons/delete.svg';
import {colors} from '~/theme/theme';
import Header from '~/components/hospital/review/register/Header';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationHookProp} from '~/../types/navigator';

/**
 *@description 커뮤니티 등록/수정/삭제
 */
const CommunityRegister = () => {
  const navigation = useNavigation<NavigationHookProp>();
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);

  const initFormState = {
    community: '',
    title: '',
    content: '',
  };

  const [form, setForm] = useState(initFormState);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <SafeAreaView>
        <ScrollView bgColor={colors.grayScale['0']} minHeight="100%">
          <Header
            title={'게시글 작성'}
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
              <HStack position="absolute" right={18} zIndex={1}>
                <Pressable
                  position="absolute"
                  right="18px"
                  zIndex={1}
                  onPress={() => navigation.goBack()}>
                  <Text>완료</Text>
                </Pressable>
              </HStack>
            }
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommunityRegister;
