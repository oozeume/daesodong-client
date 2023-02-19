import {
  initPetInfoForm,
  INIT_SIGNUP_FORM,
  INIT_SIGNUP_TERM,
} from '~/constants/signup';
import {PetInfoRegisterNavigatorRouteList} from '../navigator';

type InitSignupForm = typeof INIT_SIGNUP_FORM;
type InitSignupTerm = typeof INIT_SIGNUP_TERM;

// 이메일 회원가입 폼 초기값 타입
export interface SignupForm extends InitSignupForm {}

// 이메일 회원가입 약관 타입
export interface SignupTerm extends InitSignupTerm {}

// 집사 정보 등록 폼
export type PetInfoForm = typeof initPetInfoForm;
export type SetPetInfoForm = React.Dispatch<React.SetStateAction<PetInfoForm>>;

// 집사정보등록 - 반려동물 사진 등록 props
export interface PetInfoImageRegisterProps {
  form: PetInfoForm;
  setForm: SetPetInfoForm;
  currentStage: number;
}

// 집사 정보 등록 페이지 공통 props
export interface PetInfoRegisterProps extends PetInfoImageRegisterProps {
  setPreviousURL: React.Dispatch<
    React.SetStateAction<PetInfoRegisterNavigatorRouteList[]>
  >;
  onChangeStage: () => void;
}
