import React from 'react';
import Content from '~/model/content';
import {useGetMainContents} from '~/api/contents/queries';
import {CONTENTS_PER_PAGE} from '~/constants/contents';
import FullImageSwiper from '~/components/common/swiper/FullImageSwiper';

/**
 *@description 컨텐츠 메인 페이지 상단 (이미지)
 */
function ContentsMainImages() {
  const {data} = useGetMainContents({skip: 0, take: CONTENTS_PER_PAGE});

  const contents = data?.data.map(c => new Content(c)) ?? [];

  return <FullImageSwiper images={contents.map(i => i.representiveImage)} />;
}

export default ContentsMainImages;
