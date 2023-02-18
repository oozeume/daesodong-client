import {FacilityReviewsResponse} from '~/../types/api/facility';

class Review {
  constructor(private readonly review: FacilityReviewsResponse) {}

  get nickname() {
    return this.review.user.nickname ?? '';
  }

  get tags() {
    return this.review.tags.map(tag => tag.hospital_review_tags.name) ?? [];
  }

  get visitDate() {
    const year = new Date(this.review.visit_date)
      .getFullYear()
      .toString()
      .slice(2);
    const month = new Date(this.review.visit_date).getMonth() + 1;

    return `${year}.${month}`;
  }

  get petInfo() {
    return {
      age: this.review.pet.age ?? '',
      species: this.review.pet.specie.name ?? '',
      sex: this.isPetFemale() ? '여성' : '남성',
    };
  }

  get petImage() {
    return this.review.pet.pet_picture_url ?? '';
  }

  get isRevisit() {
    return this.review.already_reviesit;
  }

  get starScore() {
    return {
      treatment: this.review.score_treatment,
      price: this.review.score_price,
      facility: this.review.score_facilities,
      kindness: this.review.score_kindness,
    };
  }

  get cost() {
    return this.review.cost ?? 0;
  }

  get hasExpectRevisit() {
    return this.review.expect_revisit;
  }

  get reviewContent() {
    return this.review.thoughts;
  }

  isPetFemale() {
    return this.review.pet.sex === 'Female';
  }
}

export default Review;
