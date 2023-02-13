/**
 *@description 텍스트 다루는 유틸
 */

/**
 *@description 텍스트 하이픈 제거 함수
 */
export function deleteHypen(text: string) {
  return text.replace(/\-/g, '');
}
