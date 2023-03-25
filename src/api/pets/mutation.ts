import {useMutation} from '@tanstack/react-query';
import {apiCall} from '../common';
import {PatchPetData} from '~/../types/api/pets';

/**
 *@description 아이정보 업데이트 api 호출
 */

const patchPet = (data: Partial<PatchPetData>, id: string) => {
  const _data = {
    name: data.name,
    speciesName: data.speciesName,
    age: data.age,
    sex: data.sex,
  };
  return apiCall<boolean>({
    method: 'PATCH',
    url: `pets/${id}`,
    data: _data,
  });
};

export const usePatchPet = () => {
  return useMutation((form: {data: Partial<PatchPetData>; id: string}) =>
    patchPet(form.data, form.id),
  );
};
