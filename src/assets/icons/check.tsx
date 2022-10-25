import React from 'react';
import Svg, {Path} from 'react-native-svg';

function CheckIcon(props: React.SVGProps<SVGElement>) {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="9" fill="#FF6B00" />
      <Path
        d="M5.3999 9.10687L8.01808 11.6989L12.5999 6.83887"
        stroke="white"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default CheckIcon;
