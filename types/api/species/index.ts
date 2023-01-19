export interface GetSpeciesQuery {
  limit: number;
  search?: string;
}

export type GetSpeciesResponse = SpeciesData[];

/**
 *@description species api 응답 데이터 배열 아이템
 */
export type SpeciesData = {
  created_at: string;
  id: string;
  kindId: string;
  name: string;
  specie: {
    id: string;
    name: string;
  };
};
