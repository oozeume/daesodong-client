import {ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {NavigationHookProp} from '~/../types/navigator';
import Header from '~/components/hospital/review/register/Header';
import {CloseButton} from '~/components/hospital/review/register/button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

/**
 *@description 병원 리뷰 후기 작성 안내 사항 페이지
 */
function HospitalReviewRegisterPrecaution() {
  const navigation = useNavigation<NavigationHookProp>();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView backgroundColor={'#fff'}>
        <Header
          title="후기 작성시 주의사항"
          rightButton={
            <CloseButton buttonStyle={{right: 18}} onPress={onBack} />
          }
        />

        <VStack padding="18px" marginTop="20px">
          <Text fontSize="15px" color="#5D626D">
            제1조 (목적) 본 약관은 대소동(이하 "회사"라 함)이 제공하는 대소동
            서비스의 이용과 관련하여, 회사와 회원과의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다. 제2조 (용어의 정의) ①
            이 약관에서 사용하는 용어의 정의는 아래와 같습니다. 1. "서비스"라
            함은 회원이 주소 및 반려동물 정보를 등록하고 회원이 등록한 회원
            정보에 기반한 시설 추천, 콘텐츠 추천 등을 목적으로 “회사”가 제공하는
            대소동 관련 제반 서비스를 의미합니다. 2. "회원"이라 함은 “회사”의
            "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고
            "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다. 3. "회원ID"라
            함은 “회원”의 식별과 “회원”의 “서비스” 이용을 위하여 “회원”이 입력
            혹은 등록한 이메일 주소를 말합니다. 4. "비밀번호"라 함은 "회사"의
            “서비스”를 이용하려는 사람이 “회원ID”를 부여 받은 자와 동일인임을
            확인하고 “회원”의 권익을 보호하기 위하여 “회원”이 선정한 문자 또는
            문자와 숫자의 조합을 말합니다. 5. “명함”이라 함은 자신이 속한
            회사명, 연락처, 회사 주소, 직책 등을 기재해 놓은 카드를 말합니다. 6.
            "명함정보"라 함은 연락을 위해 필요한 정보를 명함 당사자 간의 암묵적
            동의 하에 취득 후, “서비스” 이용을 위해 “회원”이 등록한 명함에
            기재된 이름, 회사명, 부서, 직책, 프로필 이미지, 연락처(휴대 및 유선
            전화번호, 이메일), 주소 등 “서비스”의 명함정보 항목에 입력되는
            정보와 이미지를 말합니다. 7. "유료서비스"라 함은 "서비스" 중
            "회사"가 유료로 제공하는 각종 부가 서비스를 의미합니다. 8.
            “유료회원”이라 함은 이용대금을 지불하고 팀명함첩 등 “회사”의
            “유료서비스”를 이용하는 “회원”을 의미합니다. 9. "게시물"이라 함은
            “회원”이 “서비스”를 이용함에 있어 “서비스”상에 게시한 정보형태의 글,
            사진, 동영상 및 각종 파일과 링크 등을 의미합니다. 10. “결제”라 함은
            “회원”이 “유료서비스”를 이용하기 위하여 일정 금액을 “회사”가
            지정하는 결제수단을 통해 지불하는 것을 의미합니다. ② 이 약관에서
            사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관련
            법령에서 정하는 바에 따르며, 관련 법령에서 정하지 않는 것은 일반적인
            상관례에 따릅니다. 제3조 (약관의 명시와 개정) ① “회사”는 이 약관의
            내용과 상호, 영업소재지, 대표자의 성명, 사업자등록번호, 연락처 등을
            ”회원”이 알 수 있도록 “서비스” 초기화면에 게시하거나 기타의 방법으로
            ”회원”에게 공지합니다. ② “회사”는 약관의 규제에 관한 법률,
            전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에
            관한 법률 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수
            있습니다. ③ “회사”가 약관을 개정할 경우에는 시행일자 및 개정사유를
            명시하여 현행약관과 함께 개정약관의 시행일자 7일전부터 시행일자
            전일까지 공지합니다. 단 “회원”의 권리, 의무에 중대한 영향을 주는
            변경의 경우에는 시행일자 30일 전부터 공지하도록 합니다. ④ “회원”은
            변경된 약관에 대해 거부할 권리가 있습니다. “회원”은 변경된 약관이
            공지된 지 15일 이내에 거부의사를 표시할 수 있습니다. “회원”이
            거부하는 경우 “서비스” 제공자인 “회사”는 15일의 기간을 정하여
            “회원”에게 사전통지 후 당해 “회원”과의 계약을 해지할 수 있습니다.
            만약, “회원”이 거부 의사를 표시하지 않거나, 전항에 따른 시행일자
            이후에 "서비스"를 이용하는 경우에는 개정약관에 동의한 것으로
            간주합니다. 제4조 (약관의 해석) ① “회원”이 “회사”와 개별계약을
            체결하여 “서비스”를 이용하는 경우 “회사”는 개별 서비스에 대한
            이용약관 또는 운영정책 등(이하 "운영정책 등")을 둘 수 있으며, 해당
            내용이 본 약관과 상충되는 경우 개별 서비스에 대한 운영정책 등이
            우선합니다. ② 이 약관에서 규정하지 않은 사항에 관해서는 약관의
            규제에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망
            이용촉진 및 정보보호 등에 관한 법률 등의 관계법령에 따릅니다. 제5조
            (이용계약의 성립) ① “회사”와 “회원” 사이의 “서비스” 이용계약(이하
            "이용계약"이라 함)은 “서비스”를 이용하고자 하는 자(이하
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HospitalReviewRegisterPrecaution;
