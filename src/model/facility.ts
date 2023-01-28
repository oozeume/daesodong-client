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

  get phoneNumber() {
    return Number(this.facility.phone);
  }

  get openingHours() {
    return [
      {date:'월 - 금', time : this.facility.sch_mon},
      {date:'토', time : this.facility.sch_sat},
      {date:'일', time : this.facility.sch_sun},
      {date:'공휴일', time : this.facility.sch_holy},
    ]
  }

  get address() {
    return this.facility.address1 + '\n' + this.facility.address2 
  }

  get latitude() {
    return this.facility.latitude;
  }

  get longitude() {
    return this.facility.longitude;
  }

  get thanksCount() {
    return this.facility.thanks
  }
}

export default Facility;
