import dayjs from 'dayjs';
import {FacilityReviewsResponse} from '~/../types/api/facility';
import {config} from '~/utils/config';

class Review {
  constructor(private readonly review: FacilityReviewsResponse) {}

  get id() {
    return this.review.id ?? '';
  }

  get nickname() {
    return this.review.user.nickname ?? '';
  }

  get facilityId() {
    return this.review.hospitalId ?? '';
  }

  get reviewId() {
    return this.review.id ?? '';
  }

  get userId() {
    return this.review.userId ?? '';
  }

  get tags() {
    return (
      this.review.tags.map(tag => tag.hospital_review_tags?.name ?? '') ?? []
    );
  }

  get visitDate() {
    return dayjs(this.review.visit_date).format('YY-MM') ?? '';
  }

  get petInfo() {
    return {
      age: this.review.pet.age ?? '',
      species: this.review.pet.specie.name ?? '',
      sex: this.isPetFemale() ? '여성' : '남성',
    };
  }

  get petImage() {
    if (this.review?.pet.pet_picture_url) {
      return `${config.IMAGE_BASE_URL}${this.review.pet.pet_picture_url}`;
    } else {
      return '';
    }
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

  get thanksCount() {
    return this.review.thanks ?? 0;
  }

  get isMyThanksReview() {
    if (this.review?.thanks_review_join[0]?.userId) {
      return true;
    } else {
      return false;
    }
  }

  get images() {
    return this.review?.hospital_review_picture ?? [];
  }

  isPetFemale() {
    return this.review.pet.sex === 'Female';
  }
}

export default Review;
