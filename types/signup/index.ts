import {
  initPetInfoForm,
  INIT_SIGNUP_FORM,
  INIT_SIGNUP_TERM,
} from '~/constants/signup';

export type PetInfoForm = typeof initPetInfoForm;
export type SetPetInfoForm = React.Dispatch<React.SetStateAction<PetInfoForm>>;

type InitSignupForm = typeof INIT_SIGNUP_FORM;
type InitSignupTerm = typeof INIT_SIGNUP_TERM;

// 이메일 회원가입 폼 초기값 타입
export interface SignupForm extends InitSignupForm {}

// 이메일 회원가입 약관 타입
export interface SignupTerm extends InitSignupTerm {}
