import {Stack} from 'native-base';
import Review from '~/model/review';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
}

/**
 *@description 병원 리뷰 리스트
 */

function ReviewList({reviews}: Props) {
  // const getUser = useGetUser();
  // const [userId, setUserId] = useState('');

  // const getUserId = async () => {
  //   const {data} = await getUser.refetch();
  //   if (data) {
  //     setUserId(data?.data.id);
  //   }
  // };

  // React.useEffect(() => {
  //   getUserId();
  // }, []);

  return (
    <Stack space={'8px'} backgroundColor={'grayScale.10'}>
      {reviews.map((review, index) => (
        <React.Fragment key={index.toString()}>
          <ReviewItem
            review={review}
            // isInvisibleKebabMenu={userId === review.userId}
            isInvisibleBorderTop={index === 0}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default ReviewList;
