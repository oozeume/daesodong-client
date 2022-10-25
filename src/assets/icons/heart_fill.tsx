import React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartFillICon(props: React.SVGProps<SVGElement>) {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.9205 4.48338C14.5784 4.14004 14.1722 3.86768 13.7252 3.68186C13.2782 3.49603 12.799 3.40039 12.3151 3.40039C11.8312 3.40039 11.3521 3.49603 10.905 3.68186C10.458 3.86768 10.0518 4.14004 9.70976 4.48338L8.99982 5.1956L8.28988 4.48338C7.5989 3.79018 6.66172 3.40075 5.68453 3.40075C4.70733 3.40075 3.77016 3.79018 3.07917 4.48338C2.38819 5.17658 2 6.11675 2 7.09708C2 8.07741 2.38819 9.01758 3.07917 9.71078L3.78911 10.423L8.99982 15.6504L14.2105 10.423L14.9205 9.71078C15.2627 9.3676 15.5342 8.96014 15.7194 8.51167C15.9047 8.0632 16 7.58252 16 7.09708C16 6.61164 15.9047 6.13095 15.7194 5.68249C15.5342 5.23402 15.2627 4.82656 14.9205 4.48338Z"
        fill={props.color ?? '#FF6B00'}
        stroke={props.color ?? '#FF6B00'}
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default HeartFillICon;
