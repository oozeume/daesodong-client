import {initPetInfoForm} from '~/constants/signup';

export type PetInfoForm = typeof initPetInfoForm;
export type SetPetInfoForm = React.Dispatch<React.SetStateAction<PetInfoForm>>;
