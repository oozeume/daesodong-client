import {VerificationResult} from '~/../types/verification';
import {SPECIAL_CHARACTERS_REGEX} from '~/constants/regEx';

/**
 *@description 닉네임 글자수 검사
 */
export const checkNicknameLength = (text: string): VerificationResult => {
  return text.length > 1 && text.length <= 10 ? 'SUCCESS' : 'FAIL';
};

/**
 *@description 닉네임 공백 검사
 */
export const isExistBlank = (text: string): VerificationResult => {
  return text.indexOf(' ') === -1 ? 'SUCCESS' : 'FAIL';
};

/**
 *@description 닉네임 특수문자 검사
 */
export const isExistSpecialCharacters = (text: string): VerificationResult => {
  return SPECIAL_CHARACTERS_REGEX.test(text) ? 'FAIL' : 'SUCCESS';
};
