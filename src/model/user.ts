import dayjs from 'dayjs';
import _ from 'lodash';
import {GetUserResponse} from '~/../types/api/user';

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
    return this.user.birthdate ?? '';
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
        sex: 'Male' as 'Male' | 'Female',
        specieName: '',
        specieId: '',
        updated_at: '',
        userId: '',
      };

    const tmp = this.user.pets[0];

    console.log('@ TMP USER');
    console.log(tmp);
    const _info = {
      ...tmp,
      petImageURL: tmp.pet_picture_url,
      specieName: tmp.specie?.name ?? '',
    };

    delete _info['pet_picture_url'];
    delete _info['specie'];

    return _info;
  }

  get role() {
    return this.user.role;
  }
}

export default User;
