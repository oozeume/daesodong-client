import {HStack, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import IconHome from '~/assets/icons/home.svg';

interface Props {
  text: string;
}
function HospitalName({text}: Props) {
  return (
    <HStack style={styles.view}>
      <IconHome style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f6f7f7',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 0,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 16,
  },
});

export default HospitalName;
