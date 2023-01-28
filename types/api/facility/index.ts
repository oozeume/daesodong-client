export type Facility = {
    id: string,
    hospitalCategoryId: string,
    name: string,
    phone: string,
    address1: string,
    address2: string,
    latitude: number,
    longitude: number,
    thanks: number,
    visitCount: number,
    review_count: number,
    intro: string,
    url: string,
    info: string,
    sch_mon: string,
    sch_tue: string,
    sch_wed: string,
    sch_thu: string,
    sch_fri: string,
    sch_sat: string,
    sch_sun: string,
    sch_holy: string,
    expose: boolean,
    score_total: number,
    created_at: string,
    updated_at: string,
    hospital_category: {
      id: string,
      name: string
    },
    hospital_picture: [
      {
        hospitalId: string,
        picture_url: string
      },
      {
        hospitalId: string,
        picture_url: string
      },
      {
        hospitalId: string,
        picture_url: string
      }
    ],
    _count: {
      hospital_user_visit: number,
      hospital_review: number
    }
  }