import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  visitHistoryBox: {
    width: 339,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 16,
    backgroundColor: '#F6F7F7',
  },
  toastBox: {
    width: 339,
    heght: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(26, 30, 39, 0.8)',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#5D626D',
    textAlign: 'center',
  },
  visitButton: {
    width: 189,
    height: 44,
    marginTop: 16,
    backgroundColor: '#FFF5EF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF6B00',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
  },
  hilightText: {
    fontWeight: '500',
    color: '#383E4A',
  },
  innerBoxWrapper: {
    width: 307,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  innerBox: {
    width: 149.5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  hospitalInfoWrapper: {
    width: 337,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F7F7',
  },
  phoneNumber: {
    fontSize: 13,
    color: '#0094FF',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#0094FF',
  },
});

export default styles;
