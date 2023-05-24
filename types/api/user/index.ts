import {GenderType} from '../../common';
import {MyInfoForm} from '../../mypage';
import {PetInfoForm} from '../../signup';

export interface GetUserResponse {
  id: string;
  nickname: string;
  gender?: GenderType;
  birthdate?: string | null;
  address?: string | null;
  email?: string | null;
  mobile: string;
  social?: string[] | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  pets: UserPetInfo[];
  role: string;
}

export type UserPetInfo = {
  age: number;
  concern?: string | null;
  created_at: string;
  id: string;
  name: string;
  pet_picture_url?: string | null;
  sex: GenderType;
  specie?: {
    id: string;
    name: string;
    confirm: boolean;
    kindId: string;
    created_at: string;
    specie: {
      name: string;
    };
  } | null;
  specieId?: string;
  updated_at: string;
  userId: string;
};

export type PatchUserInfoResponse = boolean;

/**
 *@description 유저 정보 수정
 */
export interface PatchUserData extends MyInfoForm {}

/**
 *@description 유저 부가 정보 수정
 */
export interface PatchUserInfoData extends PetInfoForm {}

/**
 *@description 유저 삭제 api 데이터
 */
export interface DeleteUserData {
  reason: string;
}
