import {useEffect, useState} from 'react';

type ReturnType = [string, (text: string) => void];

/**
 * 휴대폰 번호에 자동으로 하이픈 적용시키는 커스텀 훅
 */
function useRegExPhone(): ReturnType {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // 전화번호 11자리 모두 입력했을 때 자동으로 하이픈을 추가
    // 하이픈이 추가됐을 떄(13자리) 전화번호 변경을 시도할 경우 하이픈 제거
    setPhoneNumber(prev =>
      prev.length === 11
        ? prev.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        : prev.length === 12
        ? prev.replace(/-/g, '')
        : prev,
    );
  }, [phoneNumber]);

  const handlePhoneNumber = (text: string) => {
    setPhoneNumber(prev => (text.length > 13 ? prev : text));
  };

  return [phoneNumber, handlePhoneNumber];
}

export default useRegExPhone;
