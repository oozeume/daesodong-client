import {initPetInfoForm, INIT_SIGNUP_FORM} from '~/constants/signup';

export type PetInfoForm = typeof initPetInfoForm;
export type SetPetInfoForm = React.Dispatch<React.SetStateAction<PetInfoForm>>;

type initSignupForm = typeof INIT_SIGNUP_FORM;

// 이메일 회원가입 폼 초기값 타입
export interface SignupForm extends initSignupForm {}
