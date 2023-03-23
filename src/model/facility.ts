import {FacilityListResponse, FacilityResponse} from '~/../types/api/facility';

class Facility {
  constructor(
    private readonly facility: FacilityResponse & FacilityListResponse,
  ) {}

  get id() {
    return this.facility.id ?? '';
  }

  get name() {
    return this.facility.name ?? '';
  }

  get bookmarkCount() {
    return this.facility.bookmarks ?? 0;
  }

  get representativeImage() {
    return this.facility.hospital_picture[0].picture_url ?? '';
  }

  get averageScore() {
    return this.facility.score_avg ?? 0;
  }

  get reviewCount() {
    return this.facility.review_count ?? 0;
  }

  get images() {
    return this.facility.hospital_picture?.map(i => i.picture_url) ?? [];
  }

  get intro() {
    return this.facility.intro ?? '';
  }

  get phoneNumber() {
    return this.facility.phone ? Number(this.facility.phone) : 0;
  }

  get openingHours() {
    return [
      {date: '월 - 금', time: this.facility.sch_mon ?? ''},
      {date: '토', time: this.facility.sch_sat ?? ''},
      {date: '일', time: this.facility.sch_sun ?? ''},
      {date: '공휴일', time: this.facility.sch_holy ?? ''},
    ];
  }

  get address() {
    return this.facility.address1 ?? '' + '\n' + this.facility.address2 ?? '';
  }

  get latitude() {
    return this.facility.latitude ?? '';
  }

  get longitude() {
    return this.facility.longitude ?? '';
  }

  get thanksCount() {
    return this.facility.thanks ?? '';
  }

  get savedFacilityIds() {
    return this.facility.save_hospital.map(i => i.hospitalId) ?? [];
  }

  isMyBookmarkFacility(facilityId: string) {
    if (this.savedFacilityIds) {
      return this.savedFacilityIds.includes(facilityId);
    } else {
      return false;
    }
  }
}

export default Facility;
