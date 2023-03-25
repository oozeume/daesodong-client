import dayjs from 'dayjs';
import _ from 'lodash';
import {GetUserResponse} from '~/../types/api/user';
import {GenderType} from '~/../types/common';

class User {
  constructor(private readonly user: GetUserResponse) {}

  get id() {
    return this.user.id;
  }

  get nickname() {
    return this.user.nickname;
  }

  get gender() {
    return this.user.gender ?? 'Male';
  }

  get birthdate() {
    return Number(this.user.birthdate) ?? dayjs().year();
  }

  get address() {
    return this.user.address ?? '';
  }

  get email() {
    return this.user.email ?? '';
  }

  get mobile() {
    return this.user.mobile ?? '';
  }

  get social() {
    return this.user.social;
  }

  get petInfoList() {
    return this.user.pets;
  }

  get mainPetInfo() {
    if (_.isEmpty(this.user.pets))
      return {
        age: 0,
        concern: '',
        created_at: '',
        id: '',
        name: '',
        petImageURL: null,
        sex: 'Male' as GenderType,
        specieName: '',
        specieId: '',
        updated_at: '',
        userId: '',
      };

    const firstUserPet = this.user.pets[0];

    const _info = {
      ...firstUserPet,
      petImageURL: firstUserPet.pet_picture_url,
      specieName: firstUserPet.specie?.name ?? '',
    };

    delete _info['pet_picture_url'];
    delete _info['specie'];

    const _mainPetInfo: Omit<typeof _info, 'pet_picture_url' | 'specie'> =
      _info;

    return _mainPetInfo;
  }

  get role() {
    return this.user.role;
  }
}

export default User;
