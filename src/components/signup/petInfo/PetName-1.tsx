import React, {useState} from 'react';
import {TextInput, StyleSheet, Keyboard} from 'react-native';
import TouchableWithoutView from '~/components/common/TouchableWithoutView';
import {colors} from '~/theme/theme';
import LayoutContainer from './LayoutContainer-1';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 반려동물 이름
 */

function PetName({handlePage}: Props) {
  const [petName, setPetName] = useState('');
  return (
    <TouchableWithoutView onPress={() => Keyboard.dismiss()}>
      <LayoutContainer buttonPress={handlePage}>
        <TextInput
          style={styles.input}
          onChangeText={setPetName}
          value={petName}
          placeholder={'이름을 입력해주세요'}
        />
      </LayoutContainer>
    </TouchableWithoutView>
  );
}

export default PetName;

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.grayScale[30],
    borderBottomWidth: 1,
  },
});
