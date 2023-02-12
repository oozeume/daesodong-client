import {HStack, Pressable, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListDotIcon from '~/assets/icons/list_dot.svg';
import Button from '~/components/common/button';
import VerificationForm from '~/components/common/VerificationForm';
import {colors} from '~/theme/theme';
import RedActiveLargeButton from '~/components/common/button/RedActiveLargeButton';
import {useTagContext, useTagRegister} from '~/store/useTagContext';
import CircleDeleteIcon from '~/assets/icons/circle_delete.svg';
import Popup from '~/components/common/popup/Popup';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const MAX_TAG_NUMBER = 5;

function TagRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);

  const tags = useTagContext([]);
  const setTags = useTagRegister();
  const [tagList, setTagList] = useState<string[]>(tags);

  const onPress = () => {
    if (tags === tagList) {
      navigation.goBack();
    } else {
      setTags(tagList.map(tag => (tag.includes('#') ? tag : `#${tag}`)));
      navigation.goBack();
    }
  };

  const addTag = () => {
    if (text !== '') {
      setTagList([...tagList, text]);
      setText('');
    }
  };

  const onSuccess = () => {
    setOpen(false);
    setText('');
    tagList.pop();
  };

  const onDelete = (tagName: string) => {
    setTagList(_.remove(tagList, i => i !== tagName));
  };

  useEffect(() => {
    if (tagList.length > MAX_TAG_NUMBER) {
      setOpen(true);
    }
  }, [tagList]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Stack
          justifyContent={'space-between'}
          flex={1}
          backgroundColor={'white'}
          pt={'16px'}
          px={'18px'}>
          <Stack>
            <VerificationForm
              placeholder={'입력'}
              marginBottom={'8px'}
              onChangeText={setText}
              value={text}
              inputRightElement={
                <Button
                  width={'53px'}
                  fontColors={{
                    active: colors.grayScale[90],
                    disabled: colors.grayScale[40],
                  }}
                  buttonColors={{
                    active: colors.fussYellow[0],
                    disabled: colors.fussYellow['-30'],
                  }}
                  borderColors={{
                    active: colors.grayScale[90],
                    disabled: colors.grayScale[40],
                  }}
                  text={'추가'}
                  active={true}
                  handlePress={addTag}
                />
              }
            />
            <HStack>
              {tagList.map(t => (
                <HStack
                  key={t}
                  mr={'5px'}
                  borderRadius={'16px'}
                  borderWidth={1}
                  borderColor={colors.grayScale[40]}
                  space={'4px'}
                  alignItems={'center'}
                  py={'5px'}
                  pl={'12px'}
                  pr={'10px'}>
                  <Text fontSize={'13px'} color={colors.grayScale[70]}>
                    {t}
                  </Text>
                  <Pressable onPress={() => onDelete(t)}>
                    <CircleDeleteIcon />
                  </Pressable>
                </HStack>
              ))}
            </HStack>

            <Stack
              mt={'24px'}
              py={'16px'}
              px={'18px'}
              borderRadius={'8px'}
              backgroundColor={colors.grayScale[10]}>
              <HStack space={'8px'}>
                <ListDotIcon />
                <Text color={colors.grayScale[60]}>
                  첫번째로 입력한 내용이{' '}
                  <Text color={colors.fussOrange[0]}>대표 진단명으로 노출</Text>
                  되어요.
                </Text>
              </HStack>

              <HStack alignItems={'flex-start'} space={'8px'}>
                <ListDotIcon />
                <Text color={colors.grayScale[60]}>
                  친구들이 쉽게 검색할 수 있는{' '}
                  <Text color={colors.fussOrange[0]}>
                    건강검진, 피부병, 염증
                  </Text>
                  과 같은 띄어쓰기가 없는 짧은 단어로 적어주세요.
                </Text>
              </HStack>

              <HStack space={'8px'}>
                <ListDotIcon />
                <Text color={colors.grayScale[60]}>
                  최대 5개까지 입력할 수 있어요.
                </Text>
              </HStack>
            </Stack>
          </Stack>

          <RedActiveLargeButton
            active={tagList.length >= 1}
            text={'등록'}
            handlePress={onPress}
          />
        </Stack>
      </SafeAreaView>

      <Popup
        title={'태그는 최대 5개까지 입력할 수 있어요'}
        subText="새로운 태그를 추가하고 싶다면 이미 등록된 태그를 삭제하고 다시 추가해주세요."
        isVisible={open}
        setIsVisible={setOpen}
        isInvisibleCancelButton
        successButtonName={'확인'}
        onSuccess={onSuccess}
        successButtonStyle={{backgroundColor: colors.fussOrange[0]}}
      />
    </>
  );
}

export default TagRegister;
