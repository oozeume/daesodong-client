export type GetPetKindsResponse = PetKindsItem[];

/**
 *@description kinds api 응답 데이터 배열 아이템
 */
export type PetKindsItem = {
  id: string;
  name: string;
};
