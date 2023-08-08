import {Text} from 'native-base';
import Facility from '~/model/facility';
import React, {useEffect, useState} from 'react';
import {colors} from '~/theme/theme';
import {useUserContext} from '~/store/useUserContext';
import {useGetVisitedPetsFacility} from '~/api/facility/queries';
import Species from '~/model/species';
import _ from 'lodash';
import {useGetUser} from '~/api/user/queries';

interface Props {
  facility: Facility;
}

/**
 *@description 시설에 방문한 유저와 같은 동물과 동물 수
 */

function VisitedPets({facility}: Props) {
  const {data: userData} = useGetUser();
  const userPetName = userData?.mainPetInfo.specieName ?? '';

  const [visitedPetCount, setVisitedPetCount] = useState(0);

  const {data} = useGetVisitedPetsFacility(facility.id);

  useEffect(() => {
    if (data) {
      const speciesList = data.data.map(d => new Species(d));

      const samePet = _.find(speciesList, s => s.name === userPetName);
      setVisitedPetCount(samePet?.count ?? 0);
    }
  }, [data]);

  return (
    <Text fontSize={'13px'} fontWeight={500} color={colors.grayScale[60]}>
      {visitedPetCount}마리의 [{userPetName}] 친구들이 방문했어요
    </Text>
  );
}

export default VisitedPets;
