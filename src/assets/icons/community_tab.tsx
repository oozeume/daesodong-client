import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

function CommunityTabIcon(props: React.SVGProps<any> & {subFill: string}) {
  return (
    <Svg width="27" height="26" viewBox="0 0 27 26" fill="none">
      <G clip-path="url(#clip0_4922_43195)">
        <Path
          d="M14.846 16.3745C14.5823 16.3143 14.4233 16.0398 14.5109 15.777C14.5873 15.5477 14.8376 15.4256 15.0734 15.4791C16.4997 15.8031 17.7159 15.9145 18.7071 15.918C18.9503 15.2698 19.1428 14.5727 19.2721 13.8219L19.3022 13.625C19.3346 13.3595 19.3512 13.0902 19.3512 12.8176C19.3512 11.556 18.9951 10.3637 18.363 9.3059C18.3641 9.32816 18.3664 9.35005 18.3664 9.37258C18.3664 10.1265 17.7374 10.7338 16.9751 10.6987C16.2986 10.6676 15.7419 10.1113 15.7108 9.43529C15.6757 8.67356 16.2834 8.04501 17.0379 8.04501C17.1996 8.04501 17.3538 8.0753 17.4973 8.12822C15.7691 6.18271 12.9933 4.9209 9.86321 4.9209C4.62307 4.92081 0.37513 8.45626 0.37513 12.8175C0.37513 14.899 1.39959 17.8079 4.53444 19.1883C5.25715 19.4795 7.67344 20.2307 11.6983 19.3118C11.9614 19.2517 12.2234 19.4291 12.2595 19.703C12.2911 19.9415 12.1213 20.1627 11.8864 20.2161C10.3773 20.5593 9.07886 20.6824 7.99303 20.6824C7.685 20.6824 7.39425 20.6724 7.12069 20.6547C6.8438 20.6368 6.58336 20.7879 6.46507 21.0387C5.94336 22.1444 5.47896 23.7289 7.0376 23.8284C8.56251 23.9258 15.5336 22.5704 18.3128 16.8376C17.3176 16.8077 16.1623 16.675 14.846 16.3745ZM13.0377 10.7C12.304 10.7 11.7092 10.1056 11.7092 9.3724C11.7092 8.63921 12.304 8.04482 13.0377 8.04482C13.7714 8.04482 14.3662 8.63921 14.3662 9.3724C14.3662 10.1056 13.7714 10.7 13.0377 10.7Z"
          fill={props.fill ?? '#C6C8CD'}
        />
        <Path
          d="M16.8869 1.08301C11.6468 1.08301 7.39882 4.61846 7.39882 8.97973C7.39882 9.25235 7.41545 9.52165 7.4478 9.78717L7.47784 9.98406C8.90552 18.2754 17.9496 20.1033 19.7125 19.9907C21.2712 19.8911 20.8068 18.3066 20.285 17.2009C20.1668 16.9501 19.9062 16.7991 19.6294 16.8169C19.3558 16.8345 19.0651 16.8446 18.7571 16.8446C17.671 16.8446 16.373 16.7216 14.8635 16.3782C14.6286 16.3248 14.4591 16.1036 14.4906 15.8651C14.5268 15.5912 14.7887 15.4139 15.0519 15.4739C17.5916 16.0537 19.4686 15.9606 20.5959 15.7803C21.3635 15.6576 21.8962 15.4791 22.187 15.3631C25.3445 13.9879 26.3751 11.0674 26.3751 8.97954C26.375 4.61846 22.127 1.08301 16.8869 1.08301ZM13.0377 10.6998C12.3039 10.6998 11.7091 10.1054 11.7091 9.37223C11.7091 8.63904 12.3039 8.04465 13.0377 8.04465C13.7714 8.04465 14.3662 8.63904 14.3662 9.37223C14.3662 10.1054 13.7714 10.6998 13.0377 10.6998ZM17.0378 10.6998C16.3041 10.6998 15.7093 10.1054 15.7093 9.37223C15.7093 8.63904 16.3041 8.04465 17.0378 8.04465C17.7715 8.04465 18.3663 8.63904 18.3663 9.37223C18.3663 10.1054 17.7715 10.6998 17.0378 10.6998ZM21.038 10.6998C20.3043 10.6998 19.7095 10.1054 19.7095 9.37223C19.7095 8.63904 20.3043 8.04465 21.038 8.04465C21.7717 8.04465 22.3665 8.63904 22.3665 9.37223C22.3665 10.1054 21.7717 10.6998 21.038 10.6998Z"
          fill={props.subFill ?? '#E1E2E4'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4922_43195">
          <Rect
            width="26"
            height="26"
            fill="white"
            transform="translate(0.375)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CommunityTabIcon;
