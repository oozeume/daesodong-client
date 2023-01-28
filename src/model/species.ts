import { PetSpecies } from "~/../types/api/species";

class Species {
  constructor (private readonly species: PetSpecies) {
  }

  get id() {
    return this.species.id;
  }

  get name() {
    return this.species.name;
  }

  get count() {
    return this.species._count?.pets;
  }

}

export default Species;