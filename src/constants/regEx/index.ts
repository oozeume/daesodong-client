/**
 * 특수문자 검사 정규식
 */
export const SPECIAL_CHARACTERS_REGEX =
  /[`~!@#$%^&*()_|+\-=?;:'",.₩<>\{\}\[\]\\\/¥£•‘’””“]/;

/**
 * 이모지 제거
 */
export const EMOJI_REGEX =
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

/**
 * 영문 포함 여부
 */
export const INCLUDE_ENGLISH_REGREX = /[A-Za-z]/;

/**
 * 숫자 포함 여부
 */
export const INCLUDE_NUMBER_REGREX = /[0-9]/;

/**
 * 텍스트 길이가 8~20자 여부
 */
export const RANGE_TEXT_8_20_REGREX = /^.{8,20}$/;

/**
 * 패스워드 정규식 (영문, 숫자 포함, 8~20자 길이 이내)
 */
export const PASSWORD_REGREX = /^[A-Za-z0-9]{8,20}$/;

/**
 * 이메일 정규식
 */
export const EMAIL_REGREX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
