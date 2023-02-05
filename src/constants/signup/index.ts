// 이메일 회원가입 폼 초기값 상수
export const INIT_SIGNUP_FORM = {
  nickname: '',
  email: '',
  password: '',
  mobile: '',
};

// 이메일 회원가입 약관 조건 초기값 상수
export const INIT_SIGNUP_TERM = {
  isServicePolicyCheck: false, // 이용약관
  isPersonalInformationPolicyCheck: false, // 개인 정보 처리 방침 체크
};

// 초기 반려동물 등록 폼값
export const initPetInfoForm = {
  gender: undefined as 'Male' | 'Female' | undefined,
  // 서버 key: birthdate
  birthDate: undefined as number | undefined,
  name: '',
  speciesName: undefined as string | undefined,
  age: undefined as number | undefined,
  sex: undefined as 'Male' | 'Female' | undefined,
  address: '',
  concern: '',
  // 서버 key: pet_picture_url
  petPictureUrl: '' as string | undefined,
};

export const EMAIL_SIGNUP_STAGE_TEXT_LIST = [
  `회원여부 확인 및 가입을 위해\n휴대폰 인증을 진행할게요`,
  '이메일을 입력해주세요',
  '비밀번호를 입력해주세요',
  '닉네임을 입력해주세요',
];

export const PET_INFO_NAVIGATOR_ROUTE_LIST = [
  'EmailLogin',
  'ChoiceGenderRegister',
  'PetOwnerBirthRegister',
  'PetNameRegister',
  'PetTypeRegister',
  'PetBirthRegister',
  'PetGenderRegister',
  'AddressRegister',
  'AnyQuestionRegister',
  'PetImageRegister',
] as const;
