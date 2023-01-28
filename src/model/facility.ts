import { FacilityType } from "~/../types/api/facility";

class Facility {
  constructor (private readonly facility: FacilityType) {
  }

  get images() {
    return this.facility.hospital_picture.map((i) => i.picture_url)
  }

  get intro() {
    return this.facility.intro;
  }

  get phone() {
    return this.facility.phone;
  }

  get openingHours() {
    return [
      {date:'월 - 금', time : this.facility.sch_mon},
      {date:'토', time : this.facility.sch_sat},
      {date:'일', time : this.facility.sch_sun},
      {date:'공휴일', time : this.facility.sch_holy},
    ]
  }
}

export default Facility;
