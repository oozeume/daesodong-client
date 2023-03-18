import {GenderType} from '../../common';

/**
 *@description 아이정보 업데이터 api 데이터
 */
export interface PatchPetData {
  name: string;
  speciesName: string;
  age: number;
  sex: GenderType;
  petPictureUrl: string | null;
}
