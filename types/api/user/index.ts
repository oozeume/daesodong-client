import {PetInfoForm} from '../../signup';

export type PatchUserInfoResponse = boolean;

export interface PatchUserInfoBody extends PetInfoForm {}

export interface GetAuthMobileResponse {
  id: string;
  nickname: string;
  gender?: string | null;
  birthdate?: string | null;
  address: string | null;
  email: string;
  mobile: string;
  social: string | null;
  created_at: string;
  updated_at: string;
}
