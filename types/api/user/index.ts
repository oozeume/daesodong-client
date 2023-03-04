import {PetInfoForm} from '../../signup';

export interface GetUserResponse {
  id: string;
  nickname: string;
  gender?: 'Male' | 'Female';
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
  sex: 'Male' | 'Female';
  specie?: {name: string} | null;
  specieId?: string;
  updated_at: string;
  userId: string;
};

export type PatchUserInfoResponse = boolean;

export interface PatchUserInfoData extends PetInfoForm {}
